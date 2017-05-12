﻿app.controller('KhoXuatController', function ($scope, $http) {
    var IsAdmin = $('#isadmin').val();
    var Username = $('#username').val();
    function init() {
        //Get List Hàng cần đặt
        $scope.lisHangCanXuat = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/GetHangCanDat/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.lisHangCanXuat = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List Bán hàng
        $scope.ListBanHang = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/GetListBanHang/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListBanHang = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List Xuất hàng
        $scope.ListXuatHang = [];
        $http.post(window.location.origin + '/api/Api_KhoXuat/GetListXuatHang/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListXuatHang = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List bán hàng chưa xuất
        $scope.ListBanHangChuaXuat = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_DON_BAN_HANG_CHUA_XUAT/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListBanHangChuaXuat = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List bán hàng đã xuất
        $scope.ListBanHangDaXuat = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_DON_BAN_HANG_DA_XUAT/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListBanHangDaXuat = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng cần xuất
        var username = $('#username').val();
        $scope.ListHangCanXuat = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_CAN_XUAT/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangCanXuat = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng giữ
        var username = $('#username').val();
        $scope.ListHangGiu = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiu = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng chưa giữ
        var username = $('#username').val();
        $scope.ListHangChuaGiu = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_CHUA_GIU/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangChuaGiu = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng giữ chưa bán
        var username = $('#username').val();
        $scope.ListHangGiuChuaBan = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU_CHUA_BAN/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiuChuaBan = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng giữ đã bán
        var username = $('#username').val();
        $scope.ListHangGiuDaBan = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU_DA_BAN/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiuDaBan = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng giữ quá ngày giao hàng
        var username = $('#username').val();
        $scope.ListHangGiuQuaNgayGiao = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU_QUA_NGAY_GIAO/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiuQuaNgayGiao = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng giữ sắp đến ngày xuất
        var username = $('#username').val();
        $scope.ListHangGiuSapDenNgayXuat = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU_SAP_DEN_NGAY_XUAT/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiuSapDenNgayXuat = response.data;
            }
        }, function (error) {
            console.log(error);
        });
    }
    init();

    $scope.DanLink = function (item) {
        window.location = '/KinhDoanh/DonHangPO/Details/' + item;
    }
    $scope.DanLinkXuatKho = function (item) {
        window.location = '/Inventory/KhoXuat/DetailXuatKho/' + item;
    }
});