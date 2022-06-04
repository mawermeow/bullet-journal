import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../lib/db';

export const  handler = async (req, res)=> {
    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: '請登入後繼續' });
        return;
    }

    const userEmail = session.user.email;


    const client = await connectToDatabase();

    const usersCollection = client.db().collection('users');

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
        res.status(404).json({ message: '找不到使用者' });
        client.close();
        return;
    }
    if (req.method === 'PATCH') {
        const newLog = [req.body,...user.journal];

        const result = await usersCollection.updateOne(
            { email: userEmail },
            { $set: { journal:newLog } }
        );

        client.close();
        res.status(200).json({ message: '成功新增任務！',log: newLog});
    }
    if (req.method === 'GET'){
        const data = user.journal;
        res.status(200).json({message:'成功取得資料',data});
    }


}

export default handler;