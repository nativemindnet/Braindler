const OpenAI = require('openai-api');
const stream = require('stream');


const EventSource = require('eventsource');
//const fetch = require('node-fetch');
//const fetch = require('@microsoft/fetch-event-source');

const {fetchWithTimeout} = require('../modules/helper');


const authorization = process.env.OPENAPI_AUTHORIZATION; // Storing the authorization token in a variable

const MODEL = "gpt-3.5-turbo"; //"model": "gpt-4-32k",

const axios = require('axios'); // Importing the axios package

// Function to initiate conversation with GPT engine
//https://github.com/openai/openai-node/issues/18#issuecomment-1369996933








async function chatgptConversationMessagesFetch2(ctx,chat_id,message_id,messages, onConnected, onText, onTyping) {
    //try {
    console.log('⌛Connecting');
    const url = `https://api.openai.com/v1/chat/completions`;
    const headers = {
        Authorization: `Bearer ${authorization}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    const data = {
        "model": MODEL,
        "messages": messages,
        stream: true,
    };

    const res = await fetchWithTimeout(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    // Create a reader for the response body
    const reader = res.body.getReader();
    // Create a decoder for UTF-8 encoded text
    const decoder = new TextDecoder("utf-8");
    let result = "";
    // Function to read chunks of the response body

    let fullText = ''
    let lastFire = 0
    let lastFireTyping = 0

    var delay = 250; //in ms
    var delayTyping = 5000; //in ms

    var start = Date.now();
    //async function read() {

    console.log('✍️Connected');
    await onConnected(ctx,chat_id,message_id,messages);

    while (true) {
        var { value, done } = await reader.read();

        var decoded = /**/ await decoder.decode(value);
        //console.log("done,decoded",done,decoded);
        const regex = /"delta":\s*({.*?"content":\s*".*?"})/g; // Add the 'g' flag for global search
        const decodedMatchAll = [...decoded.matchAll(regex)]; // Use the spread operator to create an array of matches
        //console.log("matchAll", decodedMatchAll);

        //const match = /**/ await decoded.match(/"delta":\s*({.*?"content":\s*".*?"})/);
        //console.log("match",match);
        //const delta = match?.[1]

        await decodedMatchAll.forEach(async(match) =>  {
            const delta = match?.[1];
        //if (delta) {
            const js = /**/await JSON.parse(delta)
            const content = js.content;

            fullText += content
            //console.log("content:", content);

            const punctuationRegex = /[\p{P}\p{S}]/gu;
  
            // Use regular expression to match spaces including line breaks.
            const spacesRegex = /[\p{Z}\s]/gu;
            
            // Combine both regular expressions to match all punctuation, symbols, and spaces.
            const regex = new RegExp(`${punctuationRegex.source}|${spacesRegex.source}`, 'gu');


            //Detects punctuation, if yes, fires onText once per .5 sec
            if (await regex.test(content)) {
                const now = Date.now();

                if ((now - start) > 2000) delay = 1000;
                if ((now - start) > 5000) delay = 2000;
                if ((now - start) > 10000) delay = 5000;

                if (now - lastFire > delay) {
                    //delay=delay*1.5;
                    lastFire = now
                    /**/ await onText(ctx,chat_id,message_id,fullText)
                }
                if (now - lastFireTyping > delayTyping) {
                    //delay=delay*1.5;
                    lastFireTyping = now;
                    /**/ await onTyping(ctx);
                }
            }
        }
        );

        if (done) {
            ///**/await onText(ctx,chat_id,message_id,fullText);
            console.log("DONE",  done);
            //return value;
            break;
        }


    }



    //await read()

    //}

    //await read()

    return fullText;
    //} catch (error) {
    //    return "Oops. Error. Sorry";
    //}
}



async function chatgptConversationMessagesApi(messages) {
    const openai = new OpenAI(authorization);

    const data = {
        "model": MODEL,
        "messages": messages,
        stream: true,
    };


    const transformer = new stream.Transform({
        objectMode: true,
        transform: function (chunk, encoding, callback) {
            const text = chunk.text;
            console.log(text);
            callback();
        },
    });


    console.log(openai)
    openai.createCompletion(data).then((response) => {
        response.stream()
            .pipe(transformer)
            .on('error', console.error)
            .on('end', () => console.log('Stream complete.'));
    });


}


async function chatgptConversationMessages(messages) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const data = {
        "model": MODEL,
        "messages": messages
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authorization}`,
    };
    console.log('📩 Outgoing data:', data);

    // Sending a POST request to the OpenAI endpoint
    const response = await axios.post(url, data, { headers });

    // Debugging message with emojiz
    // console.log("🤖 GPT response received:", response.data);

    // Extracting the response from OpenAI
    const choices = response.data.choices;


    // Returning the response
    if (choices && choices.length > 0) {
        var result = choices[0].message.content.trim()
        console.log("🤖 GPT response received:", result);
        return result;
    }

    // Debugging message with emoji
    console.log("❌ Error: Unable to get response from GPT engine.");

    return '';
}



