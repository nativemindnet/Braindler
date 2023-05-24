import sys


from app.server.eventsG import eventsG

from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os
from dotenv import load_dotenv

class JRPCRequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_len = int(self.headers.get('content-length'))
        post_body = self.rfile.read(content_len).decode('utf-8')


        request = json.loads(post_body)
        
        # Get the command and arguments from the request
        command = request.get('method')
        params = request.get('params', {})
        print('Got JRPC instruction', command, params)
        cid = params["cid"]
        args = params["args"]
        print(cid,args)

        if command == "startWork":
            response=eventsG[command](command,cid,args)
        else:
            response=eventsG["other"](command,cid,args)

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(str(response).encode('utf-8'))


def serve():
    load_dotenv(verbose=True)
    PY_PORT=os.getenv("PY_PORT", "11081")

    hserver = HTTPServer(('localhost', int(PY_PORT)), JRPCRequestHandler)
    print(f"Starting jrpc server on http://localhost:{PY_PORT}")

    hserver.serve_forever()

