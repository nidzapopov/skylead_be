import MongoDbConnection from './MongoDbConnection';

class DatabaseConnection {
    private database: string;
    
    constructor() {
        const { DATABASE } = process.env;
        this.database = DATABASE;
        this.choseConnection();
    }

    private choseConnection(): void 
    {
        switch (this.database) {
            case 'mongodb':
                new MongoDbConnection();
                break;
            default:
                break;
        }
    }
}

export default DatabaseConnection;