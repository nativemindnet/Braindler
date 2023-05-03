const { prompts } = require('./prompts.js');

const myName=process.env.MY_NAME??"RoboGPT"; 

const welcomeText = `👋 Welcome to ${myName}!`;

const msgs={
    enterFirstGoal: 'Please enter your first goal:',
    enterNewGoal: 'Please enter a new goal:',
    firstGoalAdded: 'First goal added! Your can add more goals and edit them using /goals',
    newGoalAdded:'New goal added!'
};


const helpPrivateText = `💬 Any time you can write text. 👨‍💻 And bot will follow your instructions.`;
const helpGroupText = helpPrivateText;
const feedbackText = `📝 Your feedback will help us improve the quality of the bot's responses. If you have any further questions, please feel free to contact us at https://t.me/+sX40MfvypnVmNjI6`;



const REACTIONS = {
    good: { emoji: '👍', description: 'Use this button to indicate a good answer. And continue' },
    //bad: { emoji: '👎', description: 'Use this button to indicate a bad answer' },
    retry: { emoji: '🔄', description: 'Retry' },
    //strict: { emoji: '🔬', description: 'Retry (Strict)' },
    //ideas: { emoji: '💡', description: 'Retry (Ideas)' }, //💥
    //terrible: { emoji: '❌', description: 'Use this button to indicate a terrible answer and ask not to get an answer like this again' },
    //stop: { emoji: '⛔', description: 'Stop this task generating' },
    //finish: { emoji: ' 🏁', description: 'Finish task successfully' },

    //bad: { emoji: '👎', description: 'Use this button to indicate a bad answer' },
    //markdown: { emoji: '📔', description: 'Use this button to show this answer formatted in markdown.' },
    //source: { emoji: '💻', description: 'Use this button to show  this answer without markdown (source code)' },
    //stop: { emoji: '⛔', description: 'Stop this task' },
    
};


const MENU = [
    {
        "action:google": { emoji: '🔍', description: 'Google', prompt: prompts.spiritual },
        "action:browse": { emoji: '🌐', description: 'Browse', prompt: prompts.spiritual }
    },

    {
        "action:develop": { emoji: '🔬', description: 'Code', prompt: prompts.developer },
        "action:computer": { emoji: '💻', description: 'Computer', prompt: prompts.scientist },
        "action:design": { emoji: '🎨', description: 'Design', prompt: prompts.svg },
        "action:files": { emoji: '📁', description: 'Files', prompt: prompts.svg },
    },
    {
        "action:contact": { emoji: '📞', description: 'Contact', prompt: prompts.scientist },
        "action:twitter": { emoji: '🐦', description: 'Twitter', prompt: prompts.scientist },
    }
/*
    {
        "instructions:plain": { emoji: '🤷‍♂️', description: 'Plain (no instructions)', prompt: prompts.plain },
        "instructions:dan": { emoji: '💪', description: 'DAN (jailbrake)', prompt: prompts.dan }
    },

    {
        "mode:qa": { emoji: '❓', description: 'Q&A', mode: "qa" },
        "mode:dialog": { emoji: '💬', description: 'Dialog', mode: "dialog" },
        //"mode:internet": { emoji: '🌐', description: 'Internet', mode:"internet" },
    }
*/

];

function createKeyboard(menu) {
    let keyboard = [];

    for (let i = 0; i < menu.length; i++) {
        let row = [];
        for (let key in menu[i]) {
            let button = {
                text: menu[i][key].emoji + " " + menu[i][key].description,
                callback_data: `menu:${key}`
            };
            row.push(button);
        }
        keyboard.push(row);
    }
    return keyboard;
}

//.oneTimeKeyboard(true);

const menuKeyboard = createKeyboard(MENU);
// console.log(menuKeyboard);

const instructionsKeyboard = menuKeyboard;


const reactionsText = Object.keys(REACTIONS).map(command => `${REACTIONS[command].emoji} - ${REACTIONS[command].description}`).join('\n');


module.exports = {
    REACTIONS, MENU,
    menuKeyboard, 
    welcomeText, reactionsText, feedbackText, helpPrivateText, helpGroupText,
    prompts, msgs
};