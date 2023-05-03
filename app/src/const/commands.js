// Enable command menu
const COMMANDS = {
    'start': { emoji: "🚀", func:null , description: 'Start/restart bot',  usage: '/start Make Tamagoichi 3D game on Unity.' },
    //'goals': { emoji: "🎯", func: null, description: 'Edit goals', usage: '/goals' },

    //{ command: 'help', emoji: "", funcPrivate: onBotCommandHelpPrivate, funcGroup: onBotCommandHelpGroup, description: 'Get help' },

    //{ command: 'account', description: 'My Profile. Usage: /account' },
    //{ command: 'premium', description: 'Premium subscription. Usage: /account' },
    //{ command: 'language', description: 'Change language. Usage: /language' },
    //{ command: 'donations', description: 'Support us' },

    //{ command: 'new', emoji: "💬", funcPrivate: onBotCommandNewPrivate, funcGroup: null, description: 'Add a new goal', usage: '/new Make Tamagoichi 3D game on Unity.' }, // List tasks. Usage: /list
    
    //{ command: 'integrations', emoji: "", funcPrivate: null, funcGroup: null, description: 'Integrations settings', usage: '/connections' },

    //{ command: 'stop', emoji: "", funcPrivate: null, funcGroup: null, description: 'Stop the bot' },
    //{ command: 'finish', description: 'Remove tasks. Usage: /remove ' },
    //{ command: 'translate', description: 'Translate to english next message' },  
    //{ command: 'chats', description: 'Show chats list' },
    //{ command: 'prompts', description: 'Chose special prompt' },  
    //{ command: 'useinternet_once', description: 'Use internet once for next mesage' },  
    //{ command: 'useinternet_always', description: 'Use internet always for this chat' },  
    //{ command: 'useinternet_never', description: 'Useinternet never for this chat' },  

};

let commandsText = '';
for (const name in COMMANDS) {
  const cmd = COMMANDS[name];
  commandsText += `${name} - ${cmd.emoji}${cmd.description}\n`;
}

const COMMANDStg = [];
for (const name in COMMANDS) {
  const cmd = COMMANDS[name];
  COMMANDStg.push({ command: name, description: `${cmd.emoji} ${cmd.description}` });
}

module.exports = {
    COMMANDS, COMMANDStg, commandsText
};