app.service('POChuaXuLyService', function ($http) {
    this.get_list_pochuaxuly = function (salequanly) {
        return $http.post('/api/Api_POChuaXuLy/ListPO_CHUA_XU_LY/' + salequanly).then(function (response) {
            return response.data;
        });
    };
});