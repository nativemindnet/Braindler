const { COMMANDS, REACTIONS, INSTRUCTIONS, menuKeyboard,commandsText,reactionsText,feedbackText,helpGroupText,prompts } = require('../const/const.js');



async function onBotStartGroup(ctx) {
    console.log(ctx);
    console.log(ctx.message.message_thread_id);
    //await ctx.reply('👋 Hi', { reply_markup: { message_thread_id:ctx.message.message_thread_id}} );
    await ctx.reply('👋 Hi',  { reply_to_message_id: ctx.message.message_id } );
}


async function onBotCommandHelpGroup(ctx) {
    await ctx.reply('List of commands:',{ reply_to_message_id: ctx.message.message_id });
    await ctx.reply(commandsText,{ reply_to_message_id: ctx.message.message_id });
    await ctx.reply(helpGroupText,{ reply_to_message_id: ctx.message.message_id });
    await ctx.reply(reactionsText,{ reply_to_message_id: ctx.message.message_id });
    await ctx.reply(feedbackText,{ reply_to_message_id: ctx.message.message_id });
  }

async function onBotTextGroup(ctx) {
    console.log(ctx);
    console.log(ctx.message.from);
    console.log(ctx.message.chat);
    //await ctx.reply("group");
}


module.exports = {
    onBotStartGroup,
    onBotCommandHelpGroup,
    onBotTextGroup
};