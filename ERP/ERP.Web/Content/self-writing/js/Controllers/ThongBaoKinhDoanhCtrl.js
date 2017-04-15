app.controller('ThongBaoKinhDoanhCtrl', function ($scope, $http) {

   
    //get data khách hàng
    $http.get(window.location.origin + '/api/Api_BaiViet_TongHop/GetThongBaoKinhDoanh')
         .then(function (response) {
             if (response.data) {
                 $scope.ListThongBao = response.data;
                 
             }
         }, function (error) {
             console.log(error);
         });

  
});