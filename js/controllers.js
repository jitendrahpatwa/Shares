angular.module('app.controllers', [])
  
.controller('welcomeCtrl',function($scope,$state,$ionicLoading){
  setTimeout(function(){$state.go('tabsController.currentlyShared')},8000);
  /*$scope.show = function() {
    $ionicLoading.show({
      template: 'templates/starter.html'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
  };*/
})

.controller('choiceCtrl',function($scope,$state,$http,$ionicLoading){
  $scope.sharecurrent = function(){
    $state.go('tabsController.currentlyShared');
  };
  $scope.sharepast = function(){
    $state.go('tabsController.pastShares');
  };
  $scope.sharenearby = function(){
    $state.go('tabsController.nearByShares');
  };
  $scope.about = function(){
    $state.go('about');
  }
  $scope.setting = function(){
    $state.go('setting');
  }
  $scope.profile = function(){
    $state.go('profile');
  }
  $scope.addshare = function(){
    $state.go('tabsController.addShares');
  }
})
.controller('currentlySharedCtrl', function($scope,$http,$interval, $timeout,$state, $ionicLoading,$ionicPopover, $ionicSideMenuDelegate) {
  $ionicLoading.show({ template: 'Loading...', duration: 1500});  
  var dd  = document.querySelector('#errmsgs');
  $scope.getCurrentShares = function(){   
    $http.get("http://shares.890m.com/get/shares.php")
    .success(function (response) 
    {
      //alert(response);
      if(!response || response.length==0){
         $ionicLoading.hide();
         dd.style.display = "block";
         dd.innerHTML ='<center><img src="img/DataNotFound.jpg" style="width:100%"><h4>No current share data in record</h4></center>';
      }else{
      	dd.style.display = "none";
         $scope.getshare = response;
         $ionicLoading.hide();
         
      }
    })
    .error(function(error){
    		dd.style.display = "block";
              $scope.errmsg = 'Could not load shares data';
              $ionicLoading.hide();
              
    });  
    $timeout(function(){
        $scope.getCurrentShares();
      },1000);
  };
  $scope.getCurrentShares();

  $scope.doRefresh = function() {
     $http.get("http://shares.890m.com/get/shares.php")
     .success(function(response) {
       $scope.getshare = response;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    };

    $scope.callview = function(argument){
      $state.go('sharedPost',{'id':argument});
    };
    var countClickshappy = 0,countClickssad = 0;
    $scope.callhappy = function(argument){
      countClickshappy++;
      if(countClickshappy%2==0){
        $http.post("http://shares.890m.com/set/likesbyidnone.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }else{
        //like update
        $http.post("http://shares.890m.com/set/likesbyid.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }
    };
    $scope.callsad = function(argument){
      countClickssad++;
      if(countClickssad%2==0){
        $http.post("http://shares.890m.com/set/dislikebyidnone.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }else{
        $http.post("http://shares.890m.com/set/dislikebyid.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }
    };

})

/*.controller('getCtrl',function($scope,$http, $timeout,$state){
  $scope.callview = function(argument){
      $state.go('sharedPost',{'id':argument});
    };  
})*/
   
.controller('pastSharesCtrl', function($scope,$http, $timeout,$state, $ionicLoading,$ionicPopover, $ionicSideMenuDelegate) {
  $ionicLoading.show({ template: 'Loading...', duration: 1500});
  var dd  = document.querySelector('#errmsgs');
  $scope.getPastShares = function(){
      
    $http.get("http://shares.890m.com/get/sharespast.php")
    .success(function (response) 
    {
      if(response.length==0){
         $ionicLoading.hide();
         dd.style.display = "block";
         dd.innerHTML ='<center><img src="img/DataNotFound.jpg" style="width:100%"><h4>No past share data in record</h4></center>';
      }else{
         $scope.getshare = response;
         $ionicLoading.hide();
         dd.style.display = "none";
      }
    })
    .error(function(error){
          $scope.errmsg = 'Could not shares data';
          $ionicLoading.hide();
          dd.style.display = "block";
    }); 
    $timeout(function(){
          $scope.getPastShares();
    },1010);
  };
  $scope.getPastShares();

  $scope.doRefresh = function() {
     $http.get("http://shares.890m.com/get/sharespast.php")
     .success(function(response) {
       $scope.getshare = response;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    };
    $scope.callview = function(argument){
      $state.go('sharedPost',{'id':argument});
    };
    var countClickshappy = 0,countClickssad = 0;
    $scope.callhappy = function(argument){
      countClickshappy++;
      if(countClickshappy%2==0){
        $http.post("http://shares.890m.com/set/likesbyidnone.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }else{
        //like update
        $http.post("http://shares.890m.com/set/likesbyid.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }
    };
    $scope.callsad = function(argument){
      countClickssad++;
      if(countClickssad%2==0){
        $http.post("http://shares.890m.com/set/dislikebyidnone.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }else{
        $http.post("http://shares.890m.com/set/dislikebyid.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }
    };
})
   
.controller('nearBySharesCtrl', function($scope,$http, $timeout,$state, $ionicLoading,$ionicPopover, $ionicSideMenuDelegate) {
  $ionicLoading.show({ template: 'Loading...', duration: 1500});  
  var dd  = document.querySelector('#errmsgs');
  $scope.getNearByShares = function(){
    
    $http.get("http://shares.890m.com/get/sharesnearby.php")
    .success(function (response) 
    {
      if(response.length==0){
         $ionicLoading.hide();
         dd.style.display = "block";
         dd.innerHTML ='<center><img src="img/DataNotFound.jpg" style="width:100%"><h4>No NearBy share data in record</h4></center>';
      }else{
         $scope.getshare = response;
         $ionicLoading.hide();
         dd.style.display = "none";
      }
    })
    .error(function(error){
          $scope.errmsg = 'Could not shares data';
          $ionicLoading.hide();
          dd.style.display = "block";
    });  
    $timeout(function(){
            $scope.getNearByShares();
    },1020);
  };
  $scope.getNearByShares();

  $scope.doRefresh = function() {
     $http.get("http://shares.890m.com/get/sharesnearby.php")
     .success(function(response) {
       $scope.getshare = response;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    };
    $scope.callview = function(argument){
      $state.go('sharedPost',{'id':argument});
    };
    var countClickshappy = 0,countClickssad = 0;
    $scope.callhappy = function(argument){
      countClickshappy++;
      if(countClickshappy%2==0){
        $http.post("http://shares.890m.com/set/likesbyidnone.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }else{
        //like update
        $http.post("http://shares.890m.com/set/likesbyid.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }
    };
    $scope.callsad = function(argument){
      countClickssad++;
      if(countClickssad%2==0){
        $http.post("http://shares.890m.com/set/dislikebyidnone.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }else{
        $http.post("http://shares.890m.com/set/dislikebyid.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }
    };
})
         
.controller('sharedPostCtrl', function($scope,$stateParams,$http,$ionicPopup, $timeout,$state, $ionicLoading,$ionicPopover,$ionicSideMenuDelegate) {
  //$scope.getshare = "";
  $ionicLoading.show({ template: 'Loading...', duration: 1500});  
  var dd  = document.querySelector('#errmsgs');

    $http.get("http://shares.890m.com/get/sharesifid.php?id="+$stateParams.id)
    .success(function (response) 
    {
      if(response.length==0){
         $ionicLoading.hide();
         dd.style.display = "block";
         dd.innerHTML ='<center><img src="img/DataNotFound.jpg" style="width:100%"><h4>No current share data in record</h4></center>';
      }else{
         $scope.getshare = response;
         $ionicLoading.hide();
         dd.style.display = "none";
      }
    })
    .error(function(error){
          $scope.errmsg = 'Could not shares data';
          $ionicLoading.hide();
          dd.style.display = "block";
    });  

  $scope.getSharedPostShares = function(){

    $http.get("http://shares.890m.com/get/comments.php?id="+$stateParams.id)
    .success(function (response) 
    {
      if(response.length==0){
         $ionicLoading.hide();
         $scope.errcomment = 'Could not shares data';
      }else{
         $scope.getcomment = response;
         $ionicLoading.hide();
      }
    })
    .error(function(error){
          //$scope.errcomment = 'Could not shares data';
          $ionicLoading.hide();
    });  
    $timeout(function(){
            $scope.getSharedPostShares();
    },1030);
  };
  $scope.getSharedPostShares();

  $scope.getID = $stateParams.id ;
  var countClickshappy = 0,countClickssad = 0;
    $scope.callhappy = function(argument){
      countClickshappy++;
      if(countClickshappy%2==0){
        $http.post("http://shares.890m.com/set/likesbyidnone.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }else{
        //like update
        $http.post("http://shares.890m.com/set/likesbyid.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }
    };
    $scope.callsad = function(argument){
      countClickssad++;
      if(countClickssad%2==0){
        $http.post("http://shares.890m.com/set/dislikebyidnone.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }else{
        $http.post("http://shares.890m.com/set/dislikebyid.php?id="+argument)
        .success(function(){})
        .error(function(){});
      }
    };

    $scope.txtcomment = {
      /*'id':'',
      'name':'',
      'email':'',
      'group':'',*/
      'comments':''
    };//id:id,name:name,email:email,comments:$scope.txtcomment.comments,group:group
    //id:$scope.txtcomment.id,name:$scope.txtcomment.name,email:$scope.txtcomment.email,comments:$scope.txtcomment.comments,group:$scope.txtcomment.group
    $scope.addCommentFinall = function(){
      $scope.tt = {
        'id':document.faleComigoForm1.id.value,//id,
        'userName':document.faleComigoForm1.userName.value,//name,
        'userEmail':document.faleComigoForm1.userEmail.value,//email,
        'commentGroup':document.faleComigoForm1.commentGroup.value,//group,
        'comment':document.faleComigoForm1.comments.value//$scope.txtcomment.comments
      };
      console.info($scope.txtcomment.comments);
      console.info($scope.tt.comment+$scope.tt.id+$scope.tt.userName+$scope.tt.userEmail+$scope.tt.commentGroup);
      $ionicLoading.show({ template: 'Posting your comment...', duration: 2000});
      console.info('in method');
      $.ajax({
        data:{id:$scope.tt.id,userName:$scope.tt.userName,userEmail:$scope.tt.userEmail,commentGroup:$scope.tt.commentGroup,comment:$scope.tt.comment,randomvar:'random data'},
        url:"http://shares.890m.com/set/addcomment.php",
        method:'POST',
        success:function(data){
        console.info('posted'); 
          if(data=="success"){
              $ionicPopup.alert({
                title: 'Done',
                content: 'Thanks for sharing your comments!!!'
              }).then(function(res) {
                console.info('Thanks');
              });
              location.reload();
            }else{
              $ionicPopup.alert({
                title: 'Failed',
                content: 'Comment could not shared due to '+data
              }).then(function(res) {
                console.info('Thanks');
              });
            }
      },
      error:function(errr){
          $ionicPopup.alert({
                title: 'Server Says',
                content: 'Comment is not posted due to your internet connectivity is lost. Try to connect again.'
              }).then(function(res) {
                console.log('Try');
              });
      }//;
      });
      $ionicLoading.hide();
    };
})
 
 .controller('addSharesCtrl',function($scope,$stateParams,$http, $ionicLoading,$state, $ionicPopup,$ionicPopover,$ionicSideMenuDelegate){
  $scope.message = {
    'title' : '',
    'desc' : '',
    'location' : ''
  };
  
  $scope.finalSubmit = function() {
    console.info('in finalSubmit');
    $ionicLoading.show({ template: 'Submitting...', duration: 2000});
    console.info('Posting');
    $.ajax({
        data:{shareTitle:$scope.message.title,shareDesc:$scope.message.desc,location:$scope.message.location,randomvar:'random data'},
        url:"http://shares.890m.com/set/addshare.php",
        method:'POST',
        success:function(data){
          //if(data=="success"){
          console.info('success post');
          $ionicPopup.alert({
              title: 'Thanks&nbsp;<span class="ion-ios-checkmark" style="color:green"></span>',
              content: 'For sharing your post successfully!!!'
            }).then(function(res) {
              console.log('Thanks');
            });   
          /*}else{
            $ionicPopup.alert({
              title: 'Server Said',
              content: 'Shares is not posted due to .'+data
            }).then(function(res) {
              console.log('Try');
            });  
          }*/
        },
        error:function(errr){
          $ionicPopup.alert({
              title: 'Server Says',
              content: 'Shares is not posted due to your internet connectivity is lost. Try to connect again.'
            }).then(function(res) {
              console.log('Try');
            });
        } 
      });
    /*$http.post("http://shares.890m.com/set/addshare.php",{shareTitle:$scope.message.title,shareDesc:$scope.message.desc,location:$scope.message.location})
    .success(function(data){
      console.info('success post');
      $ionicPopup.alert({
              title: 'Thanks&nbsp;<span class="ion-ios-checkmark" style="color:green"></span>',
              content: 'For sharing your post successfully!!!'+data
            }).then(function(res) {
              console.log('Thanks');
            });   
    })
    .error(function(){
        $ionicPopup.alert({
              title: 'Server Says',
              content: 'Shares is not posted due to your internet connectivity is lost. Try to connect again.'
            }).then(function(res) {
              console.log('Try');
            });
    });*/
    $ionicLoading.hide();
  };
  /*$scope.addfinal = function(){
    $http.post("http://shares.890m.com/set/addshare.php")
    .success(function(){
    $ionicPopup.alert({
              title: 'Thanks&nbsp;<span class="ion-ios-checkmark" style="color:green"></span>',
              content: 'For sharing your post successfully!!!'
            }).then(function(res) {
              console.log('Thanks');
            });   
    })
    .error(function(){
        $ionicPopup.alert({
              title: 'error',
              content: 'Post is not shared'
            }).then(function(res) {
              console.log('Try');
            });
    });
  };*/
 })