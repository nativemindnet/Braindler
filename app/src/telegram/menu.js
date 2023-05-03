async function onMenu(ctx, text, callback_data) {
    console.log('👨‍💻 Select instruction command', text, callback_data);

    const regex = /^menu:instructions:(.*)$/;

    const match = regex.exec(callback_data);
    if (match) {
        const instruction = match[1].trim();
        console.log(instruction);
        console.log("Instruction prompt:", prompts[instruction]);
        ctx.session.dialog = prompts[instruction];
        ctx.session.prompt = prompts[instruction];
        //await ctx.answerCbQuery('Instructions set, please write your text!', { show_alert: false }); //cache_time: 300  
        await ctx.reply(`👉👨‍💻💬 Now just type something (${text}):`);

    }

    const regexMode = /^menu:mode:(.*)$/;
    const matchMode = regexMode.exec(callback_data);
    if (matchMode) {
        const mode = matchMode[1].trim();
        console.log(mode);
        console.log("Mode:", mode);
        ctx.session.mode = mode;
        await ctx.reply(`👉👨‍💻💬 Now just type something (mode:${ctx.session.mode}):`);

    }

}

//Make menu hears functions
menuKeyboard.forEach(row => {
    //console.log(row);
    for (let key in row) {
        const button = row[key];
        bot.hears(button.text, ctx => {
            onMenu(ctx, button.text, button.callback_data)
        });
    };
});