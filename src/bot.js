const { Telegraf, Markup } = require('telegraf');

// Khởi tạo một instance Telegraf với token của bot
const bot = new Telegraf('6588415970:AAGAG4nR63a6hPgGyBRO80RJKf8xKxWH-34');

// Lắng nghe sự kiện "start" từ người dùng
const targetGroupUsername = 'mtcl_x'; // Thay 'my_channel' bằng tên ngắn của group bạn muốn kiểm tra
const joinedBoard = {
    text: "Đã tham gia",
    callback_data: 'join_social'
}
const listTask = [
    { text: 'Channel', url: 'https://t.me/mtcl_x' },
    { text: 'Group', url: 'https://t.me/mtcl_chat' },
    { text: 'Youtube', url: 'https://www.youtube.com/@duongrtv' }
];
const inlineKeyboard = listTask.map(item => [{ text: item.text, url: item.url }]);
bot.start(async (ctx) => {
    const userId = ctx.from.id;
    try {
        // Kiểm tra trạng thái thành viên của người dùng trong nhóm
        const member = await ctx.telegram.getChatMember('@' + targetGroupUsername, userId);
        
        // Nếu người dùng là thành viên của nhóm
        if (member && (member.status === 'member' || member.status === 'administrator')) {
            const joined = { text: 'Tiếp tục', callback_data: 'register' };
            ctx.reply('Nhấn vào nút tiếp tục bên dưới để bắt đầu sử dụng dịch vụ !', {
                reply_markup: { inline_keyboard: [[joined]] }
            });
        } else {
            ctx.reply('Hoàn thành tham gia nhóm, kênh và đăng ký kênh Youtube để tiếp tục',{
                reply_markup: { inline_keyboard: inlineKeyboard }
            });
            ctx.reply('Sau khi đã tham gia, vui lòng nhấn vào nút "Đã tham gia"', {
                reply_markup: {
                    inline_keyboard: [[joinedBoard]]
                }
            })
            
        }
    } catch (error) {
        // Xử lý lỗi nếu nhóm không tồn tại hoặc không thể truy cập
        console.error('Lỗi khi kiểm tra thành viên:', error);
        ctx.reply('Không thể kiểm tra thành viên trong nhóm ' + targetGroupUsername);
    }
    
});

// Xử lý sự kiện khi người dùng nhấn vào nút inline
bot.action('join_social',async (ctx) => {
    const userId = ctx.from.id;
    try {
        // Kiểm tra trạng thái thành viên của người dùng trong nhóm
        const member = await ctx.telegram.getChatMember('@' + targetGroupUsername, userId);
        
        // Nếu người dùng là thành viên của nhóm
        if (member && (member.status === 'member' || member.status === 'administrator')) {
            const joined = {
                text: 'Tiếp tục',
                callback_data: 'register'
            };
            ctx.reply('Nhấn vào nút tiếp tục bên dưới để bắt đầu sử dụng dịch vụ !', {
                reply_markup: {
                    inline_keyboard: [[joined]]
                }
            });
        } else {
            ctx.reply('Hoàn thành tham gia nhóm, kênh và đăng ký kênh Youtube để tiếp tục',{
                reply_markup: {
                    inline_keyboard: inlineKeyboard
                }
            });
            ctx.reply('Sau khi đã tham gia, vui lòng nhấn vào nút "Đã tham gia"', {
                reply_markup: {
                    inline_keyboard: [[joinedBoard]]
                }
            })
            
        }
    } catch (error) {
        // Xử lý lỗi nếu nhóm không tồn tại hoặc không thể truy cập
        console.error('Lỗi khi kiểm tra thành viên:', error);
        ctx.reply('Không thể kiểm tra thành viên trong nhóm ' + targetGroupUsername);
    }
});

// Lắng nghe sự kiện "help" từ người dùng
bot.help((ctx) => ctx.reply('Bạn cần trợ giúp? Hãy nói với tôi.'));

// Lắng nghe mọi tin nhắn từ người dùng
bot.on('text', (ctx) => ctx.reply('Xin lỗi, tôi không hiểu bạn đang nói gì.'));

// Khởi động bot
bot.launch();
