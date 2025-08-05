# SocialBot 🤖

A Telegram bot that helps you create engaging social media posts from your daily activities. Simply tell the bot what you did during the day, and it will generate platform-specific posts for LinkedIn, Instagram, and Twitter using AI.

## ✨ Features

- **Daily Activity Tracking**: Record your daily activities through simple text messages
- **AI-Powered Content Generation**: Uses Groq AI to create engaging social media posts
- **Multi-Platform Posts**: Generates posts tailored for LinkedIn, Instagram, and Twitter
- **User Management**: Tracks users and their activity history
- **Token Usage Monitoring**: Monitors AI API usage for cost tracking

## 🚀 How It Works

1. **Start the bot** with `/start` to get registered
2. **Share your activities** by simply typing what you did during the day
3. **Generate posts** using the `/generate` command
4. **Get platform-specific content** ready to copy and paste to your social media accounts

## 🛠️ Tech Stack

- **Backend**: Node.js with ES modules
- **Bot Framework**: Telegraf.js
- **Database**: MongoDB with Mongoose ODM
- **AI Service**: Groq API (Llama3-8b-8192 model)
- **Environment**: dotenv for configuration management

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Telegram Bot Token (from [@BotFather](https://t.me/botfather))
- Groq API Key (from [Groq Console](https://console.groq.com/))

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd socialbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   BOT_TOKEN=your_telegram_bot_token
   MONGO_URI=your_mongodb_connection_string
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📱 Usage

### For Users

1. **Start the bot**: Send `/start` to begin
2. **Add activities**: Type your daily activities as regular messages
   ```
   Had a great meeting with the team
   Finished the new feature implementation
   Attended a tech conference
   ```
3. **Generate posts**: Use `/generate` to create social media content
4. **Copy and share**: Use the generated posts on your social media platforms

### For Developers

- **Development mode**: `npm run dev` (uses nodemon for auto-restart)
- **Production**: `node server.js`

## 🗄️ Database Schema

### User Model
- `tgId`: Telegram user ID
- `firstName`, `lastName`: User's name
- `username`: Telegram username
- `isBot`: Bot status flag
- `promptTokens`, `completionTokens`: AI usage tracking

### Event Model
- `text`: Activity description
- `tgId`: Associated user's Telegram ID
- `createdAt`, `updatedAt`: Timestamps

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BOT_TOKEN` | Telegram bot token from @BotFather | ✅ |
| `MONGO_URI` | MongoDB connection string | ✅ |
| `GROQ_API_KEY` | Groq API key for AI generation | ✅ |

## 🤖 Bot Commands

- `/start` - Initialize the bot and register user
- `/generate` - Create social media posts from today's activities

## 📝 API Integration

The bot integrates with:
- **Telegram Bot API** (via Telegraf.js)
- **Groq AI API** for content generation
- **MongoDB** for data persistence

## 🚨 Error Handling

- Database connection failures
- API rate limiting
- Invalid user inputs
- Network timeouts

## 🔒 Security

- Environment variables for sensitive data
- Input validation and sanitization
- Error logging without exposing sensitive information

## 📈 Future Enhancements

- [ ] Add support for more social media platforms
- [ ] Implement post scheduling
- [ ] Add analytics dashboard
- [ ] Support for media attachments
- [ ] Custom post templates
- [ ] User preferences and settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the logs for error messages
2. Verify your environment variables are set correctly
3. Ensure your MongoDB instance is running
4. Check your Groq API key validity

---

**Happy posting! 🎉**
