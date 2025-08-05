import { Telegraf } from "telegraf";
import userModel from "./src/models/User.js";
import eventModel from "./src/models/Event.js";
import connectDB from "./src/config/db.js";
import { message } from "telegraf/filters";
import dotenv from "dotenv";
import Groq from 'groq-sdk';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const client = new Groq({
    apiKey: process.env['GROQ_API_KEY'],
});

try {
    connectDB();
    console.log("Connected to the database");
} catch (err) {
    console.log(err);
    process.kill(process.pid, "SIGTERM");
}

bot.start(async (ctx) => {
    const from = ctx.update.message.from;

    try {
        await userModel.findOneAndUpdate({ tgId: from.id }, {
            $setOnInsert: {
                firstName: from.first_name,
                lastName: from.last_name,
                isBot: from.is_bot,
                username: from.username
            }
        }, { upsert: true, new: true });
        
        await ctx.reply(`Hey ${from.first_name}, welcome! I will help you create highly engaging social media posts. Just type what you did today, and then use /generate.`);

    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong, please try again later");
    }
});

// --- THIS IS THE CORRECTED COMMAND ---
bot.command('generate', async (ctx) => {

    const {message_id : waitingMessage} = await ctx.reply(
        `Hey ${ctx.update.message.from.first_name}, I'm generating your posts...`
    )

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const events = await eventModel.find({
        tgId: ctx.update.message.from.id,
        createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
        },
    });

    if (events.length === 0) {
        await ctx.deleteMessage(waitingMessage);
        await ctx.reply("No events found for today. Just type what you did, and I'll note it down!");
        return;
    }

    // 1. Format the events into a simple list string
    const eventsText = events.map(event => `- ${event.text}`).join('\n');

    // 2. Construct a clear prompt for the AI
    const prompt = `
      Based on the following events from my day, please craft three engaging social media posts: one for LinkedIn, one for Instagram, and one for Twitter.
      
      Instructions:
      - Write like a human, using simple language and short sentences.
      - Do not mention the time of the events.
      - Make each post creative and tailored to the platform's style.

      Today's Events:
      ${eventsText}
    `;

    try {
        // 3. Use the new prompt in the API call
        const chatCompletion = await client.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are an expert social media post generator.' },
                { role: 'user', content: prompt } // Use the dynamic prompt here
            ],
            model: 'llama3-8b-8192',
        });

        console.log("AI Response:", chatCompletion.choices[0].message.content);

        // Store token count
        await userModel.findOneAndUpdate({ tgId: ctx.update.message.from.id }, {
            $inc: {
                promptTokens: chatCompletion.usage.prompt_tokens,
                completionTokens: chatCompletion.usage.completion_tokens,
            },
        });
        await ctx.deleteMessage(waitingMessage);
        await ctx.reply(chatCompletion.choices[0].message.content);
       
    } catch (error) {
        console.log("Error calling Groq API:", error);
        await ctx.reply("Something went wrong while generating the post. Please try again later.");
    }
});
// --- END OF CORRECTED COMMAND ---


bot.on(message('text'), async (ctx) => {
    const from = ctx.update.message.from;
    const message = ctx.update.message.text;

    try {
        await eventModel.create({
            text: message,
            tgId: from.id
        });
        await ctx.reply("Noted! Keep adding events or use the command /generate when you're ready.");
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong, please try again later");
    }
});


bot.launch();
console.log("Bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));