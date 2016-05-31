angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('page0',{
    url:'/page0',
    templateUrl:'templates/starter.html',
    controller:'welcomeCtrl'
  })

      .state('tabsController.currentlyShared', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/currentlyShared.html',
        controller: 'currentlySharedCtrl'
      }
    }
  })

  .state('tabsController.pastShares', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/pastShares.html',
        controller: 'pastSharesCtrl'
      }
    }
  })

  .state('tabsController.nearByShares', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/nearByShares.html',
        controller: 'nearBySharesCtrl'
      }
    }
  })

  .state('tabsController.addShares', {
    url: '/addshare',
    views: {
      'tab4': {
        templateUrl: 'templates/addshare.html',
        controller: 'addSharesCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('sharedPost', {
    url: '/sharedPost:id',
    templateUrl: 'templates/sharedPost.html',
    controller: 'sharedPostCtrl'
  })

  .state('about', {
    url: '/about',
    templateUrl: 'templates/about.html',
    controller: 'choiceCtrl'
  })

  .state('setting', {
    url: '/setting',
    templateUrl: 'templates/setting.html',
    controller: 'choiceCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'choiceCtrl'
  })

$urlRouterProvider.otherwise('/page0')

  

});