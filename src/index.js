import app from './app.js';
import { sequelize } from './database/database.js';
import 'dotenv/config';

async function main() {
    console.clear();
    await sequelize.sync({force: false})
    const PORT = process.env.PORT;
    app.listen(PORT);
    console.log('server',PORT)
}

main();