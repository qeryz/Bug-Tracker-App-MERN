import express, { application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);


const CONNECTION_URL = process.env.CONNECTION_URL;
// const CONNECTION_URL = 'mongodb+srv://qeryz:Chata123@cluster0.hrf5d.mongodb.net/newDatabase?retryWrites=true&w=majority';
// const PORT = process.env.PORT || 5000;
const PORT = 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

    mongoose.connect(CONNECTION_URL).then(()=>{console.log('...')})
