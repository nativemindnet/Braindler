const {onBotCommandNewTopicCommon} = require('./common.js');
const { COMMANDS, REACTIONS, INSTRUCTIONS, menuKeyboard,welcomeText,commandsText,reactionsText,feedbackText,helpPrivateText,prompts } = require('../const/const.js');

async function onBotStartPrivate(ctx) {
    await ctx.reply(welcomeText);
    await onBotCommandHelpPrivate(ctx);
    await onBotCommandNewTopicCommon(ctx);
}


async function onBotCommandHelpPrivate(ctx) {
    await ctx.reply('List of commands:');
    await ctx.reply(commandsText);
    await ctx.reply(helpPrivateText);
    await ctx.reply(reactionsText);
    await ctx.reply(feedbackText);
    
}

async function onBotTextPrivate(ctx) {
    console.log(ctx);
    console.log(ctx.message.from);
    console.log(ctx.message.chat);
    //await ctx.reply("private");
}


async function onBotCommandNewTopic(ctx) {
    //console.log(ctx,ctx.message.text);
    await checkSession(ctx);
    await onBotCommandNewTopicCommon(ctx);
  }


module.exports = {
    onBotStartPrivate,
    onBotCommandHelpPrivate,
    onBotTextPrivate,
    
};