angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('HomeCtrl', function($scope, $location) {
        Parse.initialize("QChbWiKjeo1B17tFPlmZ6Xax7NcNRqY5BNM4urHa", "NXEGGmO3LlJTf64SYAa7QJ7gLytL5I5vAbxr5tur");
        window.fbAsyncInit = function() {
            Parse.FacebookUtils.init({
                appId      : '252602678277336', // Facebook App ID
                cookie     : true, // enable cookies to allow Parse to access the session
                xfbml      : true  // parse XFBML
            });
            // Additional initialization code here
        };
console.log("ee");
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
            if(!currentUser) {
                Parse.FacebookUtils.logIn("email", {
                    success: function (user) {
                        $location.path("/tab/navigation");
                        $scope.$apply();
                    },
                    error: function (user, error) {
                        alert("User cancelled the Facebook login or did not fully authorize.");
                    }
                });
            }
            else {
                $location.path("/tab/navigation");
            }
        }
})

    .controller('NavigationCtrl', function($scope) {
        $scope.user = {};
        Parse.initialize("QChbWiKjeo1B17tFPlmZ6Xax7NcNRqY5BNM4urHa", "NXEGGmO3LlJTf64SYAa7QJ7gLytL5I5vAbxr5tur");
        FB.api('/me', function (response) {
            $scope.user.name = response.first_name;
            $scope.$apply();
        });
    })



.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
