using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Web.Models.NewModels
{
    public class ChiTietBaoGia
    {
        public int ID { set; get; }
        public string SO_BAO_GIA { set; get; }
        public DateTime NGAY_BAO_GIA { set; get; }
        public string MA_DU_KIEN { set; get; }
        public string MA_KHACH_HANG { set; get; }
        public int LIEN_HE_KHACH_HANG { set; get; }
        public string PHUONG_THUC_THANH_TOAN { set; get; }
        public string HAN_THANH_TOAN { set; get; }
        public int? HIEU_LUC_BAO_GIA { set; get; }
        public string DIEU_KHOAN_THANH_TOAN { set; get; }
        public decimal? PHI_VAN_CHUYEN { set; get; }
        public decimal TONG_TIEN { set; get; }
        public bool? DA_DUYET { set; get; }
        public string NGUOI_DUYET { set; get; }
        public bool? DA_TRUNG { set; get; }
        public bool? DA_HUY { set; get; }
        public string LY_DO_HUY { set; get; }
        public string SALES_BAO_GIA { set; get; }
        public string TRUC_THUOC { set; get; }
        public string MA_HANG { set; get; }
        public int SO_LUONG { set; get; }
        public decimal DON_GIA { set; get; }
        public double CHIET_KHAU { set; get; }
        public string CACH_TINH_THANH_TIEN { set; get; }
        public decimal THANH_TIEN { set; get; }
        public double? CK_VAT { set; get; }
        public decimal? TIEN_VAT { set; get; }
        public string TINH_TRANG_HANG { set; get; }
        public string THOI_GIAN_GIAO_HANG { set; get; }
        public string NGAY_GIAO_HANG { set; get; }
        public string DIA_DIEM_GIAO_HANG { set; get; }
        public string GHI_CHU { set; get; }
        public string HO_VA_TEN { set; get; }
        public string VAN_PHONG_GIAO_DICH { set; get; }
        public string DIA_CHI_XUAT_HOA_DON { set; get; }
        public string NGUOI_LIEN_HE { set; get; }
        public string TEN_CONG_TY { set; get; }
        public DateTime NGAY_TAO { set; get; }
        public decimal DON_GIA_LIST { set; get; }
        public decimal DON_GIA_NHAP { set; get; }
        public float HE_SO_LOI_NHUAN { set; get; }
        public decimal DON_GIA_SAU_CHIET_KHAU { set; get; }
    }
}