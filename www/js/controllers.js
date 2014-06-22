angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $rootScope) {
        Parse.initialize("QChbWiKjeo1B17tFPlmZ6Xax7NcNRqY5BNM4urHa", "NXEGGmO3LlJTf64SYAa7QJ7gLytL5I5vAbxr5tur");

        var currentLat;
        var currentLong;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                currentLat = position.coords.latitude;
                currentLong = position.coords.longitude;


                var map = L.map('map', {
                    center: [currentLat, currentLong],
                    zoom: 14
                });

                var latLngObject;


                L.tileLayer('https://{s}.tiles.mapbox.com/v3/rohit-map.ideelj8n/{z}/{x}/{y}.png', {
                    maxZoom: 18
                }).addTo(map);

                var BookPosts = Parse.Object.extend($rootScope.category);
                var bookPost = new Parse.Query(BookPosts);
                bookPost.find({
                    success:function(posts){
                        console.log(posts);
                        for(var i = 0; i < posts.length; i++){
                            post = posts[i];

                            if(post.attributes.location){
                                $http({method: 'GET', url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+post.attributes.location+'&sensor=false'}).success(function(response){


                                    var infoWindowContent ='hi map point';


                                    latLngObject = response.results[0].geometry.location;

                                    console.log(response);
                                    console.log("fuk yea", latLngObject);
                                    if(latLngObject){
                                        currentLat = latLngObject.lat;
                                        currentLong = latLngObject.lng;
                                    }
                                    L.marker([currentLat, currentLong]).addTo(map)
                                        .bindPopup(infoWindowContent).update();
                                }).error(function(data){
                                    console.log("error", data);
                                });


                            }

                        }
                    }
                })










            });
        }
    })

.controller('HomeCtrl', function($scope, $location, $rootScope) {
        $rootScope.user = {};
        Parse.initialize("QChbWiKjeo1B17tFPlmZ6Xax7NcNRqY5BNM4urHa", "NXEGGmO3LlJTf64SYAa7QJ7gLytL5I5vAbxr5tur");
        window.fbAsyncInit = function() {
            FB.init({
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
        var currentUser = Parse.User.current();
        $scope.signIn = function(){
            console.log("hi");
//            if(!currentUser) {
                FB.Event.subscribe('auth.login', function () {

                    $location.path('/tab/selection');
                    $scope.$apply();
                });
//                Parse.FacebookUtils.logOut();


            FB.login(function(response) {
                if (response.authResponse) {
                    $location.path('/tab/selection');
                    $scope.$apply();



                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            },{redirect_uri: "http://angelhack2014.pagekite.me/angelhack2014/www/#/tab/selection", display : 'touch'});
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
//                $location.path("/tab/selection");
//            }
        }
})

    .controller('SelectionCtrl', function($scope, $rootScope, $location) {
        $scope.user = {};
        console.log("ehie");
        Parse.initialize("QChbWiKjeo1B17tFPlmZ6Xax7NcNRqY5BNM4urHa", "NXEGGmO3LlJTf64SYAa7QJ7gLytL5I5vAbxr5tur");
        FB.api('/me', function (response) {
            $scope.user.name = response.first_name;

            $scope.$apply();

        });

        $scope.setCategory = function(category){
            console.log(category);
            $rootScope.category = category;
            $location.path("/tab/dash");
        }

    })



.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})
.controller('AccountCtrl', function($scope) {
});
