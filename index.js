import express from "express"
import userRoutes from "./src/routes/userRoutes";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

// bodyParser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

userRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})