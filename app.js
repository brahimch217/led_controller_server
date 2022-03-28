/**
 * Librarey import 
 */

const express = require('express');
const port = process.env.PORT || 8000
const app = express();


/**
 * Import Model
 */
const LedData = require('./model/led_model');


/**
 * MongoDb Setup
 */
 const mongoose = require('mongoose');
 mongoose.connect('mongodb+srv://admin:admin@cluster0.qhibw.mongodb.net/ledDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error : '));
 db.once('open', function () {
     console.log('connected')
 });


/** GET Led Status / 
 * To GET  the LED Status
 * and show it in the flutter dashboard
 * and use it in arduino code if LED = true turn on the LED 
 * if LED = false turn of the LED 
*/
 app.get('/api/led_status', async (req, res) => {
    const LedStatus = await LedData.find();
    res.send(LedStatus);
});


/** POST Led Status / 
 * For Post The led Status 
 * if LED is ON POST true 
 * is OFF POST false
*/
app.post('/api/led_status', async function (req, res) {
    await LedData.create(req.body);
    res.send(req.body)
});


/** PUT Led Status / 
 * it used to update the LED status 
 * is ON turn OFF 
 * also is OFF turn ON
*/

app.put('/api/led_status/:id', async (req, res, next) => {
    LedData.findByIdAndUpdate(
        { _id: req.params.id }, req.body
    ).then(function () {
        LedData.findOne({ _id: req.params.id }).then(function (LedStatus) {
            res.send(LedStatus);
        })
    })
});



app.listen(port , () => console.log('app is working !' ))