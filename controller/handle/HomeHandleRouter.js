const fs = require('fs');
const homestayService = require('../../service/homestayService')
const qs = require('qs');
class HomeHandleRouter {
    static getHomeHtml(homeHtml, room) {
        console.log(typeof room)

        let tbody = ''
        room.map((room, index) => {
            tbody += ` <tr>
                       <td>${index + 1}</td>
      
                       <td>${room.name}</td>
                       <td>${room.city}</td>
                       <td>${room.numberR}</td>
                       <td>${room.price}</td>
                       <td>${room.WCnumber}</td>
                       <td>${room.description}</td>
                       <td>
                       <a href="/edit/${room.id}"> <button style="background-color: green; color: white">Edit</button></a>  
                       </td>
                       <td>
                       <a href="/detete/${room.id}"> <button style="background-color: green; color: white">Delete</button></a>  
                       </td>
                       </tr>`

        })
        homeHtml = homeHtml.replace('{homestay}', tbody);
        return homeHtml;
        console.log(homeHtml)
    }

    showHome(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./view/home.html', 'utf8', async (err, homeHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let room = await homestayService.findAll();
                    console.log(room)
                    homeHtml = HomeHandleRouter.getHomeHtml(homeHtml, room);
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            })
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let search = qs.parse(data)
                    console.log(search.search)
                    fs.readFile('./view/home.html', 'utf-8', async (err, homeHtml) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let room = await homestayService.searchHomestay(search.search)
                            homeHtml = HomeHandleRouter.getHomeHtml(homeHtml, room);
                            res.writeHead(200, 'text/html');
                            res.write(homeHtml);
                            res.end();
                        }
                    })
                }
            })
        }
    }


    createHomestay(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./view/create.html', 'utf8', async (err, createHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(createHtml);
                    res.end();
                }
            })

        } else {
            let data = ''
            req.on('data', chunk => {
                data += chunk;

            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)
                } else {
                    const room = qs.parse(data);
                    console.log(room)
                    const mess = await homestayService.save(room);
                    console.log(mess);
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            })
        }
    }

    editHomestay(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./view/edit.html', 'utf8', async (err, editHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    let room = await homestayService.finById(id);
                    editHtml = editHtml.replace('{name}', room[0].name)
                    editHtml = editHtml.replace('{city}', room[0].city)
                    editHtml = editHtml.replace('{roomNumber}', room[0].numberR)
                    editHtml = editHtml.replace('{price}', room[0].price)
                    editHtml = editHtml.replace('{bathroom}', room[0].WCnumber)
                    editHtml = editHtml.replace('{description}', room[0].description);
                    editHtml = editHtml.replace('{id}', room[0].id
                    );
                    res.writeHead(200, 'text/html');

                    res.write(editHtml);
                    res.end();
                }
            })

        } else {
            let data = ''
            req.on('data', chunk => {
                data += chunk;

            })
            req.on('end', async err => {
                if (err) {
                    console.log(err.message)
                } else {
                    const room = qs.parse(data);
                    console.log(room)
                    const mess = await homestayService.saveEdit(room, id);
                    console.log(mess);
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            })
        }

    }
    remove(){
        console.log(1)

    }
}


module.exports = new HomeHandleRouter()