using ERP.Web.Models.BusinessModel;
using ERP.Web.Models.Database;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ERP.Web.Api.Kho
{
    public class Api_XuatNhapKhoController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();
        XuLyNgayThang xlnt = new XuLyNgayThang();
        List<Search_SearchByType_Result> result = new List<Search_SearchByType_Result>();
        List<GetChungTuFromDoiTuong_Result> resultDoiTuong = new List<GetChungTuFromDoiTuong_Result>();
        List<GetChungTu_ByMa_Result> resulByMa = new List<GetChungTu_ByMa_Result>();
        List<GetAll_DS_PhieuXuatKho_Result> resultDSXuatKho = new List<GetAll_DS_PhieuXuatKho_Result>();
        List<GetChungTuTra_Result> resultCTTra = new List<GetChungTuTra_Result>();
        List<GetChungTuTra_ByKhachHang_Result> resultCTTraByKhach = new List<GetChungTuTra_ByKhachHang_Result>();

        #region "SearchByType"


        public class DataCondition
        {
            public string GiaTriChungTu { get; set; }
            public string FromTime { get; set; }
            public string ToTime { get; set; }
        }
        public class DataDSXuatKho
        {
            public string tungay { get; set; }
            public string denngay { get; set; }
        }
        public class DataCTByKH
        {
            public string makh { get; set; }
            public string tungay { get; set; }
            public string denngay { get; set; }
        }
        [Route("api/Api_XuatNhapKho/SearchByTypeWithDate")]
        public List<Search_SearchByType_Result> SearchByTypeWithDate(DataCondition data)
        {

            if(data.ToTime == "" && data.FromTime =="")

            {
                var query = db.Database.SqlQuery<Search_SearchByType_Result>("Search_SearchByType @LoaiChungTu,@macongty", new SqlParameter("LoaiChungTu", data.GiaTriChungTu), new SqlParameter("macongty", "HOPLONG"));
                result = query.ToList();
            }
            else
            {
                DateTime FromDate = xlnt.Xulydatetime(data.FromTime);
                DateTime ToDate = xlnt.Xulydatetime(data.ToTime);
                var query = db.Database.SqlQuery<Search_SearchByType_Result>("Search_SearchByTypeWithDate @LoaiChungTu,@FromDate,@ToDate, @macongty", new SqlParameter("LoaiChungTu", data.GiaTriChungTu), new SqlParameter("FromDate", FromDate), new SqlParameter("ToDate", ToDate), new SqlParameter("macongty", "HOPLONG"));
                result = query.ToList();
            }
            return result;
        }

        #endregion


        #region "Search by Object"
        [Route("api/Api_XuatNhapKho/SearchByDoiTuongWithDate")]
        public List<GetChungTuFromDoiTuong_Result> SearchByDoiTuongWithDate(DataCondition data)
        {

            if (data.FromTime == "" && data.ToTime == "")
            {
                var query = db.Database.SqlQuery<GetChungTuFromDoiTuong_Result>("GetChungTuFromDoiTuong @MaDoiTuong,@macongty", new SqlParameter("MaDoiTuong", data.GiaTriChungTu), new SqlParameter("macongty", "HOPLONG"));
                resultDoiTuong = query.ToList();
            }
            else

            {
                DateTime FromDate = xlnt.Xulydatetime(data.FromTime);
                DateTime ToDate = xlnt.Xulydatetime(data.ToTime);
                var query = db.Database.SqlQuery<GetChungTuFromDoiTuong_Result>("GetChungTuFromDoiTuong_WithDate @MaDoiTuong,@FromDate,@ToDate, @macongty", new SqlParameter("MaDoiTuong", data.GiaTriChungTu), new SqlParameter("FromDate", FromDate), new SqlParameter("ToDate", ToDate), new SqlParameter("macongty", "HOPLONG"));
                resultDoiTuong = query.ToList();
            }

            return resultDoiTuong;
        }
        #endregion


        #region "Get Chung tu theo ma"

        [Route("api/Api_XuatNhapKho/GetbyMa/{data}")]
        public List<GetChungTu_ByMa_Result> GetbyMa(string data)
        {
            var query = db.Database.SqlQuery<GetChungTu_ByMa_Result>("GetChungTu_ByMa @sochungtu,@macongty", new SqlParameter("sochungtu", data), new SqlParameter("macongty", "HOPLONG"));
            resulByMa = query.ToList();
            return resulByMa;
        }

        #endregion


        #region "Get All Doi Tuong"

        [Route("api/Api_XuatNhapKho/GetAllDoiTuong")]
        public List<GetAllDoiTuong_Result> GetAllDoiTuong()
        {


            var query = db.Database.SqlQuery<GetAllDoiTuong_Result>("GetAllDoiTuong @macongty", new SqlParameter("macongty", "HOPLONG"));
            var resultAllDT = query.ToList();

            return resultAllDT;
        }
        #endregion


        #region "Get All Danh Sach Phieu Xuat Kho"
        [HttpPost]
        [Route("api/Api_XuatNhapKho/GetAllDSPhieuXuatKho")]
        public List<GetAll_DS_PhieuXuatKho_Result> GetAllDSPhieuXuatKho(DataDSXuatKho data)
        {

                string FromDate = data.tungay;
                string ToDate = data.denngay;
                var query = db.Database.SqlQuery<GetAll_DS_PhieuXuatKho_Result>("GetAll_DS_PhieuXuatKho @tungay,@denngay, @macongty", new SqlParameter("tungay", FromDate), new SqlParameter("denngay", ToDate), new SqlParameter("macongty", "HOPLONG"));

            //var resultDSXuatKho = query.ToList();



            return query.ToList();
        }
        #endregion

        #region "Get Chứng Từ trả"

        [Route("api/Api_XuatNhapKho/GetCTTra")]
        public List<GetChungTuTra_Result> GetCTTra()
        {
            var query = db.Database.SqlQuery<GetChungTuTra_Result>("GetChungTuTra");
            resultCTTra = query.ToList();
            return resultCTTra;
        }

        #endregion

        #region "Get Chứng Từ trả theo khách hàng"
        [HttpPost]
        [Route("api/Api_XuatNhapKho/GetCTTraByKhach")]
        public List<GetChungTuTra_ByKhachHang_Result> GetCTTraByKhach(DataCTByKH data)
        {
            if (data.tungay == "" && data.denngay == "")
            {
                var query = db.Database.SqlQuery<GetChungTuTra_ByKhachHang_Result>("GetChungTuTra_ByKhachHang @makhachhang", new SqlParameter("makhachhang", data.makh));
                resultCTTraByKhach = query.ToList();
            }
            else
            {
                DateTime FromDate = xlnt.Xulydatetime(data.tungay);
                DateTime ToDate = xlnt.Xulydatetime(data.denngay);
                var query = db.Database.SqlQuery<GetChungTuTra_ByKhachHang_Result>("GetChungTuTra_ByKhachHangWithDate @makhachhang,@tungay,@denngay", new SqlParameter("makhachhang", data.makh), new SqlParameter("tungay", FromDate), new SqlParameter("denngay", ToDate));
                resultCTTraByKhach = query.ToList();
            }
            return resultCTTraByKhach;
        }

        #endregion

        
    }

}