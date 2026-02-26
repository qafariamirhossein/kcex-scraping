import requests
import json
import hashlib
import time


# =========================
# SIGN LIKE BROWSER - EXACT ALGORITHM
# =========================
def generate_signature(auth_token: str, timestamp: int, body: dict) -> str:
    # Step 1: B = md5(auth_token + timestamp).substr(7)
    token_ts = auth_token + str(timestamp)
    B = hashlib.md5(token_ts.encode('utf-8')).hexdigest()[7:]
    
    # Step 2: bodyString = JSON.stringify(body) - default separators (space after colon)
    body_string = json.dumps(body)
    
    # Step 3: sign = md5(timestamp + bodyString + B)
    sign_input = str(timestamp) + body_string + B
    sign = hashlib.md5(sign_input.encode('utf-8')).hexdigest()
    
    return sign


# =========================
# COPY THESE FROM BROWSER
# =========================
AUTH_TOKEN = "WEB622f065deb7b6a9d9b9d6424a31b58d317969edc111654bd2b045bd268dfa227"


url = "https://www.kcex.com/fapi/v1/private/order/create"


# =========================
# BUILD BODY EXACTLY LIKE BROWSER
# ORDER MATTERS
# =========================
payload = {
    # ---- order fields (A) ----
    "symbol": "TRUMP_USDT",
    "side": 3,
    "openType": 1,
    "type": 1,                 # must match browser type (number not string)
    "vol": 1,
    "leverage": 20,
    "marketCeiling": 0,        # browser usually uses 0/1 not true/false
    "price": "3.427",
    "priceProtect": 0,
    "bboPriceType": 1,
}

# =========================
# SIGN AFTER BODY COMPLETE
# =========================
content_time = int(time.time() * 1000)
sign = generate_signature(AUTH_TOKEN, content_time, payload)


headers = {
    "accept": "*/*",
    "accept-language": "en-US",
    "accept-timezone": "UTC+03:30",
    "authorization": AUTH_TOKEN,
    "content-type": "application/json",
    "content-sign": sign,
    "content-time": str(content_time),
    "language": "en-US",
    "origin": "https://www.kcex.com",
    "platform": "WEB",
    "referer": "https://www.kcex.com/futures/exchange/TRUMP_USDT?type=linear_swap",
    "user-agent": "Mozilla/5.0",
    "version": "1.0.0",
}


response = requests.post(url, headers=headers, json=payload)

print("Status:", response.status_code)
print("Response:", response.text)