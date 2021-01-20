import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import express from 'express';
let cors = require('cors')
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';
const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.json());

app.use('/users',usersRoutes);

app.get('/',(req,res) => res.sendfile('index.html'));

app.listen(PORT, () => console.log(`server running on port: http://localhost:${PORT}`));