'use strict';
var doubanBookCtrl;

doubanBookCtrl = angular.module('doubanBookCtrl', []);

doubanBookCtrl.controller('bookListCtrl', [
  '$scope', 'Book', function($scope, Book) {
    $scope.books = Book.query();
    return $scope.orderProp = 'id';
  }
]);

doubanBookCtrl.controller('bookDetailCtrl', [
  '$scope', '$routeParams', 'Book', function($scope, $routeParams, Book) {
    $scope.book = Book.get({
      bookId: $routeParams.bookId
    }, function(book) {
      return $scope.mainImageUrl = book.img[1];
    });
    return $scope.setImage = function(imageUrl) {
      return $scope.mainImageUrl = imageUrl;
    };
  }
]);

//# sourceMappingURL=maps/controllers.js.map