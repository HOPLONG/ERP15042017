app.service('KhachChuaGiaoDichService', function ($http) {
    this.get_dskhachchuagiaodich = function (username) {
        return $http.get("/api/Api_DSKhachGiaoDich/GetKHChuaPhatSinh/" + username).then(function (response) {
            return response.data;
        });
    }
});
