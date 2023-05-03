
const actions = {
    ChangeGoals: async (ctx, goals) => {
        //sid(ctx), ctx.session.s[sid(ctx)].goals);
        result = await global.jrpc.client.ctxSend("setGoals",ctx, {goals:goals});
        
    },
    StartWork: async (ctx, goals) => {
        result = await global.jrpc.client.ctxSend("startWork",ctx, {goals:goals});
        
    },
    SendText: async (ctx, text) => {
        result = await global.jrpc.client.ctxSend("sendText",ctx, { text:text});
        
    },
    btnExecute: async (ctx) => {
        result = await global.jrpc.client.ctxSend("sendText",ctx, { text: "Y"});
        newMessage = global.replyNewMessage(ctx,"console", '🗣️ EXECUTE command send...', { parse_mode: 'Markdown'});
      },
    btnRetry:async (ctx) => {        
        result = await global.jrpc.client.ctxSend("sendText",ctx, { text: "R"});
        newMessage = await global.editLastMessage(ctx,"console",  "🗣️ RETRY command send...", { parse_mode: 'Markdown'});
      },

}


module.exports = actions;