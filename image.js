import {config} from "dotenv"
config()

import {Configuration, OpenAIApi} from "openai"

const openai = new OpenAIApi(
    new Configuration({
        apiKey : process.env.API_KEY
    })
)


const response = await openai.createImage({
    prompt : "a astronaut eating ice cream in space",
    n: 1,
    size: "1024x1024"
})

const image_url = response.data.data[0].url;
console.log(image_url)