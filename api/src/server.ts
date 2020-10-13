import express, { response } from 'express';
import './database/connection';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes)



app.listen(3333, () => {
   console.log("👷 Api running on port 33333");
});