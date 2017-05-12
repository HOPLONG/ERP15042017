app.controller('HomeBaoGiaCtrl', function ($scope, $location, $log) {
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function (current, old) {
        switch (current) {
            case 0:
                $location.url("/ListBaoGia");
                break;
            case 1:
                $location.url("/ListBaoGiaDaHuy");
                break;
            case 2:
                $location.url("/ListBaoGiaThanhCong");
                break;
            case 3:
                $location.url("/ListBaoGiaThatBai");
                break;
            case 4:
                $location.url("/ListBaoGiaDangChoPhanHoi");
                break;
            case 5:
                $location.url("/ListBaoGiaDaLenPO");
                break;
        }
    });
});

app.controller('HomeDonPOCtrl', function ($scope, $location, $log) {
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function (current, old) {
        switch (current) {
            case 0:
                $location.url("/ListPO");
                break;
            case 1:
                $location.url("/ListPO_DaDuyet");
                break;
            case 2:
                $location.url("/ListPO_DaHuy");
                break;
            case 3:
                $location.url("/ListPO_DangChoDuyet");
                break;
            case 4:
                $location.url("/ListPO_DangDuyet");
                break;
            case 5:
                $location.url("/ListPO_DaLenDonBanHang");
                break;
            case 6:
                $location.url("/ListPO_CanBanNgay");
                break;
            case 7:
                $location.url("/ListPO_DangXuatDo");
                break;
        }
    });
});

app.controller('HomeBanHangCtrl', function ($scope, $location, $log) {
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function (current, old) {
        switch (current) {
            case 0:
                $location.url("/ListDonBanHang");
                break;
            case 1:
                $location.url("/ListDonBanHangChuaXuatKho");
                break;
            case 2:
                $location.url("/ListDonBanHangDaXuatKho");
                break;
        }
    });
});

app.controller('HomeGiuKhoCtrl', function ($scope, $location, $log) {
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function (current, old) {
        switch (current) {
            case 0:
                $location.url("/TongHop");
                break;
            case 1:
                $location.url("/GiuKhoSale");
                break;
        }
    });
});

app.controller('HomeHangCanDatCtrl', function ($scope, $location, $log) {
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function (current, old) {
        switch (current) {
            case 0:
                $location.url("/HangCanDat");
                break;
            case 1:
                $location.url("/HangCanDatChuaDat");
                break;
            case 2:
                $location.url("/HangCanDatDaDat");
                break;
        }
    });
});

