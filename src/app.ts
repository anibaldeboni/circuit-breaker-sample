import express, { Request, Response } from 'express';

const app = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => {
  if (Math.random() > 0.5) {
    res.status(200).send('Success!');
  } else {
    res.status(400).send('Failed!');
  }
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
