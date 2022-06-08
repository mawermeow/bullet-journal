import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';
import localDate from "../../../lib/local-date";

async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }

    const data = req.body;

    const { email, password } = data;

    if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 7
    ) {
        res.status(422).json({
            message:
                '輸入錯誤，密碼長度請大於七位數',
        });
        return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email: email });

    if (existingUser) {
        res.status(422).json({ message: '這個信箱註冊過囉' });
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne({
        email: email,
        password: hashedPassword,
        journal:[{
            title:'點右上角的＃符號，進入標籤頁面看看。在特定標籤頁中新增的筆記，都會默認加上一樣的標籤哦！',
            type:'task',
            id:'meow01',
            date:localDate,
            tag:'說明',
        },{
            title:'藍色表示未完成任務，點看看左邊的驚嘆號圖示改為完成！',
            type:'task',
            id:'meow02',
            date:localDate,
            tag:'說明',
        },{
            title:'第一次使用子彈筆記。點這幾個字來編輯看看內容吧！',
            type:'event',
            id:'meow03',
            date:localDate,
            tag:'說明',
        },{
            title:'你可以在標籤寫上「生日、目標、開心的事、想買的東西」等等，目前一則筆記只能使用一個標籤。',
            type:'notes',
            id:'meow04',
            date:'2021/11/06',
            tag:'說明',
        },{
            title:'沒有指定日期的筆記會被歸類為「很久以後」。也試試看上面幾個藍色按鈕吧！(了解後請幫我把這五則筆記都刪掉！)',
            type:'notes',
            id:'meow05',
            date:'',
            tag:'說明',
        }]
    });

    res.status(201).json({ message: '帳號註冊完成！' });
    client.close();
}

export default handler;