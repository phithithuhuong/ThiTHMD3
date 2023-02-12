const fs= require('fs')
class NotFoundHandle {
    handleNotFound(req,res){
        fs.readFile('./view/err/notFound.html', 'utf8', (err, notFoundHtml) => {
            if (err) {
                console.log(err.message)
            } else {
                res.writeHead(200,'text/html');
                res.write(notFoundHtml);
                res.end();

            }
        })
    }
}
module.exports= new NotFoundHandle()