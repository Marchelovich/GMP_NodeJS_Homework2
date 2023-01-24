import express from 'express';
import bodyParser from 'body-parser';
import api from './api/api';

const app = express();
const PORT = 80;

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

api(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
