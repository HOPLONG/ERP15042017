
    angular
        .module('myApp')
        .service('DataService', DataService);

    DataService.$inject = ['ajaxService'];

    function DataService(ajaxService) {

        var service = {
            getTaiKhoanNganHang: getTaiKhoanNganHang,
            getDanhSachPhieuThuNganHang: getDanhSachPhieuThuNganHang,
            getDoiTuong: getDoiTuong,
            getNccTaiKhoanNganHang: getNccTaiKhoanNganHang,
            getNoiDungThanhToan: getNoiDungThanhToan,
            getDanhSachPhieuChiTienMat: getDanhSachPhieuChiTienMat,
            getDmLoaiChungTu: getDmLoaiChungTu,
            getDmChungTu: getDmChungTu,
            findDmChungTuWithMaCongTy: findDmChungTuWithMaCongTy,
            findDmChungTuWithMaLoaiChungTu: findDmChungTuWithMaLoaiChungTu,
            getDmTaiKhoanHachToan: getDmTaiKhoanHachToan,
            getCctcFullNhanVien: getCctcFullNhanVien,
            getDanhSachPhieuThuTienMat: getDanhSachPhieuThuTienMat,
            getNcc: getNcc,
            getDanhSachPhieuChiNganHang: getDanhSachPhieuChiNganHang,
            postNhUnc: postNhUnc,
            getTaiKhoanDinhKhoanTuDong: getTaiKhoanDinhKhoanTuDong
        };

        return service;

        function getTaiKhoanNganHang(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_DM_TK_NGAN_HANG_NOI_BO", successFunction, errorFunction, ui);
        }

        function getDanhSachPhieuThuNganHang(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_NH_NTTK/", successFunction, errorFunction, ui);
        }

        function getDanhSachPhieuChiNganHang(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/NH_UNC/list", successFunction, errorFunction, ui);
        }

        function getDanhSachPhieuChiTienMat(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_QUY_PHIEU_CHI", successFunction, errorFunction, ui);
        }

        function getDanhSachPhieuThuTienMat(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_QUY_PHIEU_THU", successFunction, errorFunction, ui);
        }

        function getDoiTuong(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_DM_DOI_TUONG", successFunction, errorFunction, ui);
        }

        function getNccTaiKhoanNganHang(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_NCC_TK_NGAN_HANG", successFunction, errorFunction, ui);
        }

        function getNoiDungThanhToan(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/DM_DINH_KHOAN_TU_DONG", successFunction, errorFunction, ui);
        }

        function getDmLoaiChungTu(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/DM_LOAI_CHUNG_TU", successFunction, errorFunction, ui);
        }

        function getDmChungTu(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/DM_CHUNG_TU", successFunction, errorFunction, ui);
        }

        function findDmChungTuWithMaCongTy(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/DM_CHUNG_TU/MA_CONG_TY", successFunction, errorFunction, ui);
        }

        function findDmChungTuWithMaLoaiChungTu(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/DM_CHUNG_TU/MA_LOAI_CHUNG_TU", successFunction, errorFunction, ui);
        }

        function getDmTaiKhoanHachToan(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_TaiKhoanHachToan", successFunction, errorFunction, ui);
        }

        function getCctcFullNhanVien(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/NGUOI_DUNG_FULL", successFunction, errorFunction, ui);
        }

        function getNcc(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_NCCs", successFunction, errorFunction, ui);
        }

        function postNhUnc(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxPost(data, "/api/NH_UNC/Hach_Toan", successFunction, errorFunction, ui);
        }

        function getTaiKhoanDinhKhoanTuDong(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_Dinhkhoantudong", successFunction, errorFunction, ui);
        }
    };