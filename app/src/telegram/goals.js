const { Telegraf, Markup } = require('telegraf');
const { msgs } = require('../const/const.js');


if (typeof global.bot == "undefined")
    throw ("Telegram bot not initialized");



function generateGoalsKeyboard(goals) {
    const rows = goals.map((goal, index) => [
        Markup.button.callback(goal, `deleteGoal:${index}`),
    ]);
    if (goals.length < 5) {
        rows.push([Markup.button.callback('Add goal', 'addGoal')]);
    }
    return Markup.inlineKeyboard(rows);
}


async function showGoals(ctx) {
    const markdown = generateGoalsKeyboard(ctx.session.s[global.cid(ctx)].goals);
    //console.log(markdown);

    //{reply_markup: { force_reply: true }}
    if (ctx.session.s[global.cid(ctx)].goals.length) {
        newMessage = await global.editLastMessage(ctx, "goals", 'Goals management\n(To delete, chose goal)\n\nYour goals:', {reply_markup: { force_reply: true }} );
    } else {
        newMessage = await global.editLastMessage(ctx, "goals", 'You have no goals. Press the button below to add a new goal.',markdown );
    }
}

global.bot.command("goals", async (ctx) => {
    console.log(`/goals`);
    await showGoals(ctx);

});




global.bot.action(/addGoal/, async (ctx) => {
    const action = ctx.match[0].split(':')[0];
    const index = ctx.match[0].split(':')[1];

    if (ctx.session.s[global.cid(ctx)].goals.length < 5) {
        newMessage = await global.editLastMessage(ctx, "goals", msgs.enterNewGoal, { parse_mode: 'Markdown', reply_markup: Markup.forceReply() });
        //await ctx.reply(msgs.enterNewGoal, Markup.forceReply());
        //const inlineKeyboard = generateGoalsKeyboard(ctx.session.s[global.cid(ctx)].goals);
        //await ctx.editMessageText('Please type a new goal:', Markup.combine([Markup.forceReply(),inlineKeyboard]));            
    } else {
        await ctx.answerCbQuery('Maximum number of goals reached (5). Please delete one to add a new goal.');
        return;
    }

    await ctx.answerCbQuery();
});


global.bot.action(/deleteGoal:\d+/, async (ctx) => {
    const action = ctx.match[0].split(':')[0];
    const index = ctx.match[0].split(':')[1];


    ctx.session.s[global.cid(ctx)].goals.splice(index, 1);
    if (ctx.session.s[global.cid(ctx)].goals.length < 2) {
        await ctx.answerCbQuery('Cannot delete, should be at least 1 goal');
        return;
    }
    await ctx.answerCbQuery('Goal deleted');
    await showGoals(ctx);
    //const inlineKeyboard = generateGoalsKeyboard(ctx.session.s[global.cid(ctx)].goals);
    //await ctx.editMessageText(ctx.session.s[global.cid(ctx)].goals.length ? 'Your goals:' : 'You have no goals. Press the button below to add a new goal.', inlineKeyboard);
    global.events.onGoalsChanged(global.cid(ctx), ctx.session.s[global.cid(ctx)].goals)

});


const funcs = {
    addFirstGoal: async (ctx) => {
        ctx.session.s[global.cid(ctx)].goals.push(ctx.message.text);
        //await ctx.deleteMessage(ctx.message.reply_to_message.message_id);
        //await showGoals(ctx);
        await global.actions.StartWork(ctx, ctx.session.s[global.cid(ctx)].goals);

    },

    addNewGoal: async (ctx) => {
        ctx.session.s[global.cid(ctx)].goals.push(ctx.message.text);
        //await ctx.deleteMessage(ctx.message.reply_to_message.message_id);
        await showGoals(ctx);
        await global.actions.ChangeGoals(ctx, ctx.session.s[global.cid(ctx)].goals);
    }
}


global.replies[msgs.enterFirstGoal] = funcs.addFirstGoal;
global.replies[msgs.enterNewGoal] = funcs.addNewGoal;



