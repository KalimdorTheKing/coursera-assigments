(function(){
  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .factory('MenuSearchFactory', MenuSearchFactory)
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective()
  {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        title: '@title',
        onRemove: '&',
        emptyResultMessage: '<'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;
  }

  NarrowItDownController.$inject = ['MenuSearchFactory'];
  function NarrowItDownController(MenuSearchFactory)
  {
    var ctrl = this;
    ctrl.searchTerm = "";
    ctrl.emptyResultMessage = "";
    // Use factory to create new shopping list service
    var searchService = MenuSearchFactory();

    ctrl.getMatchedMenuItems = function(){
      if(ctrl.searchTerm !== undefined && ctrl.searchTerm !== "")
      {
        ctrl.foundItems = searchService.getMatchedMenuItems(ctrl.searchTerm)
        .then(function (response) {
          ctrl.foundItems = response;
          if(response.length > 0)
          {
            ctrl.emptyResultMessage = "";
          }

        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else {
          ctrl.foundItems = [];
          ctrl.emptyResultMessage = "Nothing found";
      }
    }

    ctrl.removeItem = function (itemIndex)
    {
      ctrl.foundItems.splice(itemIndex, 1);
      if(ctrl.foundItems.length == 0)
        ctrl.emptyResultMessage = "Nothing found";
    };
  }

  function MenuSearchService($http)
  {
    var service = this;
    service.getMatchedMenuItems = function(searchTerm)
    {
      return $http(
      {
        method: "GET",
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      })
      .then(function(result){
        // process result and only keep items that match
        var foundItems;

        if(searchTerm !== undefined && searchTerm != ""){
          var pattern = new RegExp(searchTerm,"i");
          foundItems = result.data.menu_items.filter(item => item.description.search(pattern) > -1);
        }
        else {
          foundItems = result.data.menu_items;
        }

        // return processed items
        return foundItems;
      });
    };
  }

  MenuSearchFactory.$inject = ['$http'];
  function MenuSearchFactory($http) {
    var factory = function () {
      return new MenuSearchService($http);
    };
    return factory;
  }
})();
