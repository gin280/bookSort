'use strict'

doubanBookCtrl = angular.module('doubanBookCtrl',[])

doubanBookCtrl.controller 'bookListCtrl', [
	'$scope'
	'Book'
	($scope,Book) ->
		$scope.books = Book.query()
		$scope.orderProp = 'id'
]

doubanBookCtrl.controller 'bookDetailCtrl', [
  	'$scope'
  	'$routeParams'
  	'Book'
  	($scope,$routeParams,Book) ->
    	$scope.book =Book.get({bookId: $routeParams.bookId}, (book) ->
    		$scope.mainImageUrl =book.img[1]
    		)
    		
    	$scope.setImage = (imageUrl) ->
    		$scope.mainImageUrl = imageUrl
]