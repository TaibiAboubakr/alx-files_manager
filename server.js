import router from './routes/index';

const express = require('express');

const port = parseInt(process.env.PORT, 10) || 5000;

const app = express();
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
