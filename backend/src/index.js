import './database/database.js';

import app from "./app.js";
import dotenv from 'dotenv';

dotenv.config();

const main = () => {
    app.listen(app.get('port'))
    console.log(`server on port ${app.get('port')}`)
}

main();
