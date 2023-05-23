import requests
import json

import os
from dotenv import load_dotenv


load_dotenv(verbose=True)
JS_PORT=os.getenv("JS_PORT", "11082")


def send_jrpc_request(method, params):
    url=f"http://127.0.0.1:{JS_PORT}/jsonrpc"
    headers = {"content-type": "application/json"}

    payload = {
        "method": method,
        "params": params,
        "jsonrpc": "2.0",
        "id": 1,
    }

    response = requests.post(url, data=json.dumps(payload), headers=headers)

    if response.status_code == 200:
        response_data = response.json()

        if "result" in response_data:
            return response_data["result"]
        elif "error" in response_data:
            raise Exception("Error:", response_data["error"])
    else:
        raise Exception("Request failed with status code:", response.status_code)

def cid_send(method, cid, args):
    return send_jrpc_request(method,{"cid":cid,"args":args})
