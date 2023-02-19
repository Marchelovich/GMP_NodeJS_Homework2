import express from 'express';
import bodyParser from 'body-parser';
import api from './api/api';
import httpDebugMiddleware from './api/middlewares/httpDebugMiddleware';
import expressErrorHandler from './api/middlewares/expressErrorHandler';

const app = express();
const PORT = 80;

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(httpDebugMiddleware);
api(app);
app.use(expressErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
