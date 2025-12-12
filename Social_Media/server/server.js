import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { inngest, functions } from "./inggest/index.js"
import {serve} from 'inngest/express'

const app = express();

await connectDB();
app.use(express.json());
app.use(cors())

app.get('/', (reg, res) => res.send('Server is running'))
app.use("/api/inggest", serve({ client: inngest, functions }) );

const PORT = process.env.PORT || 4000 ;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))


