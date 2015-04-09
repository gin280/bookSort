'use strict';
var doubanBookServices;

doubanBookServices = angular.module('doubanBookServices', ['ngResource']);

doubanBookServices.factory('Book', [
  '$resource', function($resource) {
    return $resource('books/:bookId.json', {}, {
      query: {
        method: 'GET',
        params: {
          bookId: 'books'
        },
        isArray: true
      }
    });
  }
]);

//# sourceMappingURL=maps/services.js.map