import {getSession} from 'next-auth/client';
import {connectToDatabase} from '../../../lib/db';

export const handler = async (req, res) => {
    const session = await getSession({req: req});

    if (!session) {
        res.status(401).json({message: '請登入後繼續'});
        return;
    }

    const userEmail = session.user.email;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection('users');

    const user = await usersCollection.findOne({email: userEmail});

    if (!user) {
        res.status(404).json({message: '找不到使用者'});
        client.close();
        return;
    }

    if (req.method === 'PATCH') {
        const newLogs = req.body;

        const result = await usersCollection.updateOne(
            {email: userEmail},
            {$set: {journal: newLogs}}
        );

        client.close();
        res.status(200).json({message: '成功修改任務！', log: newLogs});
        return;
    }

    const items = user.journal;
    res.status(200).json({message: '成功取得資料', items});

}

export default handler;