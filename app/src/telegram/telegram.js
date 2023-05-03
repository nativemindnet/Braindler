const { Telegraf, Markup } = require('telegraf');
const { Keyboard } = require('telegram-keyboard')
const LocalSession = require('telegraf-session-local')


const { welcomeText, msgs } = require('../const/const.js');
const { COMMANDS,COMMANDStg, commandsText } = require('../const/commands.js');

// Load environment variables
const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
if (!telegramBotToken) {
    throw new Error('TELEGRAM_BOT_TOKEN not found');
}


// Create a new Telegraf instance using the API token provided by BotFather
global.bot = new Telegraf(telegramBotToken);

// Set up local session middleware to store user data
const sessionPath = './data/sessions/session.json';
const session = new LocalSession();
global.bot.use((new LocalSession({ database: sessionPath })).middleware())

console.log(COMMANDStg);
global.bot.telegram.setMyCommands(COMMANDStg);




global.bot.start(async (ctx) => {
    console.log('🚀 /start');
    await global.clearStart(ctx);
    
    ctx.session.s = ctx.session.s || {};
    ctx.session.s[global.cid(ctx)] = ctx.session.s[global.cid(ctx)] || {};
    ctx.session.s[global.cid(ctx)].goals = ctx.session.s[global.cid(ctx)].goals || [];
    
    if (ctx.chat.type === 'private') {
        await ctx.reply(welcomeText);
    }

    const args = ctx.message.text.split(' ').slice(1).join(' ');
    if (args) {
        ctx.session.s[global.cid(ctx)].goals = [args];
        //await ctx.answerCbQuery(msgs.firstGoalAdded);
        //global.actions.ChangeGoals({cid:global.cid(ctx),goals:ctx.session.s[global.cid(ctx)].goals});
        global.actions.StartWork(ctx,ctx.session.s[global.cid(ctx)].goals);
    } else {
        ctx.session.s[global.cid(ctx)].goals = [];
        //await ctx.reply(msgs.enterFirstGoal, Markup.forceReply());
        ///*Markup.forceReply()*/
        newMessage = await global.editLastMessage(ctx, "goals", msgs.enterFirstGoal, {}  );
    }


});


require('./goals');

/*
global.bot.command("goals", async (ctx) => {
    console.log(`1 /goals`);
});
*/

global.bot.on('text', async (ctx) => {
    if (ctx.message.reply_to_message && ctx.message.reply_to_message.from.id === ctx.botInfo.id) {
        func = global.replies[ctx.message.reply_to_message.text];
        if (typeof func != "undefined")
            await func(ctx);
            return
    }
    if (ctx.session.s[global.cid(ctx)].goals.length==0)
    {
        func = global.replies[msgs.enterFirstGoal];
        await func(ctx);
        return
    }

});

/*
global.bot.command("goals", async (ctx) => {
    console.log(`2 /goals`);
});
*/







global.bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
});













