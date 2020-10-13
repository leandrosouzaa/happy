import express, { response } from 'express';
import path from 'path';
import 'express-async-errors';

import './database/connection';
import routes from './routes';
import errorHandle from './errors/handler'

const app = express();

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname,'..', 'uploads')));
app.use(errorHandle);

app.listen(3333, () => {
   console.log("👷 Api running on port 33333");
});