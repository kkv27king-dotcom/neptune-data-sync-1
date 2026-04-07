import json
import os
import urllib.request

TELEGRAM_CHAT_ID = "@Shist77"


def send_telegram(token: str, name: str, phone: str, message: str):
    """Отправка уведомления в Telegram."""
    text = (
        "📩 *Новая заявка с сайта КлиматПро*\n\n"
        f"👤 *Имя:* {name}\n"
        f"📞 *Телефон:* {phone}\n"
        f"💬 *Сообщение:* {message or '—'}"
    )
    payload = json.dumps({
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "Markdown",
    }).encode()
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
    )
    urllib.request.urlopen(req, timeout=10)


def handler(event: dict, context) -> dict:
    """Обработка заявки с сайта КлиматПро: отправка уведомления в Telegram."""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        phone = body.get("phone", "").strip()
        message = body.get("message", "").strip()

        if not name or not phone:
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": {"error": "Имя и телефон обязательны"},
            }

        errors = []

        token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
        if token:
            try:
                send_telegram(token, name, phone, message)
            except Exception as e:
                errors.append(f"telegram: {e}")

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": {"ok": True, "errors": errors},
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": {"error": str(e)},
        }
