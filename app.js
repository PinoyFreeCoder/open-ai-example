import express from "express";
import bodyParser from "body-parser";
import {config} from 'dotenv'
import {Configuration, OpenAIApi} from "openai"
import {fileURLToPath} from "url"
import path, { dirname } from "path";

config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.API_KEY
    })
)


app.get("/", ({req, res}) => {
    res.sendFile(path.join(__dirname, "/index.html"))
})

app.post('/submit', async (req, res) => {
    const userInput = req.body.userInput;


    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages : [{role : 'user', content : userInput}]
        })

        res.send(response.data.choices[0].message.content)
    } catch (error) {
        console.error(error);
        res.status(500).send('And error occurred.');
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})