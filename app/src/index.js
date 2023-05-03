const dotenv = require('dotenv');
dotenv.config();

global.actions = require('./modules/actions');

global.events = require('./modules/events');
global.jrpc = {
    server: require('./server/jrpc_server'),
    client: require('./server/jrpc_client')
};


require('./telegram/funcs');
require('./telegram/telegram');
require('./telegram/work');

global.bot.launch();
console.log('🚀 Telegram RoboGPT bot is running');



