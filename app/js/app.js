'use strict';
var doubanBook;

doubanBook = angular.module('doubanBook', ['ngRoute', 'doubanBookCtrl', 'doubanBookServices', 'doubanBookAnimations']);

doubanBook.config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/books', {
      templateUrl: 'partials/book-list.html',
      controller: 'bookListCtrl'
    }).when('/books/:bookId', {
      templateUrl: 'partials/book-detail.html',
      controller: 'bookDetailCtrl'
    }).otherwise({
      redirectTo: '/books'
    });
  }
]);

//# sourceMappingURL=maps/app.js.map