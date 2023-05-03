const { makeDialog } = require('./dialog.js');
const { COMMANDS, REACTIONS, INSTRUCTIONS, menuKeyboard, commandsText, reactionsText, prompts } = require('../const/const.js');



async function onBotCommandNewCommon(ctx) {
    await checkSession(ctx);
    const text = ctx.message.text;
    // Find the position of the first space character
    const separatorIndex = text.indexOf(" ");

    // Extract the command and parameter using the separator position
    const commandFull = text.substring(0, separatorIndex);
    const param = text.substring(separatorIndex + 1);

    const separatorIndex2 = commandFull.indexOf(" ");
    const command = commandFull.substring(0, separatorIndex2);
    const who = commandFull.substring(separatorIndex2 + 1);

    console.log("onBotCommandNewTopicCommon", command,who,param);



    //const command =
    //const topic = ctx.message.text.substring(ctx.message.text.indexOf(" ") + 1);
    //const topic = ctx.message.text.substring(ctx.message.text.search(/\s,\n+/) + 1);
    //TODO: И снова тут что-то не работает
    
    /*
    if (command == "/start") {
        command = "/new";
    }


    if ((topic == "/new@VedaVany2_bot") || (topic == "/newtopic@VedaVany2_bot")) {
        await ctx.reply('Usage: /new What is life after life?', { reply_to_message_id: ctx.message.message_id });
        return;
    }

    if ((topic == "/chat@VedaVany2_bot") || (topic == "/chatgpt@VedaVany2_bot") || (topic == "/chatgpt@uz_chatGPT_bot")) {
        await ctx.reply('Usage: /chat Can you please repeat?', { reply_to_message_id: ctx.message.message_id });
        return;
    }

    if ((topic == "/new") || (topic == "/newtopic") || (topic == "/chatgpt") || (topic == "/chat")) {
        if (!((topic == "/chatgpt") || (topic == "/chat"))) {
            ctx.session.dialog = prompts.default;
        }
        if (ctx.chat.type === 'private') {
            await ctx.reply('👉👨‍💻💬 Please choose instructions set or just type something:', { reply_markup: { parse_mode: "MakrdownV2", keyboard: menuKeyboard, resize_keyboard: true, one_time_keyboard: true } });
        } else {
            await ctx.reply('💬 New topic started');
        }
        return;
    }

    ctx.message.text = topic;
    await makeDialog(ctx);
    */
}

async function checkSession(ctx) {
    goal = "Оптимизируй страницу для показа на планшетах и мобильниках https://fulldome.pro/super_reality_dome_360/"


    if (typeof ctx.session === 'undefined') ctx.session = {
        goals: [],
        feedback: {},
    };

    if (typeof ctx.session.goals === 'undefined') ctx.session.goals = [];
    if (typeof ctx.session.feedback === 'undefined') ctx.session.feedback = {};
}


module.exports = {
    onBotCommandNewCommon,
    checkSession
};