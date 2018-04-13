var app=angular.module("myapp",[]);
app.controller('myctrl', function($scope, $http) {
  var str = '';
  $scope.replies=[

  ];
  $http.get("http://127.0.0.1:5000/api/message").success(function(response){
      console.log(response);
      for (var i=0; i<response['name'].length; i++)
      {
        $scope.replies.push({name:response['name'][i],content:response['message'][i]})
      }
  });
  $scope.sites = [
        {site : "Facebook"},
        {site : "Google"},
        {site : "Alibaba"}
  ];
  $scope.refresh = function() {
    $scope.replies = [];
    $http.get("http://127.0.0.1:5000/api/message").success(function(response){
        for (var i=0; i<response['name'].length; i++)
        {
          $scope.replies.push({name:response['name'][i],content:response['message'][i]})
        }

    });
  };
  $scope.submit = function() {
    $scope.replies.push(
      {name:$scope.selectedSite.site, content: $scope.inputText}
    );

    var data = {
      data: JSON.stringify({"name":$scope.selectedSite.site,"Text":$scope.inputText})
    };

    $http({
      method: 'post',
      url: 'http://127.0.0.1:5000/api/message',
      data: data,
      headers:{'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
        var str = []
        for(var p in obj){
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
        }
        return str.join("&")
      }
    }).success(function(req){
      console.log(req);
    })
    $scope.inputText="";
  };
});
