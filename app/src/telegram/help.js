
bot.command('new', async (ctx) => {
    console.log('💬 /new command');
    await onBotCommandNewPrivate(ctx);
});
*/

/*
bot.command('newtopic', async (ctx) => {
  console.log('💬 /newtopic command');
  await onBotCommandNewTopic(ctx);
});

bot.command('chat', async (ctx) => {
  console.log('💬 /chat command');
  await onBotCommandNewTopic(ctx);
});

bot.command('chatgpt', async (ctx) => {
  console.log('💬 /chatgpt command');
  await onBotCommandNewTopic(ctx);
});
*/

bot.command('help', async (ctx) => {
    console.log('🆘 /chatgpt command');
    if (ctx.chat.type === 'private') {
        await onBotCommandHelpPrivate(ctx);
    } else {
        await onBotCommandHelpGroup(ctx);
    }
});