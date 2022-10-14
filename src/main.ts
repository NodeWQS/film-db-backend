import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { config } from 'dotenv';

config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/auth', require('./auth/auth.module'));

const port = process.env.PORT || 5000;
app.listen(port, ():void => {
    console.log(`server run in port ${port}`);
})
