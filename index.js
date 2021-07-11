const request = require('request-promise');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const WEBHOOK = 'https://hooks.slack.com/services/';
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.post('/slack', (req, res) => {
    console.log('Request received at API level');

    const body = req.body;
    body['mkdwn'] = true;
    const response = request({
        method: 'POST',
        body: body,
        url: WEBHOOK + process.env.ACCESS_KEY,
        json: true
    })

    console.log("Sent message to slack");
    res.send("Sent message to slack");
});

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
})


// (async function () {
//     try {
//         // GET data
//         // const data = await getData();
//         // console.log('DATA ',data)

//         //POST to slack
//         const body = {
//             mkdwn: true,
//             text: 'This is really great slack message',
//             attachments: data.map(person => ({
//                 color: 'good',
//                 text: `This email address - *${person.email}* belongs to *${person.name}*`
//             }))
//         }
//         console.log('BODY ', body)
//         const res = await request({
//             method: 'POST',
//             body: body,
//             url: WEBHOOK,
//             json: true
//         })
//         console.log('Response ', res)
//     } catch (e) {
//         console.log('Error ', e);
//     }
// })();