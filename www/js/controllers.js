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
});



