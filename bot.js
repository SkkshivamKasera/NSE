import { NseIndia } from 'stock-nse-india';
import TelegramBot from 'node-telegram-bot-api';

const nseIndia = new NseIndia();
const token = process.env.BOT_TOKEN;

let bot;

if (!bot instanceof TelegramBot) {
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
} else {
    console.log("Bot instance already exists.");
}
