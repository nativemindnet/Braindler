
const url = "http://127.0.0.1:5000/generate";

const { fetchWithTimeout,getCurrentDateFormatted } = require('../modules/helper');


async function guruchatConversation(ctx, chat_id, message_id, message, dialog, onConnected, onText, onTyping) {

    /*
        var beginMessage = [];
    
        var endMessage = [
            { "role": "user", "content": message }
        ];
    
        if (typeof dialog === 'undefined') dialog = [];
    
        var messages = beginMessage.concat(dialog, endMessage);
        return await chatgptConversationMessagesFetch2(ctx,chat_id,message_id,messages,onConnected, onText, onTyping);
        //return await chatgptConversationMessages(messages);
        */


    const headers = {
        //Authorization: `Bearer ${authorization}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    data = {
        //"instruction": "Please act as Śrīla Bhakti Rakshak Sridhar Dev-Goswami Mahārāja.\n",
        "instruction": `You are VedaVany, a large language model trained by 360SoftDevelopment. Answer as concisely as possible.
        Knowledge cutoff: 2023-03
        Current date: ${getCurrentDateFormatted()}`,
        "input": message
    };

    const res = await fetchWithTimeout(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        console.log(res);
        throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const d = await res.json();

    return d.response;
}



// Exporting the function
module.exports = {
    guruchatConversation
};