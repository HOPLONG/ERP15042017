
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
    
    $scope.EditLichLamViec = function (id) {
        var data_save = {
            TIEU_DE_CONG_VIEC: $scope.kq.TIEU_DE_CONG_VIEC,
            NOI_DUNG_CONG_VIEC: $scope.kq.NOI_DUNG_CONG_VIEC,
            DIA_DIEM_LAM_VIEC: $scope.kq.DIA_DIEM_LAM_VIEC,
            THOI_GIAN_BAT_DAU: $scope.kq.THOI_GIAN_BAT_DAU,
            THOI_GIAN_KET_THUC: $scope.kq.THOI_GIAN_KET_THUC,
            TRANG_THAI: $scope.kq.TRANG_THAI,
            GHI_CHU: $scope.kq.GHI_CHU,
            HUY_CONG_VIEC : $scope.kq.HUY_CONG_VIEC
        }
        $http.put("/api/Api_TaiKhoanKH/PutLichLamViec/" + id,data_save).then(function (response) {
            alert('Sửa thành công')
            $scope.get_datalichlamviec($scope.kq.NHAN_VIEN_THUC_HIEN);
        }, function (error) {
            alert("Lỗi khi sửa");
        });
    }

    $scope.delete_lichlamviec = function (id) {
        $http.delete('/api/Api_TaiKhoanKH/DeleteLichLamViec/' + id).then(function (response) {
            alert('Xóa thành công');
            $scope.get_datalichlamviec($scope.kq.NHAN_VIEN_THUC_HIEN);
        }, function (error) {
            alert("Lỗi khi xóa");
        });
    };

    $scope.AddLichLamViec = function () {
        var data_add = {
            TIEU_DE_CONG_VIEC: $scope.tieu_de_cong_viec,
            NOI_DUNG_CONG_VIEC: $scope.noi_dung_cong_viec,
            DIA_DIEM_LAM_VIEC: $scope.dia_diem_lam_viec,
            THOI_GIAN_BAT_DAU: $scope.thoi_gian_bat_dau,
            THOI_GIAN_KET_THUC: $scope.thoi_gian_ket_thuc,
            TRANG_THAI: $scope.trang_thai,
            GHI_CHU: $scope.ghi_chu,
            NHAN_VIEN_THUC_HIEN : salehienthoi,
        }
        $http.post('/api/Api_TaiKhoanKH/PostLichLamViec', data_add).then(function (response) {
            alert('Thêm mới thành công');
            window.location.href = "/LichLamViecNhanVien/Index";
        }, function (error) {
            alert("Lỗi khi thêm mới");
        });
    };


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


    $scope.edit = function (kq) {
        $scope.kq = kq;
    };

    $http.get('/api/Api_GiaoViec/GetGiaoViec/' + salehienthoi).then(function (response) {
        $scope.list_congviec = response.data;
    });


    $scope.save_giao_viec = function (entry) {
        $scope.entry = entry;
        var data_save = {
            TRANG_THAI: $scope.entry.TRANG_THAI,
            GHI_CHU : $scope.entry.GHI_CHU,
        }
        $http.put('/api/Api_GiaoViec/PutNV_GIAO_VIEC/' + $scope.entry.ID, data_save).then(function (response) {
            alert('Sửa thành công')
            $http.get('/api/Api_GiaoViec/GetGiaoViec/' + salehienthoi).then(function (response) {
                $scope.list_congviec = response.data;
            });
        }, function (error) {
            alert("Lỗi khi sửa");
        });
    };

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

    $scope.trangthailamviec = ['Đang thực hiện', 'Chưa hoàn thành', 'Đã xong việc'];
});