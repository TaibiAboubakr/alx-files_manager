const express = require('express');
const router = require('./routes/index');

const port = parseInt(process.env.PORT, 10) || 5000;

const app = express();
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
