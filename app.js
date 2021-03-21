const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();


app.get('/api', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else {
            res.json({
                message: 'hello there...',
                authData
            });
        }
    });
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else {
            res.json({
                message: 'posts created...',
                authData
            });
        }
    });
})

app.post('/api/login', (req, res) => {
    // mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }

    jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        })
    })
})

// FORMAT OF TOKEN
// Authorization: Bearer <token>

function verifyToken(req, res, next){
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined'){
        // split at the space
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        // call the next middleware
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(5000, () => console.log('Server started on 5000'));