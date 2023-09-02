import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import express from 'express';// const express = require('express');
import { fileURLToPath } from 'url';
import path from 'path';
import json from 'json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 4000;

dotenv.config();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.use(express.json());
app.use(express.urlencoded());

const configuration = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAI(configuration);
// const response = await openai.listEngines();

function generatePrompt(input_description){
    let prompt=`You are a color palette-generating assistant that responds to text prompts for color palettes.
        
    You should generate color palettes that fit the theme, mood, or instructions in the prompt. 
    The palettes should be between 2 and 8 colors.
    
    Q: Convert the following verbal description of a color palette into a list of colors: Wood Wall
    A: ["#D7BA89", "#B68E65", "#986B41", "#56342A" ]
    
    Q: Convert the following verbal description of a color palette into a list of colors: Millennial color scheme
    A: ["#448F58", "#90C26E", "#FFE254", "#DE3657", "#FF9443", "#6A559B" ]
    
    desired format: a JSON array of hexadecimal color codes
    
    Q: Convert the following verbal description of a color palette into a list of colors: ${input_description}
    A: 
    `
    return prompt
}




app.get("/", (req, res) => {
    // (generateColorCodes("pink"));
    console.log("HELLO");
    res.send('/index.html');
});
app.post("/palette", (req,res)=>{
    let query = req.body.query
    // console.log("LINE65", query)
    if ((query.length)!=0){
        let prompt= generatePrompt(query);
        // console.log(prompt)
        openai
        .completions.create({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens:200
        })
        .then(response=>{
            // console.log(`PROMISE COMPLETE ${response.choices[0].text}`,`"colors": ${response.choices[0].text}`);
            const response_colors = JSON.parse(`{"colors": ${response.choices[0].text}}`)
            // console.log(response_colors)
            res.status(200).json(response_colors)
        }
        )
    }
    

        
    // const container = document.querySelector(".container");
    // createColorBoxes(colors, container)

});

// app.get("/json", (req, res) => {
// //    res.json({ message: "Hello world" });
//     console.log()
//    res.json(generateColorCodes("PINK"))
// });

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
