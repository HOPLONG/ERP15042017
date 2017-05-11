using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ERP.Web.Models.Database;
using System.Data.SqlClient;

namespace ERP.Web.Api.Kho
{
    public class Api_KhoXuatController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_KhoXuat (List hàng cần đặt)
        [Route("api/Api_KhoXuat/GetHangCanDat/{isadmin}/{purchase}")]
        public List<Prod_HangCanDat_Result> GetHangCanDat(bool isadmin, string purchase)
        {
            var query = db.Database.SqlQuery<Prod_HangCanDat_Result>("Prod_HangCanDat @macongty,@isadmin,@purchase", new SqlParameter("macongty", "HOPLONG"), new SqlParameter("isadmin", isadmin), new SqlParameter("purchase", purchase));
            var result = query.ToList();
            return result;
        }

        // GET: api/Api_KhoXuat (List đơn bán hàng)
        [Route("api/Api_KhoXuat/GetListBanHang/")]
        public List<GetAll_ListBanHang_Result> GetListBanHang()
        {
            var query = db.Database.SqlQuery<GetAll_ListBanHang_Result>("GetAll_ListBanHang @macongty", new SqlParameter("macongty", "HOPLONG"));
            var result = query.ToList();
            return result;
        }
        // GET: api/Api_KhoXuat (List xuất hàng)
        [HttpPost]
        [Route("api/Api_KhoXuat/GetListXuatHang/")]

        public List<GetAll_List_XuatHang_Result> GetListXuatHang()

        {
            var query = db.Database.SqlQuery<GetAll_List_XuatHang_Result>("GetAll_List_XuatHang @macongty", new SqlParameter("macongty", "HOPLONG"));
            var result = query.ToList();
            return result;

        }

        // GET: api/Api_BanHang (List Bán Hàng Chưa Xuất)
        [Route("api/Api_KhoXuat/Get_DON_BAN_HANG_CHUA_XUAT")]
        public List<GetAll_DonBanHangChuaXuat_Result> Get_DON_BAN_HANG_CHUA_XUAT()
        {
            var query = db.Database.SqlQuery<GetAll_DonBanHangChuaXuat_Result>("GetAll_DonBanHangChuaXuat @macongty", new SqlParameter("macongty", "HOPLONG"));
            var result = query.ToList();
            return result;
        }
        // GET: api/Api_BanHang (List Hàng cần Xuất)
        [Route("api/Api_KhoXuat/Get_List_HANG_CAN_XUAT/{username}")]
        public List<Prod_HangCanXuat_Result> Get_List_HANG_CAN_XUAT(string username)
        {
            var query = db.Database.SqlQuery<Prod_HangCanXuat_Result>("Prod_HangCanXuat @macongty,@username", new SqlParameter("macongty", "HOPLONG"), new SqlParameter("username", username));
            var result = query.ToList();
            return result;
        }

        // GET: api/Api_BanHang (List Hàng Giữ)
        [Route("api/Api_KhoXuat/Get_List_HANG_GIU/{username}")]
        public List<Prod_ListHangGiu_Result> Get_List_HANG_GIU(string username)
        {
            var query = db.Database.SqlQuery<Prod_ListHangGiu_Result>("Prod_ListHangGiu @macongty,@username", new SqlParameter("macongty", "HOPLONG"), new SqlParameter("username", username));
            var result = query.ToList();
            return result;
        }
        // GET: api/Api_BanHang (List Hàng Chưa Giữ)
        [Route("api/Api_KhoXuat/Get_List_HANG_CHUA_GIU/{username}")]
        public List<Prod_HangChuaGiu_Result> Get_List_HANG_CHUA_GIU(string username)
        {
            var query = db.Database.SqlQuery<Prod_HangChuaGiu_Result>("Prod_HangChuaGiu @macongty,@username", new SqlParameter("macongty", "HOPLONG"), new SqlParameter("username", username));
            var result = query.ToList();
            return result;
        }
        // GET: api/Api_BanHang (List Hàng Giữ Chưa Bán)
        [Route("api/Api_KhoXuat/Get_List_HANG_GIU_CHUA_BAN/{username}")]
        public List<Prod_HangGiuChuaBan_Result> Get_List_HANG_GIU_CHUA_BAN(string username)
        {
            var query = db.Database.SqlQuery<Prod_HangGiuChuaBan_Result>("Prod_HangGiuChuaBan @macongty,@username", new SqlParameter("macongty", "HOPLONG"), new SqlParameter("username", username));
            var result = query.ToList();
            return result;
        }
        // GET: api/Api_BanHang (List Hàng Giữ Đã Bán)
        [Route("api/Api_KhoXuat/Get_List_HANG_GIU_DA_BAN/{username}")]
        public List<Prod_HangGiuDaBan_Result> Get_List_HANG_GIU_DA_BAN(string username)
        {
            var query = db.Database.SqlQuery<Prod_HangGiuDaBan_Result>("Prod_HangGiuDaBan @macongty,@username", new SqlParameter("macongty", "HOPLONG"), new SqlParameter("username", username));
            var result = query.ToList();
            return result;
        }
        // GET: api/Api_BanHang (List Hàng Giữ quá ngày giao hàng)
        [Route("api/Api_KhoXuat/Get_List_HANG_GIU_QUA_NGAY_GIAO/{username}")]
        public List<Prod_HangGiuQuaNgayGiaoHang_Result> Get_List_HANG_GIU_QUA_NGAY_GIAO(string username)
        {
            var query = db.Database.SqlQuery<Prod_HangGiuQuaNgayGiaoHang_Result>("Prod_HangGiuQuaNgayGiaoHang @macongty,@username", new SqlParameter("macongty", "HOPLONG"), new SqlParameter("username", username));
            var result = query.ToList();
            return result;
        }
        // GET: api/Api_BanHang (List Hàng Giữ quá ngày giao hàng)
        [Route("api/Api_KhoXuat/Get_List_HANG_GIU_SAP_DEN_NGAY_XUAT/{username}")]
        public List<Prod_HangGiuSapDenNgayXuat_Result> Get_List_HANG_GIU_SAP_DEN_NGAY_XUAT(string username)
        {
            var query = db.Database.SqlQuery<Prod_HangGiuSapDenNgayXuat_Result>("Prod_HangGiuSapDenNgayXuat @macongty,@username", new SqlParameter("macongty", "HOPLONG"), new SqlParameter("username", username));
            var result = query.ToList();
            return result;
        }
        
    }
}