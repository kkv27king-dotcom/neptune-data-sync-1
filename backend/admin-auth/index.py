import json
import os
import secrets
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """Авторизация в админ-панель сайта КлиматПро."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    action = body.get("action", "login")
    schema = os.environ.get("MAIN_DB_SCHEMA", "public")

    if action == "login":
        password = body.get("password", "")
        correct = os.environ.get("ADMIN_PASSWORD", "")
        if not correct or password != correct:
            return {"statusCode": 401, "headers": CORS, "body": {"error": "Неверный пароль"}}

        token = secrets.token_hex(32)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {schema}.admin_sessions (token) VALUES (%s)",
            (token,)
        )
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": CORS, "body": {"token": token}}

    if action == "verify":
        token = body.get("token", "")
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT token FROM {schema}.admin_sessions WHERE token = %s AND expires_at > NOW()",
            (token,)
        )
        row = cur.fetchone()
        cur.close()
        conn.close()
        if row:
            return {"statusCode": 200, "headers": CORS, "body": {"valid": True}}
        return {"statusCode": 401, "headers": CORS, "body": {"valid": False}}

    if action == "logout":
        token = body.get("token", "")
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {schema}.admin_sessions WHERE token = %s", (token,))
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": CORS, "body": {"ok": True}}

    return {"statusCode": 400, "headers": CORS, "body": {"error": "Unknown action"}}
