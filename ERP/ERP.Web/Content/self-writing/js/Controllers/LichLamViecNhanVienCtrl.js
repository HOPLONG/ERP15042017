
app.controller('LichLamViecNhanVienCtrl', function ($scope, $http) {

    var salehienthoi = $('#salehienthoi').val();

    //get data lich lam viec
    $scope.get_datalichlamviec = function (nhanvienthuchien) {
        $http.get("http://27.72.144.148:8003/api/LichLamViec/GetLichLamViec/" + nhanvienthuchien)
         .then(function (response) {
             if (response.data) {
                 $scope.DataLichLamViec = response.data;
             }
         }, function (error) {
             alert("Lỗi kết nối không thể lấy được dữ liệu lịch làm việc của nhân viên");
         });
        $('#collapseTwo').addClass("navbar-collapse");
    }
    //End get data lịch làm việc



    //Get data_phòng ban
    $scope.get_dataphongban = function (macongty) {
        $http.get("http://27.72.144.148:8003/api/PhongBan/GetPhongBan/" + macongty)
         .then(function (response) {
             if (response.data) {
                 $scope.DataPhongBan = response.data;
             }
         }, function (error) {
             alert("Lỗi kết nối không thể lấy được danh sách phòng ban");
         });

    }
    $scope.get_dataphongban('HOPLONG')
    //end get data phòng ban
    



    //Get data_nhân viên phòng ban
    $scope.get_datanhanvienphongban = function (maphongban) {
        $http.get("http://27.72.144.148:8003/api/NhanVien/GetNhanVienPhongBan/" + maphongban)
         .then(function (response) {
             if (response.data) {
                 $scope.DataNhanVienPhongBan = response.data;
             }
         }, function (error) {
             alert("Lỗi kết nối không thể lấy được danh sách nhân viên phòng ban");
         });
        $('#collapseOne').addClass("in");
        $('#collapseTwo').removeClass("navbar-collapse");
    }
    //end get data nhân viên phòng ban


    $scope.MovetoEdit = function (id) {
        window.location.href = "/LichLamViecNhanvien/Edit/" + id ;
    }
    $scope.MovetoDetails = function (id) {
        window.location.href = "/LichLamViecNhanvien/Details/" + id;
    }
    $scope.MovetoDelete = function (id) {
        window.location.href = "/LichLamViecNhanvien/Delete/" + id;
    }



    //table expand row
    //mouse over navbar
    $('.navbar').mouseover(function (event) {
        $(this).find('.navbar-tool').show();
    });

    //mouse out of navbar
    $('.navbar').mouseout(function (event) {
        $(this).find('.navbar-tool').hide();
    });

    //on close collapse
    $('.collapse').on('hidden.bs.collapse', function () {
        var target = '#' + $(this).attr('data-parent');
        $(target).removeClass('collapse-open');
    });

    //on open collapse
    $('.collapse').on('shown.bs.collapse', function () {
        var target = '#' + $(this).attr('data-parent');
        $(target).addClass('collapse-open');
    })

    //End table expand row


});