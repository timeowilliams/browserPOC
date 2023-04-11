import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(cors());


app.get('/', (req,res) => {
  const ipAddress = req.socket.remoteAddress;
  res.send('IP Address: ',ipAddress);
})

app.get('/api/posts', async (req, res) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.get('/long-polling', async (req, res) => {
  console.log('Request Incoming :', req.baseUrl);
  try {
    const requestInfo = {
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    res.status(200).json(requestInfo);
    console.log('Sending request info');
  } catch (error) {
    console.log('Unexpected Error', error);
    res.status(500).send('Unexpected Error');
  }
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
