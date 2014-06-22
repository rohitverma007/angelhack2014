angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('HomeCtrl', function($scope) {
})

.controller('SelectionCtrl', function($scope) {
})


.controller('NavigationCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('ListingsCtrl', function($scope){
	Parse.initialize("QChbWiKjeo1B17tFPlmZ6Xax7NcNRqY5BNM4urHa", "NXEGGmO3LlJTf64SYAa7QJ7gLytL5I5vAbxr5tur");
	var ListItem= Parse.Object.extend("BookPost");
	var query= new Parse.Query(BookPost);
	query.find({
		success: function(listItem){
			console.dir(listItem);
		},
		error: function(listItem, error){
			console.log("error" + error);
		}
	});
})


