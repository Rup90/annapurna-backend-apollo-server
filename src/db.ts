import mongoose from 'mongoose';

const config = require('./config');

 

export default class Db {    

    static async setupDb(db: Db): Promise<any> {  

        console.log(config.DB);      

        return await mongoose.connect(config.DB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

    }

}