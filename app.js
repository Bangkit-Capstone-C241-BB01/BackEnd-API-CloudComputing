
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { router }  = require('./routes/routes');

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});