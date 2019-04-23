var app = angular.module('angularjsNodejsTutorial', []);
app.controller('loginController', function ($scope, $http) {
  console.log("HERE in login");
  $scope.verifyLogin = function () {
    console.log('clicked')
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);
    // console.log($scope);
    var request = $http({
      url: '/login',
      method: "POST",
      data: {
        'username': $scope.username,
        'password': $scope.password
      }
    })

    request.success(function (response) {
      console.log(response);
      if (response.status === "OK") {
        window.location.href = "http://localhost:8081/dashboard"
      }
    });
    request.error(function (err) {
      // failed
      console.log("error: ", err);
    });
  };
});

app.controller('registerController', function($scope, $http) {
  console.log('HERE in registercontroller')
  $scope.registerUser = function() {
    var request = $http({
      url: '/register',
      method: 'POST',
      data: {
        'username': $scope.username,
        'name': $scope.name,
        'password': $scope.password
      }
    })
    request.success(function (response) {
      console.log(response);
      if (response.status === "OK") {
        window.location.href = "http://localhost:8081/dashboard"
      }
    });
    request.error(function (err) {
      // failed
      console.log("error: ", err);
    });
  }
})

app.controller('getPostsController', function($scope, $http) {
  console.log('here in posts controlller')
  $scope.getPosts = function () {
    console.log("get posts")
    var request = $http({
      url: '/getPosts',
      method: 'GET'
    })

    request.success(function (response) {
      console.log(response)
      $scope.posts = response;
    });
    request.error(function (err) {
      console.log('error: ' + err);
    })
  }
})

app.controller('addPostController', function($scope, $http) {
  console.log('HERE in addpostcontroller')
  $scope.addPost = function() {
    var request = $http({
      url: '/addPost',
      method: 'POST',
      data: {
        'text': $scope.post
      }
    })
    request.success(function (response) {
      console.log(response);
      if (response.status === "OK") {
        window.location.href = "http://localhost:8081/dashboard"
      }
    });
    request.error(function (err) {
      // failed
      console.log("error: ", err);
    });
  }
})

app.controller('getCommentsController', function($scope, $http) {
  console.log('here in comments controller')
  $scope.getComments = function () {
    console.log("get comments")
    var request = $http({
      url: '/getComments',
      method: 'GET'
    })

    request.success(function (response) {
      console.log(response)
      $scope.comments = response;
    });
    request.error(function (err) {
      console.log('error: ' + err);
    })
  }
})

app.controller('addCommentController', function($scope, $http) {
  console.log('HERE in addCommentController')
  $scope.addComment = function() {
    console.log($scope.postID)
    var request = $http({
      url: '/addComment',
      method: 'POST',
      data: {
        'text': $scope.comment,
        'id': $scope.postID
      }
    })
    request.success(function (response) {
      console.log(response);
      if (response.status === "OK") {
        window.location.href = "http://localhost:8081/dashboard"
      }
    });
    request.error(function (err) {
      // failed
      console.log("error: ", err);
    });
  }
  $scope.assignID = function(postID) {
    $scope.postID = postID;
    console.log(postID);
  }
})

// app.controller('getUserController', function ($scope, $http) {
//   // Angular function
//   console.log("HERE in controller");
//   $scope.getUsers = function () {
//     var request = $http({
//       url: '/dashboardUsers',
//       method: 'GET'
//     })

//     request.success(function (response) {
//       // success
//       $scope.users = response.rows;
//     });
//     request.error(function (err) {
//       // failed
//       console.log("error: ", err);
//     });
//   };
// });

// app.controller('getGenresController', function ($scope, $http) {
//   $scope.getGenres = function () {
//     var request = $http({
//       url: '/genres',
//       method: 'GET'
//     })

//     request.success(function (response) {
//       $scope.genres = response.rows;
//     });
//     request.error(function (err) {
//       console.log('error: ' + err);
//     });
//   }
// })

// app.controller('getGenreTopMoviesController', function ($scope, $http) {
//   console.log('HERE IN GENRES TOP CONTROLLER')
//   $scope.getMoviesUnderGenre = function (curr_genre) {
//     var request = $http({
//       url: '/genreTop10',
//       method: 'POST',
//       data: {
//         'currentGenre': curr_genre
//       }
//     })

//     request.success(function (response) {
//       $scope.top10Movies = response.rows;
//     });
//     request.error(function (err) {
//       console.log('error: ' + err);
//     })
//   }
// })

// app.controller('getRecommendationsController', function ($scope, $http) {

//   $scope.submitChoice = function (curr_movie_id) {
//     console.log(curr_movie_id)
//     console.log('clicked')
//     var request = $http({
//       url: '/recommendationsurl',
//       method: "POST",
//       data: {
//         'current_choice': curr_movie_id
//       }
//     })

//     request.success(function (response) {
//       // success
//       console.log(response.rows);
//       $scope.resultMovies = response.rows;
//       if (response.result === "success") {
//         // After you've written the INSERT query in routes/index.js, uncomment the following line
//       }
//     });
//     request.error(function (err) {
//       // failed
//       console.log("error: ", err);
//     });
//   };
// });

// app.controller('yearOptionsController', function ($scope, $http) {
//   console.log("inside yearoptionscontroller")
//   $scope.options = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
//   $scope.chooseYear = function (curr_year) {
//     var request = $http({
//       url: '/yearsandyears',
//       method: "POST",
//       data: {
//         'current_year': curr_year
//       }
//     })
//     request.success(function (response) {
//       // success
//       $scope.movies = response.rows;
//       console.log(response.rows);
//     });
//     request.error(function (err) {
//       // failed
//       console.log("error: ", err);
//     });
//   }
// })

// app.controller('postersController', function($scope, $http) {
//   console.log("inside posters controller");
//   $scope.getPosters = function() {
//     var request = $http({
//       url: "/randomIMDBIds",
//       //url: "http://img.omdbapi.com/?i=tt3896198&apikey=d0656bab",
//       //url: 'http://www.omdbapi.com/?t=' + 'tt3896198' + '&apikey=d0656bab', //add +'&apikey=YOUR_API_KEY'',
//       method: "GET"
//     })
//     request.success(function(response) {
//       console.log(response);
//       $scope.data = response.newRows;
//     });
//     request.error(function(err) {
//       console.log('error: ' + err);
//     });
//   }
// })

// app.controller('postersController', function ($scope, $http) {
//   console.log("inside posters controller");
//   $scope.link = {}
//   $scope.getPosters = function () {
//     console.log('getting posters')
//     var request = $http({
//       url: "/randomIMDBIds",
//       method: "GET"
//     })
//     request.success(function (response) {
//       console.log(response);
//       $scope.data = response.newRows;
//     });
//     request.error(function (err) {
//       console.log('error: ' + err);
//     });
//   }
//   $scope.getLinkFor = function (curr_id) {
//     console.log(curr_id);
//     var request = $http({
//       url: 'http://www.omdbapi.com/?i=' + curr_id + '&apikey=d0656bab',
//       method: "GET"
//     })
//     request.success(function (response) {
//       $scope.link[curr_id] = response['Website'];
//     });
//     request.error(function (err) {
//       console.log('error: ' + err);
//     });
//   }
// })



// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {

  };
});
*/
