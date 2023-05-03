global.ctxs={}
global.lastMessages={};
global.replies = {};

global.cid = (ctx) => {
    if (ctx.chat.is_forum == true)
        res = `${ctx.chat.id}_${ctx.chat.message_thread_id}`
    else
        res = `${ctx.chat.id}`
    global.ctxs[res]=ctx;
    return res;
}

global.replyNewMessage = async(ctx,sub,text,params) => {
    newMessage = await ctx.replyWithMarkdown(text,params);
    var cid=global.cid(ctx);
    global.lastMessages[cid+"_"+sub]=newMessage;
    return newMessage;
}

global.editLastMessage = async(ctx,sub, text, params) => {
    var cid=global.cid(ctx);
    lastMessage=global.lastMessages?.[cid+"_"+sub];
    //console.log(ctx);
    //console.log(lastMessage);

    if (typeof lastMessage!="undefined")
        newMessage = await ctx.telegram.editMessageText(lastMessage.chat.id,lastMessage.message_id, null, text, params);
    else
        newMessage = await ctx.replyWithMarkdown(text,params);
    cid=global.cid(ctx);
    global.lastMessages[cid+"_"+sub]=newMessage;
    return newMessage;
}

global.deleteLastMessage = async(ctx,sub, text, params) => {
    var cid=global.cid(ctx);
    lastMessage=global.lastMessages?.[cid+"_"+sub];
    //console.log(ctx);
    //console.log(lastMessage);

    if (typeof lastMessage!="undefined")
        newMessage = await ctx.deleteMessage(lastMessage.message_id);

    cid=global.cid(ctx);
    delete global.lastMessages[cid+"_"+sub];
    return newMessage;
}

global.clearStart = async(ctx) => {
    var cid=global.cid(ctx);
    delete global.ctxs[cid];
    delete lastMessages[cid+"_console"];
    delete lastMessages[cid+"_goals"];
}