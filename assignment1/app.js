(function(){
  'use strict';
  angular.module("Assignment1App",[])
  .controller("Assignment1Controller", function($scope){
    $scope.itemList = "";
    $scope.checkResult = "";

    $scope.checkItemList = function(){
      if($scope.itemList == "" || $scope.itemList == null){
        $scope.checkResult = "Please enter data first";
      }
      else
      {
        var items = $scope.itemList.toString().split(',');
        var emptyItems = items.filter(function(item){
          return item.toString().match(/^ *$/);
        });
        if(emptyItems.length > 0)
          $scope.checkResult = "List contains empty items [, ,]. please do not enter empty items in the list!";
        else if(items.length <= 3) {
          $scope.checkResult = "Enjoy!";
        }
        else {
          $scope.checkResult = "Too much!";
        }
      }
    };
  });
})();