app.controller('HomeHangCanXuatCtrl', function ($scope, $location, $log) {
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function (current, old) {
        switch (current) {
            case 0:
                $location.url("/HangCanXuat");
                break;
            case 1:
                $location.url("/HangCanXuatDaGiu");
                break;
            case 2:
                $location.url("/HangCanXuatChuaGiu");
                break;
            case 3:
                $location.url("/HangCanXuatCanDatHang");
                break;
            case 4:
                $location.url("/HangCanXuatDaDatHang");
                break;
            case 5:
                $location.url("/HangCanXuatDaBan");
                break;
        }
    });
});

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    //Bao gia
    .state('ListBaoGia', {
        url: "/ListBaoGia",
        templateUrl: "ListBaoGia",
        controller: "baogiaCtrl"
    })
    .state('ListBaoGiaDaHuy', {
        url: "/ListBaoGiaDaHuy",
        templateUrl: "ListBaoGiaDaHuy",
        controller: "baogiaCtrl"
    })
    .state('ListBaoGiaThanhCong', {
        url: "/ListBaoGiaThanhCong",
        templateUrl: "ListBaoGiaThanhCong",
        controller: "baogiaCtrl"
    })
    .state('ListBaoGiaThatBai', {
        url: "/ListBaoGiaThatBai",
        templateUrl: "ListBaoGiaThatBai",
        controller: "baogiaCtrl"
    })
    .state('ListBaoGiaDangChoPhanHoi', {
        url: "/ListBaoGiaDangChoPhanHoi",
        templateUrl: "ListBaoGiaDangChoPhanHoi",
        controller: "baogiaCtrl"
    })
    .state('ListBaoGiaDaLenPO', {
        url: "/ListBaoGiaDaLenPO",
        templateUrl: "ListBaoGiaDaLenPO",
        controller: "baogiaCtrl"
    })
    // Don hang PO
        .state('ListPO', {
            url: "/ListPO",
            templateUrl: "ListPO",
            controller: "DonHangPOCtrl"
        })
    .state('ListPO_DaDuyet', {
        url: "/ListPO_DaDuyet",
        templateUrl: "ListPO_DaDuyet",
        controller: "DonHangPOCtrl"
    })
    .state('ListPO_DaHuy', {
        url: "/ListPO_DaHuy",
        templateUrl: "ListPO_DaHuy",
        controller: "DonHangPOCtrl"
    })
    .state('ListPO_DangChoDuyet', {
        url: "/ListPO_DangChoDuyet",
        templateUrl: "ListPO_DangChoDuyet",
        controller: "DonHangPOCtrl"
    })
    .state('ListPO_DangDuyet', {
        url: "/ListPO_DangDuyet",
        templateUrl: "ListPO_DangDuyet",
        controller: "DonHangPOCtrl"
    })
    .state('ListPO_DaLenDonBanHang', {
        url: "/ListPO_DaLenDonBanHang",
        templateUrl: "ListPO_DaLenDonBanHang",
        controller: "DonHangPOCtrl"
    })
    .state('ListPO_CanBanNgay', {
        url: "/ListPO_CanBanNgay",
        templateUrl: "ListPO_CanBanNgay",
        controller: "DonHangPOCtrl"
    })
    .state('ListPO_DangXuatDo', {
        url: "/ListPO_DangXuatDo",
        templateUrl: "ListPO_DangXuatDo",
        controller: "DonHangPOCtrl"
    })
    // Don ban hang
    .state('ListDonBanHang', {
        url: "/ListDonBanHang",
        templateUrl: "ListDonBanHang",
        controller: "BanHangCtrl"
    })
    .state('ListDonBanHangChuaXuatKho', {
        url: "/ListDonBanHangChuaXuatKho",
        templateUrl: "ListDonBanHangChuaXuatKho",
        controller: "BanHangCtrl"
    })
    .state('ListDonBanHangDaXuatKho', {
        url: "/ListDonBanHangDaXuatKho",
        templateUrl: "ListDonBanHangDaXuatKho",
        controller: "BanHangCtrl"
    })

        // Giu kho 

    .state('TongHop', {
        url: "/TongHop",
        templateUrl: "TongHop",
        controller: "GiuHangHopLongCtrl"
    })
    .state('GiuKhoSale', {
        url: "/GiuKhoSale",
        templateUrl: "GiuKhoSale",
        controller: "GiuHangHopLongCtrl"
    })


    // Hang Can Dat
    .state('HangCanDat', {
        url: "/HangCanDat",
        templateUrl: "HangCanDat",
        controller: "HangCanDatCtrl"
    })
    .state('HangCanDatChuaDat', {
        url: "/HangCanDatChuaDat",
        templateUrl: "HangCanDatChuaDat",
        controller: "HangCanDatCtrl"
    })
    .state('HangCanDatDaDat', {
        url: "/HangCanDatDaDat",
        templateUrl: "HangCanDatDaDat",
        controller: "HangCanDatCtrl"
    })

    // Hang Can xuat
    .state('HangCanXuat', {
        url: "/HangCanXuat",
        templateUrl: "HangCanXuat",
        controller: "HangCanXuatCtrl"
    })
    .state('HangCanXuatDaGiu', {
        url: "/HangCanXuatDaGiu",
        templateUrl: "HangCanXuatDaGiu",
        controller: "HangCanXuatCtrl"
    })
    .state('HangCanXuatChuaGiu', {
        url: "/HangCanXuatChuaGiu",
        templateUrl: "HangCanXuatChuaGiu",
        controller: "HangCanXuatCtrl"
    })
    .state('HangCanXuatCanDatHang', {
        url: "/HangCanXuatCanDatHang",
        templateUrl: "HangCanXuatCanDatHang",
        controller: "HangCanXuatCtrl"
    })
    .state('HangCanXuatDaDatHang', {
        url: "/HangCanXuatDaDatHang",
        templateUrl: "HangCanXuatDaDatHang",
        controller: "HangCanXuatCtrl"
    })
    .state('HangCanXuatDaBan', {
        url: "/HangCanXuatDaBan",
        templateUrl: "HangCanXuatDaBan",
        controller: "HangCanXuatCtrl"
    })
    ;
})