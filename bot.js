const tmi = require('tmi.js');

// Define configuration options
const opts = {
    options: {
        debug: false
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "bot_yasa",
        password: "oauth:qumoy3rdio5n96fdz2zj1k9rm1078w"
    },
    channels: ["yasa_tv"]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();
client.on("connected", (address, port) => {
    client.action('yasa_tv','Hello, bot_yasa is ready to kick ass');
});

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();
    console.log(context.username);

    // If the command is known, let's execute it
    // Commands start with !
    if (commandName.startsWith("!")) {
        if (commandName === '!dice') {
            const num = rollDice();
            client.action(target, `You rolled a ${num}`);
            console.log(`* Executed ${commandName} command`);
        }
        if (commandName.toLowerCase() === '!hello') {
            client.say(target, 'Hello, '+context.username);
        }
        else {
            console.log(`* Unknown command ${commandName}`);
        }
    }
}

// Function called when the "dice" command is issued
function rollDice() {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}