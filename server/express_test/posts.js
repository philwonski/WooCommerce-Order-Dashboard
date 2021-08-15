'use strict'

const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());


/* Take the POSTed body and write it the tiddler folder. NOTE this has no security!! */

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).send(req.body.order + ' logged');
    let order_name = '../tw/tiddlers' + req.body.order + '.json';
    let myorder = JSON.stringify(req.body);
    fs.writeFileSync(order_name, myorder);
});

/*Implement basic secuirty by checking for a unique key in the heaher. You can add as a header with 
your request from Pipedream/wherever. This should work but I didn't test it.*/

// app.post('/', (req, res) => {
//   if (req.headers['mykey'] == 'my-special-key-XyZ') {
//     console.log(req.body);
//     res.status(201).send(req.body.order + ' logged');
//     let order_name = '../tw/tiddlers' + req.body.order + '.json';
//     let myorder = JSON.stringify(req.body);
//     fs.writeFileSync(order_name, myorder);
//   } else
//         throw new HTTPError(400, 'No special key present in request headers');
// });


/*placeholder for another endpoint*/

// app.get('/', (req, res) => {
//     res.send('test');
// });

app.listen(3004, () => {
 console.log('Server is running on 3004');
});
