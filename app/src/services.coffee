'use strict'

doubanBookServices =angular.module('doubanBookServices',['ngResource'])

doubanBookServices.factory 'Book',[
	'$resource'
	($resource) ->
		$resource 'books/:bookId.json',{},query:
			method:'GET'
			params: bookId:'books'
			isArray:true
]