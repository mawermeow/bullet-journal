import {MongoClient} from 'mongodb';

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.nddaf.mongodb.net/${process.env.mongodb_database}`;

export const connectToDatabase=async ()=>{
    return await MongoClient.connect(connectionString);
}