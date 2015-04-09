'use strict';

doubanBook =angular.module('doubanBook',['ngRoute','doubanBookCtrl','doubanBookServices','doubanBookAnimations'])

doubanBook.config [
  '$routeProvider'
  ($routeProvider) ->
    $routeProvider.when('/books',
      templateUrl: 'partials/book-list.html'
      controller: 'bookListCtrl').when('/books/:bookId',
      templateUrl: 'partials/book-detail.html'
      controller: 'bookDetailCtrl').otherwise redirectTo: '/books'

]
