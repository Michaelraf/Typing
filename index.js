const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('express').Router();
const server = http.createServer(app);
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:'*'
}))
app.use('/', express.static(process.cwd()))
app.use(router);
server.listen(process.env.PORT || 3000, ()=>{
    console.log(`App running on PORT ${process.env.PORT || 3000}`)
})