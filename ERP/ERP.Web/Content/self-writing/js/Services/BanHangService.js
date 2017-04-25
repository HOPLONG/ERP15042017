﻿app.service('BanHangService', function ($http) {
    this.get_donbanhang = function () {
        return $http.get('/api/Api_BanHang/Get_DON_BAN_HANG').then(function (response) {
            return response.data;
        });
    };

    this.get_thongtinchung_donbanhang = function (masobh) {
        return $http.post("/api/Api_BanHang/GetThongtinChung/" + masobh).then(function (response) {
            return response.data;
        });
    };

    this.get_thongtinchitiet_donbanhang = function (masobh) {
        return $http.post("/api/Api_ChiTietBanHang/ThongtinChitiet/" + masobh).then(function (response) {
            return response.data;
        });
    };

    this.save_thongtinchungBH = function (masoBH,data_save) {
        return $http.put('/api/Api_BanHang/PutBH_DON_BAN_HANG/' + masoBH,data_save);
    };
});