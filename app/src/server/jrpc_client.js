const axios = require('axios');

const PY_PORT = process.env.PY_PORT;
if (!PY_PORT) {
    throw new Error('PY_PORT not found');
}

const send=async (method, params) => {
    console.log("jrpc send",method,params)
    try {
        var url = `http://127.0.0.1:${PY_PORT}/jsonrpc`;
        const requestBody = {
            jsonrpc: '2.0',
            id: 1,
            method: method,
            params: params,
        };

        const response = await axios.post(url, requestBody);
        if (response.data.error) {
            throw new Error(`JSON-RPC Error: ${response.data.error.message}`);
        }

        return response.data.result;
    } catch (error) {
        console.error(`Error sending JSON-RPC request: ${error.message}`);
        return null;
    }
}

const ctxSend= async (method, ctx, args) => {
    const cid=global.cid(ctx);
    params={cid:cid,args:args};
    return await send(method,params);
}



const client = { send, ctxSend }



module.exports = client;

