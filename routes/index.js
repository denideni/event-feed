var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user.js')
var Post = require('../models/post.js')
var Comment = require('../models/comment.js')


// // Connect string to MySQL
// var mysql = require('mysql');



// connection.connect(function (err) {
//   if (err) {
//     console.log("Error Connection to DB" + err);
//     return;
//   }
//   console.log("Connection established...");
// });

// /* GET home page. */
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'welcome.html'));
});

router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});

router.get('/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'dashboard.html'));

});

router.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'register.html'));
});

router.get('/map', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'map.html'));
})

router.get('/event', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'event.html'));
})

// router.get('/reference', function (req, res) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
// });

// router.get('/recommendations', function (req, res) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'recommendations.html'));
// });

// router.get('/bestof', function (req, res) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'bestof.html'));
// });

// router.get('/posters', function (req, res) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'posters.html'));
// });

// // To add a new page, use the templete below
// /*
// router.get('/routeName', function(req, res) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'fileName.html'));
// });
// */


// Register uses POST request
router.post('/register', function (req, res) {
  console.log(req.body);
  if (req.body.username && req.body.password) {
    var { username, name, password } = req.body
    var query = new User({ username, name, password })
    query.save(function (err, result) {
      if (err) next(err)
      res.json({ status: 'OK' })
    })
  }
})

// // Login uses POST request
router.post('/login', function (req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  console.log(req.body);
  if (req.body.username && req.body.password) {
    var { username, password } = req.body
    // var query = new User({ username, name, password })
    User.find({ username, password }, function (err, results) {
      // if (!err) {
      //   res.json({results, status: 'OK'})
      // } else {
      //   next(err)
      // }
      if (!err && results != null) {
        req.session.user = username;
        res.json({results, status: 'OK'})
      } else {
        next(new Error('invalid credentials'))
      }
    })
  }
})

router.get('/getPosts', function (req, res, next) {
  console.log("in router")
  var postQuery = Post.find({}).sort('-createdAt').populate('comments').exec( function (err, results) {
      if (!err) {
          console.log(results)
          res.json(results)
      } else {
          next(err)
      }
  })
})

router.post('/addPost', function (req, res, next) {
  console.log("IN ADD POST IN ROUTER")
  console.log(req.body)
  var { text } = req.body                 // ES6 shorthand
  console.log(text);
  console.log(req.session);
  var author = req.session.user
  
  var q = new Post({ postText: text, author }) // ES6 shorthand
  q.save(function (err, result) {
      if (err) next(err)
      res.json({ status: 'OK' })
  })
})

router.post('/addComment', function (req, res, next) {
  console.log("IN ADD COMMENT IN ROUTER")
  console.log(req.body)
  var { text, id } = req.body                 // ES6 shorthand
  console.log(text);
  console.log(req.session);
  var author = req.session.user
  
  var q = new Comment({ commentText: text, author }) // ES6 shorthand
  q.save(function (err, result) {
      if (err) next(err)
      Post.findOne({'_id':id}, function(err2, post) {
        if (err2) {
          next(err2)
        } else {
          console.log(post);
          console.log(post.comments);
          post.comments.push(q._id);
          post.save();
          res.json({ status: 'OK' })
        }
      })
      
  })
})

router.get('/getComments', function (req, res, next) {
  console.log("in router")
  var commentQuery = Comment.find({}, function (err, results) {
      if (!err) {
          // console.log(results)
          res.json(results)
      } else {
          next(err)
      }
  })
})

// // Dashboard uses GET request for users
// router.get('/dashboardUsers', function (req, res) {
//   var query = "SELECT DISTINCT username FROM User;";
//   connection.query(query, function (err, rows, fields) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(rows);
//       console.log(query);
//       res.json({
//         result: 'success',
//         rows
//       });
//     }
//   });
// });

// // Dashboard uses GET request for movies
// router.get('/genres', function (req, res) {
//   var query = "SELECT DISTINCT genre FROM Genres;";
//   connection.query(query, function (err, rows, fields) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json({
//         result: 'success',
//         rows
//       })
//     }
//   })
// })

// // Dashboard uses GET request for movies
// router.post('/genreTop10', function (req, res) {
//   var query = "SELECT m.title, m.rating, m.vote_count from Movies m, Genres g WHERE m.id=g.movie_id AND g.genre='" + req.body.currentGenre + "'ORDER BY m.rating DESC, m.vote_count DESC LIMIT 10;";
//   connection.query(query, function (err, rows, fields) {
//     console.log(rows)
//     if (err) {
//       console.log(err);
//     } else {
//       res.json({
//         result: 'success',
//         rows
//       })
//     }
//   })
// })

// // Dashboard uses GET request for movies
// router.post('/recommendationsurl', function (req, res) {
//   var query = "SELECT DISTINCT m.title, g.genre FROM Movies m, Genres g WHERE g.movie_id=m.id AND g.genre IN (SELECT g.genre FROM Genres g, Movies m WHERE m.id=g.movie_id AND m.id=" + req.body.current_choice + ") AND m.id<> " + req.body.current_choice + " GROUP BY m.id LIMIT 10;"
//   connection.query(query, function (err, rows, fields) {
//     console.log(rows)
//     if (err) {
//       console.log(err);
//     } else {
//       res.json({
//         result: 'success',
//         rows
//       })
//     }
//   })
// })

// // Dashboard uses GET request for movies
// router.post('/yearsandyears', function (req, res) {

//   var query = "SELECT g.genre, m.title, MAX(m.vote_count) FROM Genres g, Movies m WHERE m.id=g.movie_id AND m.release_year=" + req.body.current_year + " GROUP BY g.genre DESC;";
//   console.log(query);
//   connection.query(query, function (err, rows, fields) {
//     console.log(rows)
//     if (err) {
//       console.log(err);
//     } else {
//       res.json({
//         result: 'success',
//         rows
//       })
//     }
//   })
// })

// // // Dashboard uses GET request for movies
// // router.get('/randomIMDBIds', function(req, res) {
// //   //  var query = 'SELECT m.title from Movies m, Genres g WHERE m.id=g.movie_id ORDER BY m.rating DESC LIMIT 10;';
// //   var query = "SELECT imdb_id, title FROM Movies ORDER BY rand() LIMIT 10;";
// //   connection.query(query, function(err, rows, fields) {
// //     if (err) {
// //       console.log(err);
// //     } else {
// //       console.log(rows);
// //       var newRows = rows.map(function(elem) {
// //         return {img: ('http://img.omdbapi.com/?apikey=d0656bab&i=' + elem.imdb_id), title: elem.title} 
// //       });
// //       res.json({
// //         result: 'success',
// //         newRows
// //       })
// //     }
// //   })
// // })

// // Dashboard uses GET request for movies
// router.get('/randomIMDBIds', function (req, res) {
//   var query = "SELECT imdb_id, title FROM Movies ORDER BY rand() LIMIT 10;";
//   connection.query(query, function (err, rows, fields) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(rows);
//       var newRows = rows.map(function (elem) {
//         return { img: ('http://img.omdbapi.com/?apikey=d0656bab&i=' + elem.imdb_id), title: elem.title, id: elem.imdb_id }// link: } 
//       });
//       console.log(newRows);
//       res.json({
//         result: 'success',
//         newRows
//       })
//     }
//   })
// })

// // template for GET requests
// /*
// router.get('/routeName/:customParameter', function(req, res) {

//   var myData = req.params.customParameter;    // if you have a custom parameter
//   var query = '';

//   // console.log(query);

//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       res.json(rows);
//     }
//   });
// });
// */

module.exports = router;
