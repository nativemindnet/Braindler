const express = require('express');
const bodyParser = require('body-parser');




const JS_PORT = process.env.JS_PORT;
if (!JS_PORT) {
    throw new Error('JS_PORT not found');
}

// Start JRPC server
const app = express();
app.use(bodyParser.json());



app.post('/jsonrpc', async (req, res) => {
  const { jsonrpc, method, params, id } = req.body;
  console.log("Get /jsonrpc",method,params);

  if (jsonrpc !== '2.0') {
    res.status(400).json({ error: 'Invalid JSON-RPC version' });
    return;
  }

  if (events.hasOwnProperty(method)) {
    try {
      console.log(`Get /jsonrpc => ${method}`, params);
      const cid=params.cid;
      const args=params.args;
      const ctx=global.ctxs[cid];

      const result = await events[method](ctx,args);
      await res.json({ jsonrpc, result, id });
    } catch (error) {
      console.error('❌ Error:', error);
      await res.status(500).json({ jsonrpc, error: { message: 'Internal error' }, id });
    }
  } else {
      console.error('❌ Error:', "Method not found");
    await res.status(400).json({ jsonrpc, error: { message: 'Method not found' }, id });
  }
});

const port = process.env.PORT || JS_PORT;
app.listen(port, () => {
  console.log(`JRPC Server listening on port ${port}`);
});
