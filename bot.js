import { NseIndia } from 'stock-nse-india';
import TelegramBot from 'node-telegram-bot-api';
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const nseIndia = new NseIndia();
const token = "6330218077:AAHdotEqxrfnMiqXIPvcVj64-ITzIYmhR2M";

let bot;
const app = express()

app.get('/start', (req, res) => {
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
    bot.startPolling()
    res.send("Bot polling started.");
})

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'index.html'); // Get the full path to the HTML file
    res.sendFile(filePath); // Send the HTML file as the response
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});