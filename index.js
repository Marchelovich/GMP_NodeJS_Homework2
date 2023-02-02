import express from 'express';
import userRoutes from './src/routes/userRoutes';
import bodyParser from 'body-parser';

const app = express();
const PORT = 80;

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err) {
        console.log(err);
    }
    next();
});

userRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
