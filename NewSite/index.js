var app = angular.module("indexApp", ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider',
               function($stateProvider, $urlRouterProvider) {
     
                $stateProvider
                    .state('index', {
                        url: '/index',
                        templateUrl: '/home.html',
                        controller: 'MainCtrl'
                    })
                    .state('home', {
                        url: '/home',
                        templateUrl: '/home.html',
                        controller: 'MainCtrl'
                    })
                    .state('about', {
                        url: '/about',
                        templateUrl: '/about.html',
                        controller: 'AboutCtrl'
                    })
                    .state('web', {
                        url: '/web',
                        templateUrl: '/web.html',
                        controller: 'WebCtrl'
                    })
                    .state('mobile', {
                        url: '/mobile',
                        templateUrl: '/mobile.html',
                        controller: 'MobileCtrl'
                    })
                    .state('software', {
                        url: '/software',
                        templateUrl: '/software.html',
                        controller: 'SoftwareCtrl'
                    })
     
                $urlRouterProvider.otherwise('index');
    }]);

app.controller('MainCtrl', ['$scope', function ($scope) {
    
    $scope.pages = [{title: "ABOUT ME", link: "#/about", sublist: {}},
                    {title: "WEB DEVELOPMENT", link: "#/web", sublist: {}},
                    {title: "MOBILE DEVELOPMENT", link: "#/mobile", sublist: {}},
                    {title: "SOFTWARE DEVELOPMENT", link: "#/software", sublist: {}}
                   ];   
}]);

app.controller('AboutCtrl', ['$scope', function ($scope) {
    $("button").mousedown(function(){
      $(this).css("background-color", "#7F0404");
      console.log("mouse click");
    });
    $("button").mouseup(function(){
      $(this).css("background-color", "#B50505");
      console.log("mouse up");
    });
    $("button").click(function(){
      window.location = 'EnderCeylan_resume.docx';
      console.log("mouse click");
    });
}]);

app.controller('WebCtrl', ['$scope', function ($scope) {
    
}]);

app.controller('MobileCtrl', ['$scope', function ($scope) {
    
}]);

app.controller('SoftwareCtrl', ['$scope', function ($scope) {
    
}]);

/** animations **/

$(document).ready(function(){
    
  $("div.option").mouseover(function(){
    $(this).animate({fontSize: "28pt"}, 400);
    $(this).css("background-color", "#575757");
    console.log("mouse over");
  });
    
  $("div.option").click(function(){
    $(this > ".sublist").css("display", "block");
    console.log("mouse click");
  });
    
  $("div.option").mouseleave(function(){
    $(this).animate({fontSize: "25pt"}, 400);
    $(this).css("background-color", "#000000");
      console.log("mouse leave");
  });
    
});


