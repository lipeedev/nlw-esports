import express from 'express';
import cors from 'cors';
import { ads, games } from './routes';

const PORT = process.env.PORT ?? 3333;
const app = express();

app.use(cors())
app.use(express.json());

app.use(ads);
app.use(games);

app.listen(PORT, () => console.log('[API] Running on port: ' + PORT));
