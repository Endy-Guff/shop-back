import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import * as mongoose from "mongoose";
import bodyParser from "body-parser";
import errorMiddleware from "./middlewares/error-middleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const corsOptions = {
    credentials: true,
    origin: '*'
}
app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use(errorMiddleware)


app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)

    try {
        await mongoose.connect(process.env.DB_URL as string,).then(() => console.log('mongoDb connected')).catch((e) => console.log(e))

    } catch (e) {
        console.log(e)
    }
});