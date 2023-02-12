const connection = require('../model/connection');
connection.connection()

class homestayService {

    findAll() {
        return new Promise((resolve, reject) => {
            let sql = `select *
                       from room`;

            let connect = connection.getConnection();
            connect.query(sql, (err, homestay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homestay);
                }
            })
        })
    }

    save(room) {
        let connect = connection.getConnection();

        return new Promise((resolve, reject) => {
            connect.query(`insert into homestay.room (name, city, numberR, price,WCnumber,description)
                           values ( '${room.name}', '${room.city}', ${room.numberR}, ${room.price},${room.WCnumber},'${room.description}')`, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('Tạo Thành công !')
                }
            })
        })
    };


    saveEdit(room, id) {
        let connect = connection.getConnection();
        console.log(connect)
        return new Promise((resolve, reject) => {
            connect.query(`update room
                           set name  = '${room.name}',
                               city = '${room.city}',
                               numberR =${room.numberR} ,
                               price       = ${room.price} ,
                              WCnumber =${room.WCnumber} ,
                               description = '${room.description}'
                           where id = ${id}`, (err, room) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('đã sửa!')
                    resolve(room)
                }
            })
        })
    };

    finById(id) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`SELECT *
                           FROM room
                           WHERE id = ${id}`, (err, room) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(room)
                }
            })
        })
    };
    delete(id) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(` DELETE FROM homestay.room 
                           WHERE id = ${id}`, (err, room) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(room)
                }
            })
        })
    }

    searchHomestay(search) {
        let connect = connection.getConnection();
        let sql = `select *  from  room   WHERE name like '%${search}%'`
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, room) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(room);
                }
            })
        })
    }


}

module.exports = new homestayService();