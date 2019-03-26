
/*EXAMPLE DATABASE FUNCTION
app.get('/[insert route here]', function(req, res) {
    con.query([insert query here], function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result))
      });
});
*/

const express = require('express')
const app = express();
var cors = require('cors')
const path = require('path');
var http = require('http');
var mysql = require('mysql');
var bodyParser = require('body-parser')

app.use(express.static(__dirname));

var con = mysql.createConnection({
    host: "70.32.28.7",
    user: "promethean",
    password: "!!Cis440",
    database: 'prometheandb'
  });
  

// parse application/json
app.use(bodyParser.json())

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
//     next();
//   })
//http.createServer(app).listen(process.env.PORT);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/home.html'));
});

app.get('/app/test-pull', function(req, res) {
    con.query("SELECT * FROM user", function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result))
      });
});

app.get('/api/updaterent', function (req, res) {
    let q = req.query;
    let queryString = `UPDATE item SET renter_id = NULL, available = 1 WHERE item_id = ${q.itemid}`;
    console.log(queryString);
    con.query(queryString, function (err, result, fields) {
        if (err) throw err;
        res.send({ 'success': 'true' })
    });
});

app.post('/api/clear', function(req, res) {

    con.query(`DELETE FROM user`, function (err, result, fields) {
        if (err) throw err;
        res.send({'success': 'true'})
      });
});

app.post('/api/deleteitem', function (req, res) {
    let q = req.query
    let queryString = `DELETE FROM item WHERE item_id = ${q.id}`;
    console.log(queryString);
    con.query(queryString, function (err, result, fields) {
        if (err) throw err;
        res.send({ 'success': 'true' })
    });
});

app.get('/api/testitempush', function (req, res) {

    console.log(req.query)
    let q = req.query
    let queryString = `INSERT INTO item (item_name, item_category, item_zipcode, item_description, owner_id, available, day_price) VALUES ("${q.itemName}", "${q.itemCat}", ${q.itemZip}, "${q.itemDesc}", ${q.id}, 1, ${q.price})`
    console.log(queryString)
    con.query(queryString, function (err, result, fields) {
        if (err) throw err;
        res.send({ 'success': 'true' })
    });
});

app.get('/api/create-user', function(req, res) {

    console.log(req.query)
    let q = req.query
    let queryString = `INSERT INTO USER (username, password, firstname, lastname, email, zipcode, active, admin) VALUES ('${q.username}', '${q.password}', '${q.fName}', '${q.lName}', '${q.email}', ${q.zip}, 1, 0)`
    console.log(queryString)
    con.query(queryString, function (err, result, fields) {
        if (err) throw err;
        res.send({'success': 'true'})
      });
});

app.get('/api/get-items', function(req, res) {

    con.query('select * from posts', function (err, result, fields) {
        if (err) throw err;
        res.send(result)
      });
});


app.get('/api/checkout-item', function (req, res) {

    console.log(req.query)
    let q = req.query
    console.log(q)
    let queryString = `UPDATE ITEM SET available = 0, renter_id = '${q.renter_id}' WHERE item_id = '${q.item_id}'`
    console.log(queryString)
    con.query(queryString, function (err, result, fields) {

        if (err) throw err;
        res.send(result)
    });
});


app.get('/app/addAnItem', function(req, res) {
    con.query('select item_name, item_category, item_zipcode, item_description from item', function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result))

    });
});


app.get('/api/getuserinfo', function (req, res) {

   
    let queryString = `SELECT * FROM USER`
    console.log(queryString)
    con.query(queryString, function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
});

app.get('/api/upvote', function (req, res) {

   
    let queryString1 = `UPDATE posts set voteCount = ${Number(req.query.itemCount) + 1} where postID = ${req.query.postId};`; 
    let queryString2 = `INSERT into votecheck (u_id, p_id, up_or_down) VALUES (${req.query.userId}, ${req.query.postId}, 'up');`
    console.log(queryString1)
    con.query(queryString1, function (err, result, fields) {
        if (err) throw err;
        con.query(queryString2, function (err, result, fields) {
            if (err) throw err;
            res.send({count: Number(req.query.itemCount) + 1})
        });
    });
});


app.get('/api/upvote-reset', function (req, res) {

   
    let queryString1 = `UPDATE posts set voteCount = ${Number(req.query.itemCount) - 1} where postID = ${req.query.postId};`; 
    let queryString2 = `DELETE FROM votecheck where u_id = ${req.query.userId} and p_id = ${req.query.postId} and up_or_down = 'up';`
    console.log(queryString1)
    con.query(queryString1, function (err, result, fields) {
        if (err) throw err;
        con.query(queryString2, function (err, result, fields) {
            if (err) throw err;
            res.send({count: Number(req.query.itemCount) - 1})
        });
    });
});

app.get('/api/downvote', function (req, res) {

   
    let queryString1 = `UPDATE posts set downVoteCount = ${Number(req.query.itemCount) + 1} where postID = ${req.query.postId};`; 
    let queryString2 = `INSERT into votecheck (u_id, p_id, up_or_down) VALUES (${req.query.userId}, ${req.query.postId}, 'down');`
    console.log(queryString1)
    con.query(queryString1, function (err, result, fields) {
        if (err) throw err;
        con.query(queryString2, function (err, result, fields) {
            if (err) throw err;
            res.send({count: Number(req.query.itemCount) + 1})
        });
    });
});


app.get('/api/downvote-reset', function (req, res) {

   
    let queryString1 = `UPDATE posts set downVoteCount = ${Number(req.query.itemCount) - 1} where postID = ${req.query.postId};`; 
    let queryString2 = `DELETE FROM votecheck where u_id = ${req.query.userId} and p_id = ${req.query.postId} and up_or_down = 'down';`
    console.log(queryString1)
    con.query(queryString1, function (err, result, fields) {
        if (err) throw err;
        con.query(queryString2, function (err, result, fields) {
            if (err) throw err;
            res.send({count: Number(req.query.itemCount) - 1})
        });
    });
});

app.get('/api/verify-user', function(req, res) {

    console.log(req.query)
    let q = req.query
    console.log(q)
    let queryString = `SELECT * FROM EMPLOYEES WHERE username = '${q.username}' and password = '${q.password}'`
    console.log(queryString)
    con.query(queryString, function (err, result, fields) {

        if (err) throw err;
        console.log(result)
        res.send(result)
      });
});

app.get('/api/get-votes', function(req, res) {

    let q = req.query
    console.log(q)
    let queryString = `SELECT * FROM votecheck WHERE u_id = ${q.userId};`
    console.log(queryString)
    con.query(queryString, function (err, result, fields) {

        if (err) throw err;
        console.log(result)
        res.send(result)
      });
});




// app.post('/app/test-pull', function(req, res) {
//     res.send('hello!');
    // con.query("SELECT * FROM user", function (err, result, fields) {
    //     if (err) throw err;
    //     res.send(JSON.stringify(result))
    //   });
//});


// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });



// app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });


// http.createServer(function (request, response) {
//     response.writeHead(200, {
//         'Content-Type': 'text/plain',
//         'Access-Control-Allow-Origin' : '*',
//         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
//     });
// });



// app.get('/app/data-test ', function(req, res) {
//     res.sendFile(path.join(__dirname + '/app/data-test.html'));
// });




app.listen('8000', () => {
    console.log('Example app listening on port 8000!')
  });
  