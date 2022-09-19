import http from 'http';
import express from 'express';

let app = express();

app.get('/hello', (req,res,next)=>{
    res.send('Not Hlleo');
});
app.get('/', (req,res,next)=>{
    res.send('Hello World');
});



let server = http.createServer(app);

server.listen(3000);