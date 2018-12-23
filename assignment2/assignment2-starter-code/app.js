(function(){
  'use strict';
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService)
  {
    var buyList = this;

    buyList.items = ShoppingListCheckOffService.getBuyItems();

    buyList.buyItem = function(index){
      ShoppingListCheckOffService.buyItem(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService)
  {
    var boughtList = this;

    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService(){
    var service = this;
    var buyItems = [
      { id: 0, name: "cookies", quantity: 10, bought: false},
      { id: 1, name: "cakes", quantity: 2, bought: false },
      { id: 2, name: "donuts", quantity: 20, bought: false },
      { id: 3, name: "candies", quantity: 1, bought: false },
      { id: 4, name: "ice creams", quantity: 4, bought: false }
    ];

    var boughtItems = [];

    service.getBuyItems = function() {
        return buyItems;
    };

    service.getBoughtItems = function() {
        return boughtItems;
    };

    service.buyItem = function(index){
      boughtItems.push(buyItems[index]);
      buyItems.splice(index,1);
    };
  }

})();
