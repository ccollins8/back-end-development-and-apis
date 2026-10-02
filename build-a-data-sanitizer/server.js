const express = require('express');
const app = express();
const PORT = 3000;

const { inputCleaner, inputValidator } = require('./middleware');

// Parse URL-encoded bodies and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 1. GET / redirects to /form (place BEFORE static files so static index.html doesn't intercept it)
app.get('/', (req, res) => {
  res.redirect('/form');
});

// 2. Serve static HTML form from the public directory
app.use(express.static('public'));

// 3. GET /form serves the HTML file
app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 4. POST /submit applies route-level middleware and sends sanitized data
app.post('/submit', inputCleaner, inputValidator, (req, res) => {
  res.send({
    username: req.body.username,
    comment: req.body.comment
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});