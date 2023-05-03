const { on } = require("stream");
const { REACTIONS } = require('../const/const.js');


const events = {
  thinking: async (ctx, args) => {
    newMessage = global.replyNewMessage(ctx,"console", '⌛ Thinking...', { parse_mode: 'Markdown'});
    return 'OK';
  },


  executing: async (ctx, args) => {
    //newMessage = await ctx.replyWithMarkdown('⌛ Executing...');
    newMessage = await global.editLastMessage(ctx,"console", '⌛ Executing...', { parse_mode: 'Markdown'});
    return 'OK';
  },

  thoughts: async (ctx, args) => {
    text = `\`\`\`
Thoughts:
${args.thoughts.text}

Reasoning:
${args.thoughts.reasoning}

Plan:
${args.thoughts.plan}

Criticism:
${args.thoughts.criticism}

Speak:
${args.thoughts.speak}

Command:
${args.command.name}

Arguments:
${JSON.stringify(args.command.args)}
\`\`\``;

    const cid=global.cid(ctx)
    const reactionsKeyboard = Object.keys(REACTIONS).map(command => ({
      text: REACTIONS[command].emoji,
      callback_data: `reaction:${command}:${cid}`
    }));


    newMessage = await global.editLastMessage(ctx,"console", text, { parse_mode: 'Markdown', reply_markup: { inline_keyboard: [reactionsKeyboard] } });
    return 'OK';



  },

}


module.exports = events;