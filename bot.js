import { NseIndia } from 'stock-nse-india';
import TelegramBot from 'node-telegram-bot-api';
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const nseIndia = new NseIndia();
const token = process.env.BOT_TOKEN;

function calculateStopLoss(entryPrice, currentPrice, riskPercentage) {
    const priceDifference = entryPrice - currentPrice;
    const stopLossAmount = (riskPercentage / 100) * entryPrice;
    if (entryPrice < currentPrice) {
        const stopLossLevel = entryPrice + priceDifference + stopLossAmount;
        return stopLossLevel;
    }
    else {
        const stopLossLevel = entryPrice - priceDifference - stopLossAmount;
        return stopLossLevel;
    }
}

function calculateStopLossDev(b, c, e) {
    const d = b * e;
    const stopLossLevel = c - d;
    return stopLossLevel
}

function calculateStopLossWithCapital(Entry_Price, Risk_Percentage, Total_Capital) {
    const Amount_at_Risk = (Risk_Percentage / 100) * Total_Capital
    const stopLossLevel = Entry_Price - Amount_at_Risk
    return stopLossLevel
}

function calculateStopLossPercentage(entryPrice, riskPercentage) {
    if(riskPercentage <= 100){
    const stopLossAmount = (riskPercentage / 100) * entryPrice;
    const stopLossLevel = entryPrice - stopLossAmount;
    return stopLossLevel;
    }else{
        return "Practicali Not Possible"
    }
}

function calculateStopLossSupportResistance(entryPrice, supportLevel) {
    const stopLossLevel = supportLevel - (entryPrice - supportLevel);
    return stopLossLevel;
}

function calculateStopLossMovingAverage(entryPrice, movingAverage) {
    const stopLossLevel = movingAverage - (entryPrice - movingAverage);
    return stopLossLevel;
}

function calculateStopLossPattern(entryPrice, patternLow) {
    const stopLossLevel = patternLow - (entryPrice - patternLow);
    return stopLossLevel;
}

function calculateTrailingStopLoss(entryPrice, currentPrice, trailingPercentage) {
    const priceDifference = entryPrice - currentPrice;
    const trailingAmount = (trailingPercentage / 100) * entryPrice;
    const stopLossLevel = entryPrice + priceDifference + trailingAmount;
    return stopLossLevel;
}

let bot;
const app = express()

app.get('/start', (req, res) => {
    bot = new TelegramBot(token);

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Bot has started polling for updates.");
    });

    bot.onText(/\/sl/, (msg) => {
        const chatId = msg.chat.id
        const values = msg.text.split(' ').slice(1);
        const value1 = parseFloat(values[0]);
        const value2 = parseFloat(values[1]);
        const value3 = parseFloat(values[2]);
        if(!isNaN(value1) && !isNaN(value2) && !isNaN(value3)){
            const result = calculateStopLoss(value1, value2, value3)
            bot.sendMessage(chatId, `${result}`)
        }else{
            bot.sendMessage(chatId, "Please Enter Valid Value")
        }
    })

    bot.onText(/\/df/, (msg) => {
        const chatId = msg.chat.id
        const values = msg.text.split(' ').slice(1);
        const value1 = parseFloat(values[0]);
        const value2 = parseFloat(values[1]);
        if(!isNaN(value1) && !isNaN(value2)){
            const result = calculateStopLossPercentage(value1, value2)
            bot.sendMessage(chatId, `${result}`)
        }else{
            bot.sendMessage(chatId, "Please Enter Valid Value")
        }
    })

    bot.onText(/\/cp/, (msg) => {
        const chatId = msg.chat.id
        const values = msg.text.split(' ').slice(1);
        const value1 = parseFloat(values[0]);
        const value2 = parseFloat(values[1]);
        const value3 = parseFloat(values[2]);
        if(!isNaN(value1) && !isNaN(value2) && !isNaN(value3)){
            const result = calculateStopLossWithCapital(value1, value2, value3)
            bot.sendMessage(chatId, `${result}`)
        }else{
            bot.sendMessage(chatId, "Please Enter Valid Value")
        }
    })

    bot.onText(/\/dev/, (msg) => {
        const chatId = msg.chat.id
        const values = msg.text.split(' ').slice(1);
        const value1 = parseFloat(values[0]);
        const value2 = parseFloat(values[1]);
        const value3 = parseFloat(values[2]);
        if(!isNaN(value1) && !isNaN(value2) && !isNaN(value3)){
            const result = calculateStopLossDev(value1, value2, value3)
            bot.sendMessage(chatId, `${result}`)
        }else{
            bot.sendMessage(chatId, "Please Enter Valid Value")
        }
    })

    bot.startPolling()
    const filePath = path.join(__dirname, 'bot.html');
    res.sendFile(filePath);
})

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});