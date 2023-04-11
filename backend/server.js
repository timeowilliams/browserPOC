const express = require('express');
const app = express();
const port = 3000;

// Set up a route for the long polling request
app.get('/long-polling', (req, res) => {
  // We'll simulate a long request processing time of 5 seconds
  setTimeout(() => {
    // Send back the necessary request information to the client
    res.json({
      method: 'POST',
      url: 'https://example.com/api/endpoint',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <your-access-token>'
      },
      body: {
        // request payload
      }
    });
  }, 5000);
});

app.listen(port, () => {
  console.log(`Long polling server listening at http://localhost:${port}`);
});
