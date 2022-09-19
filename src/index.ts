import http, { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

function RequestListener(req: IncomingMessage, res: ServerResponse)
{
    let incomingData: any[]=[];
    let name='HELLO WORLD!';
    if(req.url==='/')
    {
        res.statusCode=200;
        res.write("<h1>Hello!</h1>");
        res.write("<p> Welcome to my site, what is your name?</p>");
        res.write('<form action="/welcome" method="POST">')
        res.write('<label>Name:</label>');
        res.write('<input type="text" id="txtName" name="txtName" />');
        res.write('<input type="submit" id="btnSubmit" name="btnSubmit"/>');
        res.write("</form>")
        res.end();
    }
    else if(req.url==="/welcome")
    {
        if(req.method==='POST')
        {
            res.statusCode=200;
            
        

            req.on('data', (chunk)=>{ // Event
                console.log(chunk);
                incomingData.push(chunk);
            });

            req.on('end', ()=>{
                name =Buffer.concat(<Uint8Array[]>incomingData).toString();
                
                setTimeout(()=>{
                    res.write(`<h1>Welcome: ${name.split('&')[0].split('=')[1]}  </h1>`);
                    res.end();
                },4000);
            });
        }
        else
        {
            res.write('How did you get here?');
            res.statusCode=503;
            res.end();
        }
    }

    else
    {
        let myFile = path.join(process.cwd(),'dist','html',req.url?.replace('/','') as string);
        if(fs.existsSync(`${myFile}`))
        {
            let myFileContent = fs.readFileSync(myFile);

            res.write(myFileContent)
            res.statusCode=200;
        }
        else{
            res.write('File not Found');
            res.statusCode=404;
        }
        
            res.end();
        /*res.write(`<h1> Hello, the URL you Typed:  ${req.url} was not found .`)
        res.statusCode=404;
        res.end();*/
    }
}

let server = http.createServer(RequestListener);
server.listen(3000);