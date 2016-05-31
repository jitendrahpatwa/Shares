angular.module('app.directives', [])

.directive('blankDirective', [function(){

}])
.directive('formManager', [function($ionicLoading) {
  return {
    restrict : 'A',
    controller : function($scope) {
      
      $scope.$watch('faleComigoForm.$valid', function() {
        console.log("Form validity changed. Now : " + $scope.faleComigoForm.$valid);
      });
      
      $scope.addfinal = function() {
        
        if($scope.faleComigoForm.$valid) {
          $scope.finalSubmit();
        } else {
          $ionicLoading.show({ template: 'Form Is Not Valid', duration: 1500})
        }

        
      }
    }
  } 
}]);