async function chatgptConversationMessagesNodeFetch(messages) {



    const url = `https://api.openai.com/v1/completions?engine=${encodeURIComponent(MODEL)}&prompt=${encodeURIComponent(PROMPT)}&max_tokens=50&n=1&stream=true`;
    const headers = {
        Authorization: `Bearer ${authorization}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    const fetchData = async () => {
        const response = await fetch(url, { headers });
        const stream = response.body;
        const reader = stream.getReader();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const text = new TextDecoder('utf-8').decode(value);
            const json = JSON.parse(text);
            const generatedText = json.choices[0].text.trim();
            console.log(generatedText);
        }
    };

    fetchData().catch((error) => {
        console.error(error);
    });
}


async function chatgptConversationMessagesEventSource(messages) {

    const url = 'https://api.openai.com/v1/chat/completions'


    const data = {
        "model": MODEL,
        "messages": messages,
        "stream": true
    };

    const params = `model=${encodeURIComponent(MODEL)}&messages=${encodeURIComponent(JSON.stringify(messages))}&stream=true`;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authorization}`,
    };

    console.log('📩 Outgoing data:', data);

    const evtSource = new EventSource(url + "?" + params, {
        withCredentials: true,
        headers: headers,
    });

    evtSource.onmessage = (event) => {
        console.log(message, event.data);
    };

    evtSource.onerror = (err) => {
        console.error("EventSource failed:", err);
    };

    await new Promise((resolve, reject) => {
        evtSource.addEventListener('close', resolve);
        evtSource.addEventListener('error', reject);
    });




    return "OK";
    // Sending a POST request to the OpenAI endpoint
    const response = await axios.post(url, data, { headers });

    // Debugging message with emoji
    // console.log("🤖 GPT response received:", response.data);

    // Extracting the response from OpenAI
    const choices = response.data.choices;


    // Returning the response
    if (choices && choices.length > 0) {
        var result = choices[0].message.content.trim()
        console.log("🤖 GPT response received:", result);
        return result;
    }

    // Debugging message with emoji
    console.log("❌ Error: Unable to get response from GPT engine.");

    return '';
}

async function chatgptConversationMessagesFetch(messages) {

    const url = 'https://api.openai.com/v1/chat/completions';
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "stream": true
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authorization}`,
    };

    console.log('📩 Outgoing data:', data);

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log('📨 Incoming response:', response);
            // Respond to the response here
        })
        .catch(error => {
            console.error('Error:', error);
        });


    /*
        
    
        const data = {
            "model": "gpt-3.5-turbo",
            "messages": messages,
            "stream": true
        };
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authorization}`,
        };
    
        console.log('📩 Outgoing data:', data);
    
        const evtSource = new EventSource(url, {
            withCredentials: true,
                headers: headers,
        });
    
        evtSource.onmessage = (event) => {
            console.log(message, event.data);
        };
    
        evtSource.onerror = (err) => {
            console.error("EventSource failed:", err);
        };
    
        await new Promise((resolve, reject) => {
            evtSource.addEventListener('close', resolve);
            evtSource.addEventListener('error', reject);
        });
    */
    /*
     const url = 'https://api.openai.com/v1/chat/completions';
 
     const data = {
         "model": "gpt-3.5-turbo",
         "messages": messages,
         "stream": true
     };
 
     const headers = {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${authorization}`,
     };
 
     console.log('📩 Outgoing data:', data);
 
     var evtSource=fetch(url, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify(data)
     });
 
     evtSource.onmessage = (event) => {
         console.log(message, event.data);
     };
 
     evtSource.onerror = (err) => {
         console.error("EventSource failed:", err);
     };
 
     await new Promise((resolve, reject) => {
             evtSource.addEventListener('close', resolve);
             evtSource.addEventListener('error', reject);
     });
 */
    /*
    .then(response => {
        console.log('📨 Incoming response:', response);
        // Respond to the response here
    })
    .catch(error => {
        console.error('Error:', error);
    });
*/



    return "OK";
    // Sending a POST request to the OpenAI endpoint
    const response = await axios.post(url, data, { headers });

    // Debugging message with emoji
    // console.log("🤖 GPT response received:", response.data);

    // Extracting the response from OpenAI
    const choices = response.data.choices;


    // Returning the response
    if (choices && choices.length > 0) {
        var result = choices[0].message.content.trim()
        console.log("🤖 GPT response received:", result);
        return result;
    }

    // Debugging message with emoji
    console.log("❌ Error: Unable to get response from GPT engine.");

    return '';
}

async function chatgptConversation(ctx,chat_id,message_id,message, dialog,onConnected, onText, onTyping) {

    /*
    var beginMessage = [
        { "role": "system", "content": "You are VedaVany, a large language model trained by 360SoftDevelopment. Answer as concisely as possible.\nKnowledge cutoff: 2023-03\nCurrent date: 2023-03-04\n\nInstructions: Please act as Śrīla Bhakti Rakshak Sridhar Dev-Goswami Mahārāja  Bhakti Rakshak Sridhar Dev-Goswami Maharaj" }
    ];*/

    var beginMessage = [];

    var endMessage = [
        { "role": "user", "content": message }
    ];

    if (typeof dialog === 'undefined') dialog = [];

    var messages = beginMessage.concat(dialog, endMessage);
    return await chatgptConversationMessagesFetch2(ctx,chat_id,message_id,messages,onConnected, onText, onTyping);
    //return await chatgptConversationMessages(messages);
}



// Exporting the function
module.exports = {
    chatgptConversation,
    chatgptConversationMessages
};