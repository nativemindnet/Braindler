const { Telegraf, Markup } = require('telegraf');
const { msgs } = require('../const/const.js');


if (typeof global.bot == "undefined")
    throw ("Telegram bot not initialized");





const {
    onBotStartPrivate,
    onBotCommandNewTopicPrivate,
    onBotCommandHelpPrivate,
    onBotTextPrivate } = require('../modules/private.js');

const {
    onBotStartGroup,
    onBotCommandNewTopicGroup,
    onBotCommandHelpGroup,
    onBotTextGroup } = require('../modules/group.js');

const { onBotCommandNewTopicCommon, checkSession } = require('../modules/common.js');

const { makeDialog } = require('../modules/dialog.js');
const { COMMANDS, REACTIONS, INSTRUCTIONS, MENU, menuKeyboard, commandsText, reactionsText, prompts } = require('../const/const.js');

// Listen for incoming text messages
/*
global.bot.on('text', async (ctx) => {
    console.log('💬 bot.on(text)', ctx.message.text);
    try {
        await checkSession(ctx);
        if (ctx.chat.type === 'private') {
            console.log('🗨️ PRIVATE text received');
            //if (ctx.session.mode == "qa") ctx.session.dialog = ctx.session.prompt;
            //await makeDialog(ctx);
        } else {
            console.log('👥 GROUP text received');
            //await onBotTextGroup(ctx);
            global.lastCtx = ctx;
            result = global.actions.SendText({cid:global.cid(ctx),text:ctx.message.text});
        }
    } catch (err) {
        // Handle errors gracefully
        console.error('❌ Error:', err);
        if (err.response.status == 429) {
            await ctx.reply('Oops! Too many requests, bot is overloaded. Please try again little bit later.');
        } else if (err.response.status == 400) {
            await ctx.reply('Oops! Something went wrong with server. Please try again later or try to restart bot using /start command.');
        } else {
            await ctx.reply(`Oops! Something went wrong(status code ${err.response.status}). Please try again later or try to restart bot using /start command.`);
        }
    }
    console.log('🚀 FINISH bot.on(text)');
});
*/



global.bot.action(/reaction:(.*):(.*)/, async (ctx) => {
    const reactionType = ctx.match[1];
    const reactionMessageId = ctx.match[2];
    //console.log(reactionType, reactionMessageId);
    if (reactionType == "good")
        result = await global.actions.btnExecute(ctx);
    if (reactionType == "retry")
        result = await global.actions.btnRetry(ctx);

    //ctx.session.feedback[reactionMessageId] = reactionType;
    await ctx.answerCbQuery('OK!', { show_alert: false }); //cache_time: 300  
});