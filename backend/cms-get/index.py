import json
import os
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def handler(event: dict, context) -> dict:
    """Получение контента сайта КлиматПро из базы данных."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    params = event.get("queryStringParameters") or {}
    page = params.get("page")
    schema = os.environ.get("MAIN_DB_SCHEMA", "public")

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    if page:
        cur.execute(
            f"SELECT id, section, content_type, value FROM {schema}.cms_content WHERE page = %s",
            (page,)
        )
    else:
        cur.execute(f"SELECT id, section, content_type, value FROM {schema}.cms_content ORDER BY page, section")

    rows = cur.fetchall()
    cur.close()
    conn.close()

    data = {}
    for row in rows:
        data[row[0]] = {"section": row[1], "type": row[2], "value": row[3] or ""}

    return {"statusCode": 200, "headers": CORS, "body": {"content": data}}
