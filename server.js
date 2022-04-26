require('dotenv').config()

const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        username: "Kyle",
        title: "This is the first post"
    },
    {
        username: "Huawei",
        title: "This is the second post"
    },
];

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
})



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    // Bearer TOKEN 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })


}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});