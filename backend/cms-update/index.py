import json
import os
import base64
import psycopg2
import boto3

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def verify_token(token: str, schema: str) -> bool:
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        f"SELECT token FROM {schema}.admin_sessions WHERE token = %s AND expires_at > NOW()",
        (token,)
    )
    row = cur.fetchone()
    cur.close()
    conn.close()
    return row is not None


def get_s3():
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )


def upload_file(data_b64: str, filename: str, content_type: str) -> str:
    data = base64.b64decode(data_b64)
    s3 = get_s3()
    key = f"cms/{filename}"
    s3.put_object(Bucket="files", Key=key, Body=data, ContentType=content_type)
    access_key = os.environ["AWS_ACCESS_KEY_ID"]
    return f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"


def process_media(value: str, content_id: str, content_type: str) -> str:
    if not value.startswith("data:"):
        return value

    parts = value.split(",", 1)
    if len(parts) != 2:
        return value

    header = parts[0]
    b64data = parts[1]

    if content_type == "image":
        ext = "jpg"
        if "png" in header:
            ext = "png"
        elif "webp" in header:
            ext = "webp"
        elif "gif" in header:
            ext = "gif"
        mime = f"image/{ext}" if ext != "jpg" else "image/jpeg"
        filename = f"{content_id}.{ext}"
        return upload_file(b64data, filename, mime)

    elif content_type == "video":
        ext = "mp4"
        if "webm" in header:
            ext = "webm"
        elif "ogg" in header:
            ext = "ogg"
        elif "quicktime" in header:
            ext = "mov"
        mime = f"video/{ext}" if ext != "mp4" else "video/mp4"
        filename = f"{content_id}.{ext}"
        return upload_file(b64data, filename, mime)

    return value


def handler(event: dict, context) -> dict:
    """Обновление контента сайта КлиматПро из админ-панели. Поддерживает текст, изображения и видео."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    headers = event.get("headers") or {}
    token = headers.get("X-Admin-Token", "")
    schema = os.environ.get("MAIN_DB_SCHEMA", "public")

    if not verify_token(token, schema):
        return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Нет доступа"})}

    body = json.loads(event.get("body") or "{}")
    updates = body.get("updates", {})

    conn = get_conn()
    cur = conn.cursor()

    for content_id, update in updates.items():
        value = update.get("value", "")
        content_type = update.get("type", "text")

        if content_type in ("image", "video") and value.startswith("data:"):
            value = process_media(value, content_id, content_type)

        cur.execute(
            f"UPDATE {schema}.cms_content SET value = %s, updated_at = NOW() WHERE id = %s",
            (value, content_id)
        )

    conn.commit()
    cur.close()
    conn.close()

    return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True})}
