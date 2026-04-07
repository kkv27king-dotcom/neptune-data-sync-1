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


def upload_image(data_b64: str, filename: str) -> str:
    data = base64.b64decode(data_b64)
    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
    key = f"cms/{filename}"
    ext = filename.rsplit(".", 1)[-1].lower()
    content_type = "image/jpeg" if ext in ("jpg", "jpeg") else f"image/{ext}"
    s3.put_object(Bucket="files", Key=key, Body=data, ContentType=content_type)
    access_key = os.environ["AWS_ACCESS_KEY_ID"]
    return f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"


def handler(event: dict, context) -> dict:
    """Обновление контента сайта КлиматПро из админ-панели."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    headers = event.get("headers") or {}
    token = headers.get("X-Admin-Token", "")
    schema = os.environ.get("MAIN_DB_SCHEMA", "public")

    if not verify_token(token, schema):
        return {"statusCode": 401, "headers": CORS, "body": {"error": "Нет доступа"}}

    body = json.loads(event.get("body") or "{}")
    updates = body.get("updates", {})

    conn = get_conn()
    cur = conn.cursor()

    for content_id, update in updates.items():
        value = update.get("value", "")
        content_type = update.get("type", "text")

        if content_type == "image" and value.startswith("data:"):
            # strip data URL prefix: data:image/jpeg;base64,....
            parts = value.split(",", 1)
            if len(parts) == 2:
                b64data = parts[1]
                ext = "jpg"
                if "png" in parts[0]:
                    ext = "png"
                elif "webp" in parts[0]:
                    ext = "webp"
                filename = f"{content_id}.{ext}"
                value = upload_image(b64data, filename)

        cur.execute(
            f"UPDATE {schema}.cms_content SET value = %s, updated_at = NOW() WHERE id = %s",
            (value, content_id)
        )

    conn.commit()
    cur.close()
    conn.close()

    return {"statusCode": 200, "headers": CORS, "body": {"ok": True}}
