const express = require('express')

const app = express()

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    let client = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log('Client connected at: ' + client)

    let options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }

    res.sendFile(__dirname + '/public/index.html', options, function(err) {
        if (err) {

        } else {

        }
    })
})

PORT = 8090
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '.')
})