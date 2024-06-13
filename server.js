const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const port = 8080;

app.use(cors({
    origin: '*'
}));

app.get('*', async (req, res) => {
    target = req.originalUrl.substring(1);

    axios.get(target).then((response) => {
        if(response.data.includes('crediblebh')){
            let parsedString = response.data.replace('<string xmlns="https://www.crediblebh.com/">', '').replace('</string>', '');
            parsedString = parsedString.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
            parsedString = parsedString.replaceAll('<Table>', '').replaceAll('</Table>', '');
            parsedString = parsedString.replaceAll('\\"', '"');
            parsedString = parsedString.replaceAll('\n', '').replaceAll('\r', '');

            res.send(parsedString); 
        }else{
            res.send(response.data);
        }               
    }).catch((error) => {
        res.json(error);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});