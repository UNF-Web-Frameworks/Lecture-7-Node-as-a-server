import http, { IncomingMessage, ServerResponse } from 'http';
import express from 'express';
import fs, { fdatasync } from 'fs';
import path from 'path';


/* 
Node as a Server
*/
let server = http.createServer();
server.on('request',(req:IncomingMessage,res:ServerResponse)=>{
    let fileToReturn ="";

    if(req.url==="/")
    {
        fileToReturn="index.html";
    }
    else
    {
        fileToReturn = req.url!.replace('/','');
    }
    
    let compeltePath = path.join(process.cwd(),'dist','html',fileToReturn);
    
    /*fs.readFile(compeltePath,(data)=>{
        res.write(data);
        res.end();
    });*/
    let response = fs.readFileSync(compeltePath,'utf-8');
    res.write(response);
    res.end();
});
server.listen(3000);



/*************
    Using Express
*/
let app = express();
app.get('/Hello', (req,res,next)=>{
    res.write('Hello');
});
app.get('/GoodBye', (req,res,next)=>{
    res.send('Hello Good Bye!');
});

app.post('/Users',(req,res,next)=>{

});
let expressServer = http.createServer(app);
expressServer.listen(3001);