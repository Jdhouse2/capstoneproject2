
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
var nodemailer = require('nodemailer');
const uuidv4 = require('uuid/v4');

app.use(express.static(__dirname));

var con = mysql.createConnection({
    host: "70.32.28.7",
    user: "promethean",
    password: "!!Cis440",
    database: 'prometheandb'
  });

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'prometheansolutions440@gmail.com',
      pass: 'cis440email!'
    }
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

//app.get('/api/updaterent', function (req, res) {
//    let q = req.query;
//    let queryString = `UPDATE item SET renter_id = NULL, available = 1 WHERE item_id = ${q.itemid}`;
//    console.log(queryString);
//    con.query(queryString, function (err, result, fields) {
//        if (err) throw err;
//        res.send({ 'success': 'true' })
//    });
//});

app.post('/api/clear', function(req, res) {

    con.query(`DELETE FROM user`, function (err, result, fields) {
        if (err) throw err;
        res.send({'success': 'true'})
      });
});

//app.post('/api/deleteitem', function (req, res) {
//    let q = req.query
//    let queryString = `DELETE FROM item WHERE item_id = ${q.id}`;
//    console.log(queryString);
//    con.query(queryString, function (err, result, fields) {
//        if (err) throw err; 
//        res.send({ 'success': 'true' })
//    });
//});

app.get('/api/testpostpush', function (req, res) {

    console.log(req.query)
    let q = req.query
    let queryString = `INSERT INTO posts (originalPosterID, postcategory, voteCount, postContent, downVoteCount) VALUES ("${q.originalPosterID}", "${q.postCat}", 0, "${q.postContent}", 0)`
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

app.get('/api/password-reset', function(req, res) {

    console.log(req.query)
    let q = req.query
    let queryString = `SELECT * FROM employees where email = '${q.inputValue}' or username = '${q.inputValue}';`
    console.log(queryString)
    con.query(queryString, function (err, result, fields) {
        if (err) throw err;
        let id = uuidv4()
        let idQuery = `INSERT INTO passwordreset (user, resetCode) VALUES ('${q.inputValue}', '${id}')`
        con.query(idQuery, function (err, result2, fields) {
            console.log(result2)
            var mailOptions = {
                from: 'prometheansolutions440@gmail.com',
                to: result[0].email,
                subject: 'Password Reset',
                html: `<h1>Hi!</h1> <p>You asked for a password reset. Please visit <a href="localhost:8000/app/code-reset.html?code=${id}">localhost:8000/app/code-reset.html?code=${id}</a> to reset your password.</p>`
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                    console.log('email sent!')
                }
              });
              
            res.send({'success': 'true'})
        });
        
      });
});

// Adds upvote points to employee database
app.get('/api/add-points', function (req, res) {
    console.log(req.query)
    let q = req.query
    let queryString = `UPDATE employees SET totalVotes = totalVotes + ${q.points} WHERE employeeID = ${q.id}`
    console.log(queryString)
    con.query(queryString, function (err, result, fields) {
        if (err) throw err;
        res.send({ 'success': 'true' })
    });
})

app.get('/api/get-items', function(req, res) {

    con.query('select * from posts', function (err, result, fields) {
        if (err) throw err;
        let r = result;
        res.send(result)
      });
});

// app.post('/api/mod-remove', function(req, res) {

//     con.query(`DELETE FROM posts `, function (err, result, fields) {
//         if (err) throw err;
//         res.send({'success': 'true'})
//       });
// });

app.get('/api/mod-remove', function(req, res) {
    let queryObj = req.query
    let queryString = `DELETE FROM posts WHERE postID = ('${queryObj.ID}');`
    con.query(queryString, function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result))

    });
});

//app.get('/api/checkout-item', function (req, res) {

//    console.log(req.query)
//    let q = req.query
//    console.log(q)
//    let queryString = `UPDATE ITEM SET available = 0, renter_id = '${q.renter_id}' WHERE item_id = '${q.item_id}'`
//    console.log(queryString)
//    con.query(queryString, function (err, result, fields) {

//        if (err) throw err;
//        res.send(result)
//    });
//});


app.get('/app/addAPost', function(req, res) {
    con.query('select postCategory, postContent from posts', function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result))

    });
});

app.get('/api/postComment', function(req, res) {
    let queryObj = req.query
    let queryString = `INSERT INTO posts (originalPosterID, postCategory, voteCount, postContent, downVoteCount, childOf) values (${queryObj.user}, '', 0, '${queryObj.post}', 0, ${queryObj.attachTo});`
    con.query(queryString, function (err, result, fields) {
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
    // Adds points to employee's vote count
    // addEmployeePoints(1, req.query.userId)
    con.query(queryString1, function (err, result, fields) {
        if (err) throw err;
        con.query(queryString2, function (err, result, fields) {
            console.log('in query 2')
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


app.get('/api/change-password', function(req, res) {

    console.log(req.query)
    let q = req.query
    console.log(q)
    let queryString = `SELECT * FROM passwordreset WHERE resetCode = '${q.dbCode}';`
    console.log(queryString)
    con.query(queryString, function (err, result, fields) {

        let passwordUpdate = `UPDATE employees SET password = ${q.password} where username = '${result[0].user}' or email = '${result[0].user}';`
        con.query(passwordUpdate, function (err, result2, fields) {

            let loginQuery =  `SELECT * FROM EMPLOYEES WHERE (username = '${result[0].user}' or email = '${result[0].user}' ) and password = '${q.password}'`

            con.query(loginQuery, function (err, result3, fields) {
                if (err) throw err;
                console.log(result3)
                res.send(result3)
            });

        });
        
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


app.get('/api/get-posts', function(req, res) {
    console.log("Get posts is running")
    con.query('select * from posts', function (err, result, fields) {
        if (err) throw err;
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
  