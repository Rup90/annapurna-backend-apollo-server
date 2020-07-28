import mongoose from 'mongoose';

export default class Db {
    private mongoDb: string = 'mongodb+srv://RadminUser:Bv281GYZjcjSgmJU@cluster0-gtu2d.mongodb.net/First_Application?retryWrites=true&w=majority';

    static async setupDb(db: Db): Promise<any> {
        return await mongoose.connect(db.mongoDb, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    }
}