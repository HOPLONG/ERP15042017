
// Khach hang
app.service('khachhangService', function ($http) {
    this.get_khachhang = function (username, tukhoa) {
        return $http.post('/api/Api_KH/KH_THEO_SALES/' + username + '/' + tukhoa).then(function (response) {
            return response.data;
        });
    };
    this.get_phanloaikhach = function () {
        return $http.get('/api/Api_LoaiKH').then(function (response) {
            return response.data;
        });
    };
    this.get_lienhekh = function (makh) {
        return $http.get('/api/Api_LienHeKhachHang/' + makh).then(function (response) {
            return response.data;
        });
    };
    this.get_nhanvienkd = function () {
        return $http.get('/api/Api_NhanvienKD').then(function (response) {
            return response.data;
        });
    };

    this.get_taikhoankh = function (makh) {
        return $http.get('/api/Api_TaiKhoanKH/' + makh).then(function (response) {
            return response.data;
        });
    };

    this.get_loaitk = function () {
        return $http.get('/api/Api_LoaiTaiKhoan').then(function (response) {
            return response.data;
        });
    };

    this.get_danhsachlienhe = function () {
        return $http.get('/api/Api_ListLienHeKH').then(function (response) {
            return response.data;
        });
    };
    this.add_phanloaikh = function (phanloaikh_add) {
        return $http.post('/api/Api_PhanLoaiKH', phanloaikh_add);
    };

    this.save_khachhang = function (id, kh_save) {
        return $http.put('/api/Api_KH/' + id, kh_save);
    };
    this.save_phanloaikh = function (id, phanloai_save) {
        return $http.put('/api/Api_PhanLoaiKH/' + id, phanloai_save);
    };

    this.save_lienhe = function (idlienhe, data_save) {
        return $http.put('/api/Api_LienHeKhachHang/' + idlienhe, data_save);
    };

    this.add_lienhe = function (data_add) {
        return $http.post('/api/Api_LienHeKhachHang', data_add);
    };

    this.add_taikhoan = function (data_add) {
        return $http.post('/api/Api_TaiKhoanKH', data_add);
    };

    this.get_lastmakhach = function () {
        return $http.get('/api/Api_KH/GetIdKH').then(function (response) {
            return response.data;
        });
    };

    this.save_salesphutrach = function (username, idlienhe, data_savesalesphutrach) {
        return $http.put('/api/Api_SalePhuTrach/' + username + '/' + idlienhe, data_savesalesphutrach);
    };

    this.add_saletao = function (data_add) {
        return $http.post('/api/Api_ChuyenSale', data_add);
    };
});
//end khach hang