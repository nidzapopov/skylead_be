import * as mongoose from 'mongoose';

class MongoDbConnection {
    private MONGO_USER: string;
    private MONGO_PASSWORD: string;
    private MONGO_PATH: string;
    private MONGO: string;

    constructor() {
        const { 
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
            MONGO
        } = process.env;

        this.MONGO_USER = MONGO_USER;
        this.MONGO_PASSWORD = MONGO_PASSWORD;
        this.MONGO_PATH = MONGO_PATH;
        this.MONGO = MONGO;
        this.connect();
    }

    private connect(): void
    {
        this.setMongoose();
        (this.MONGO === 'local')
            ? mongoose.connect(this.MONGO_PATH)
            : mongoose.connect(`mongodb+srv://${this.MONGO_USER}:${this.MONGO_PASSWORD}${this.MONGO_PATH}`);
        mongoose.connection.on('error', () => this.connectionError());
        mongoose.connection.once('open', () => this.connectionSuccess());
    }

    private setMongoose(): void
    {
        mongoose.set('strictQuery', true);
    }

    private connectionError(): void
    {
        console.log('error')
    }

    private connectionSuccess(): void
    {
        console.log('success')
    }
}

export default MongoDbConnection;