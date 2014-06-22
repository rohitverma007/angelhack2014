angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope, $http, $rootScope) {
        Parse.initialize("QChbWiKjeo1B17tFPlmZ6Xax7NcNRqY5BNM4urHa", "NXEGGmO3LlJTf64SYAa7QJ7gLytL5I5vAbxr5tur");

        var currentLat;
        var currentLong;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                currentLat = position.coords.latitude;
                currentLong = position.coords.longitude;
if($rootScope.geocode){
    currentLat = $rootScope.geocode.k;
    currentLong = $rootScope.geocode.A;
}
                var marker;
                var myLatlng = new google.maps.LatLng(currentLat,currentLong);
                var mapOptions = {
                    zoom: 12,
                    center: myLatlng
                };
                var map = new google.maps.Map(document.getElementById('map'), mapOptions);
//                var map = L.map('map', {
//                    center: [currentLat, currentLong],
//                    zoom: 14
//                });

                var latLngObject = {};


//                L.tileLayer('https://{s}.tiles.mapbox.com/v3/rohit-map.ideelj8n/{z}/{x}/{y}.png', {
//                    maxZoom: 18
//                }).addTo(map);

                var BookPosts = Parse.Object.extend($rootScope.category);
                var bookPost = new Parse.Query(BookPosts);

                bookPost.find({
                    success:function(posts){
                        console.log(posts);
                        for(var i = 0; i < posts.length; i++){
                            post = posts[i];

                            if(post.attributes.geocode){
                                console.log(post);
                                latLngObject.lat = post.attributes.geocode.k;
                                latLngObject.lng = post.attributes.geocode.A;
                                console.log(latLngObject);


                                    var infoWindowContent = post.attributes.location;




                                    marker = new google.maps.Marker({
                                        position: latLngObject,
                                        map: map,
                                        title: 'Hello World!'
                                    });
                                closure(marker, infoWindowContent, i);




                            }

                        }
                    }
                });

                function closure(marker, infoWindowContent) {
                    var infowindow = new google.maps.InfoWindow({
                        content: infoWindowContent
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(marker.get('map'), marker);
                    });
                }










            });
        }
    })

    .controller('HomeCtrl', function($scope, $location, $rootScope) {
        $rootScope.user = {};
        Parse.initialize("QChbWiKjeo1B17tFPlmZ6Xax7NcNRqY5BNM4urHa", "NXEGGmO3LlJTf64SYAa7QJ7gLytL5I5vAbxr5tur");
        window.fbAsyncInit = function() {
            Parse.FacebookUtils.init({
                appId      : '252602678277336', // Facebook App ID
                cookie     : true, // enable cookies to allow Parse to access the session
                xfbml      : true  // parse XFBML
            });
            // Additional initialization code here
        };
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        $scope.signIn = function(){
            console.log("hi");
//            if(!currentUser) {

//                Parse.FacebookUtils.logOut();

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                $location.path("/tab/selection");
                $scope.$apply();
                } else {

                    Parse.FacebookUtils.logIn(null, {
                        success: function(user){
                            console.log(user);
                            $location.path('/tab/selection');
                            $scope.$apply();
                        }
                    }, {redirectUrl: "http://angelhack2014.pagekite.me/angelhack2014/www/#/tab/selection"});

//                    FB.login(function (response) {
//                        if (response.authResponse) {
//
//
//
//                            $location.path('/tab/selection');
//                            $scope.$apply();
//
//
//                        } else {
//                            console.log('User cancelled login or did not fully authorize.');
//                        }
//                    }, {redirect_uri: "http://angelhack2014.pagekite.me/angelhack2014/www/#/tab/selection", display: 'touch'});
//                    FB.login.logIn(null, {
//                    success: function (user) {
////;                    window.location("http://angelhack2014.pagekite.me/angelhack2014/www/#/tab/selection");
//
//                    },
//                    error: function (user, error) {
//                        console.log(error);
//                    },
//                        redirect_uri: "http://example.com"
//                });
//            }
//            else {
//            }
                }

            });

        }
    })

    .controller('SelectionCtrl', function($scope, $rootScope, $location) {
        $scope.user = {};
        $rootScope.user = {};
        console.log("ehie");
        Parse.initialize("QChbWiKjeo1B17tFPlmZ6Xax7NcNRqY5BNM4urHa", "NXEGGmO3LlJTf64SYAa7QJ7gLytL5I5vAbxr5tur");

        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {

                FB.api('/me', function (response) {
                    console.log(response);
                    $scope.user.name = response.first_name;
                    $rootScope.user.fName = response.first_name;
                    $rootScope.user.lName = response.last_name;
                    $rootScope.user.email = response.email;
                    $scope.$apply();

                });
            } else {
                $scope.user.name = "Guest";
            }


    });

        var autocomplete = new google.maps.places.Autocomplete(
            /** @type {HTMLInputElement} */(document.getElementById('autoComplete')));
        // When the user selects an address from the dropdown,
        // populate the address fields in the form.
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            console.log(autocomplete.getPlace());
            $rootScope.geocode = autocomplete.getPlace().geometry.location;
            console.log($rootScope.geocode);




        });

        $scope.setCategory = function(category){
            console.log(category);
            $rootScope.category = category;
            $location.path("/tab/task");
        }

    })



    .controller('FriendsCtrl', function($scope, Friends) {
//  $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
//  $scope.friend = Friends.get($stateParams.friendId);
    })
    .controller('AccountCtrl', function($scope) {
    })

    .controller('FormCtrl', function($scope, $rootScope, $location){
        $rootScope.category = "BookPost";
        var user = Parse.User.current();
        var location;
        var geocode;
        var BookPost = Parse.Object.extend("BookPost");
        var bookPost = new BookPost();
        var autocomplete = new google.maps.places.Autocomplete(
            /** @type {HTMLInputElement} */(document.getElementById('autoComplete')));
        // When the user selects an address from the dropdown,
        // populate the address fields in the form.
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            console.log(autocomplete.getPlace());
            geocode = autocomplete.getPlace().geometry.location;
            location = autocomplete.getPlace().formatted_address;
            console.log(geocode);




        });

        $scope.submitPost = function(){
            bookPost.set({
                location: location,
                geocode: geocode,
                title: $scope.bookTitle,
                authorName: $scope.authorName,
                isbn: $scope.isbn,
                courseCode: $scope.courseCode,
                phoneNumber: $scope.phoneNumber,
                comments: $scope.comments,
                email: $rootScope.user.email
            });

            bookPost.set("parent", Parse.User.current());

            var postACL = new Parse.ACL(Parse.User.current());
            postACL.setPublicReadAccess(true);
            bookPost.setACL(postACL);

            bookPost.save(null, {
                success: function(gameScore) {
                    $location.path('/tab/dash'); //TODO - change to appropriate link
                    $scope.$apply();
                    // Execute any logic that should take place after the object is saved.
                    console.log('New object created with objectId: ' + gameScore.id);
                },
                error: function(gameScore, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and description.
                    console.log('Failed to create new object, with error code: ' + error.description);
                }
            });
        }





    })
    .controller('NavigationCtrl', function($scope) {

    })
    .controller('ListingsCtrl', function($scope){
//	Parse.initialize("QChbWiKjeo1B17tFPlmZ6Xax7NcNRqY5BNM4urHa", "NXEGGmO3LlJTf64SYAa7QJ7gLytL5I5vAbxr5tur");
//	var ListItem= Parse.Object.extend("BookPost");
//	var query= new Parse.Query(BookPost);
//	query.find({
//		success: function(listItem){
//			console.dir(listItem);
//		},
//		error: function(listItem, error){
//			console.log("error" + error);
//		}
//	});
    });


