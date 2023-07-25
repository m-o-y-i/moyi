import express from 'express';
import cors from 'cors';
import { loginRouter, registerRouter } from './routes/v1';
import { articleRouter } from './routes/v2';

const app = express();


app.use(cors(), express.json());

//v1
app.use(loginRouter);
app.use(registerRouter);

//v2
app.use(articleRouter);

app.get('/', async (_req, res) => {
  res.send('hello this is working');
});

app.listen(3500, () => {
  console.log('listening on 3500');
});