from server.jrpc.jrpc_client import cid_send

def thinking(cid):
    result = cid_send("thinking", cid,{})

def thoughts(cid, thoughts):
    result = cid_send("thoughts", cid,thoughts)

actions = {
    'thinking': thinking,
    'thoughts': thoughts
}
