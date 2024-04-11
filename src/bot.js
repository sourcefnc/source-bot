const { Telegraf } = require('telegraf');

// Khởi tạo một instance Telegraf với token của bot
const bot = new Telegraf('6588415970:AAGAG4nR63a6hPgGyBRO80RJKf8xKxWH-34');

// Lắng nghe sự kiện "start" từ người dùng
bot.start((ctx) => {
    const username = ctx.from.username;
    console.log(ctx.from);
    ctx.reply(`Xin chào ${username}! Chúc một ngày tốt lành!`);
});

// Lắng nghe sự kiện "help" từ người dùng
bot.help((ctx) => ctx.reply('Bạn cần trợ giúp? Hãy nói với tôi.'));

// Lắng nghe mọi tin nhắn từ người dùng
bot.on('text', (ctx) => ctx.reply('Xin lỗi, tôi không hiểu bạn đang nói gì.'));

// Khởi động bot
bot.launch();
