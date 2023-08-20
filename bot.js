import fs from 'fs';
import { NseIndia } from 'stock-nse-india';
import TelegramBot from 'node-telegram-bot-api';

const nseIndia = new NseIndia();
const token = "6330218077:AAHdotEqxrfnMiqXIPvcVj64-ITzIYmhR2M"; // Replace with your actual bot token

const botInstanceFlagPath = './bot-instance-flag.json';
let bot;

// Read the flag from the file
let botInstanceFlag;
try {
    const fileContent = fs.readFileSync(botInstanceFlagPath, 'utf8');
    botInstanceFlag = JSON.parse(fileContent);
} catch (error) {
    botInstanceFlag = { botCreated: false };
}

if (!botInstanceFlag.botCreated) {
    bot = new TelegramBot(token);

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Bot has started polling for updates.");
    });

    bot.on("polling_error", (error) => {
        console.error("Polling error:", error);
    });

    bot.on("message", (msg) => {
        // You can handle incoming messages here
        console.log("Received message:", msg);
    });

    bot.startPolling();

    console.log("Bot polling started.");

    // Update the flag in the file
    botInstanceFlag.botCreated = true;
    fs.writeFileSync(botInstanceFlagPath, JSON.stringify(botInstanceFlag, null, 2), 'utf8');
} else {
    console.log("Bot instance already exists.");
}
