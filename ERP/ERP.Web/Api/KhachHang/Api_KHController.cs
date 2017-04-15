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
using ERP.Web.Models.NewModels;
using System.Data.SqlClient;

namespace ERP.Web.Api.HeThong
{
    public class Api_KHController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_KH
        string mkh;
        public List<GetAll_KhachHang_Result> GetKH()
        {
            var query = db.Database.SqlQuery<GetAll_KhachHang_Result>("GetAll_KhachHang");
            var result = query.ToList();
            return result;
        }
        [Route("api/Api_KH/KH_THEO_SALES/{username}/{tukhoa}")]
        public List<HopLong_LocKHTheoSale_Result> KH_THEO_SALES( string username, string tukhoa)
        {
            var query = db.Database.SqlQuery<HopLong_LocKHTheoSale_Result>("HopLong_LocKHTheoSale @sale, @sdt", new SqlParameter("sale", username), new SqlParameter("sdt", tukhoa));
            var result = query.ToList();
            return result;
        }

        [Route("api/Api_KH/ThongKeMuaHang/{makhach}/{page}")]
        public List<KH_GetThongKeMuaHang_Result> ThongKeMuaHang(string makhach,int page)
        {
            var query = db.Database.SqlQuery<KH_GetThongKeMuaHang_Result>("KH_GetThongKeMuaHang @makhach,@page", new SqlParameter("makhach", makhach), new SqlParameter("page", page));
            var result = query.ToList();
            return result;
        }

        [Route("api/Api_KH/LocKH/{username}")]
        public List<GetAll_KhachCuaSale_Result> LocKH(string username)
        {
            var query = db.Database.SqlQuery<GetAll_KhachCuaSale_Result>("GetAll_KhachCuaSale @macongty, @sale", new SqlParameter("macongty", "HOPLONG"), new SqlParameter("sale", username));
            var result = query.ToList();
            return result;
        }

        
        [Route("api/Api_KH/PhantrangKH/{page}/{sale}")]
        public List<HopLong_PhanTrangKhachHang_Result> PhantrangKH(int page,string sale)
        {
            var query = db.Database.SqlQuery<HopLong_PhanTrangKhachHang_Result>("HopLong_PhanTrangKhachHang  @sotrang,@sale", new SqlParameter("sotrang", page), new SqlParameter("sale", sale));
            var result = query.ToList();
            return result;
        }

        [Route("api/Api_KH/GET_KHACH_CUA_SALE/{username}")]
        public List<GetAll_KhachCuaSale_Result> GET_KHACH_CUA_SALE(string username)
        {
            var query = db.Database.SqlQuery<GetAll_KhachCuaSale_Result>("GetAll_KhachCuaSale  @macongty, @sale", new SqlParameter("macongty", "HOPLONG"), new SqlParameter("sale", username));
            var result = query.ToList();
            return result;
        }



        [Route("api/Api_KH/GetAllSale")]
        public List<HopLong_GetAllSale_Result> GetAllSale()
        {
            var query = db.Database.SqlQuery<HopLong_GetAllSale_Result>("HopLong_GetAllSale");
            var result = query.ToList();
            return result;
        }


        // GET: api/Api_KH/5

        [Route("api/Api_KH/GetCT_KH/{makh}")]
        public List<Get_ChiTiet_Tung_KhachHang_Result> GetCT_KH(string makh)
        {
            var query = db.Database.SqlQuery<Get_ChiTiet_Tung_KhachHang_Result>("Get_ChiTiet_Tung_KhachHang @makh,@macongty", new SqlParameter("makh", makh), new SqlParameter("macongty", "HOPLONG"));
            var result = query.ToList();
            return result;
        }

        // PUT: api/Api_KH/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutKH(string id, KH kH)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != kH.MA_KHACH_HANG)
            {
                return BadRequest();
            }
            var khach = db.KHs.Where(x => x.MA_KHACH_HANG == id).FirstOrDefault();
            if(khach != null)
            {
                if(kH.LOGO!= "")
                {
                    khach.LOGO = kH.LOGO;
                }
               
                khach.TEN_CONG_TY = kH.TEN_CONG_TY;
                khach.VAN_PHONG_GIAO_DICH = kH.VAN_PHONG_GIAO_DICH;
                khach.DIA_CHI_XUAT_HOA_DON = kH.DIA_CHI_XUAT_HOA_DON;
                khach.TINH = kH.TINH;
                khach.QUOC_GIA = kH.QUOC_GIA;
                khach.MST = kH.MST;
                khach.HOTLINE = kH.HOTLINE;
                khach.EMAIL = kH.EMAIL;
                khach.FAX = kH.FAX;
                khach.WEBSITE = kH.WEBSITE;
                khach.DIEU_KHOAN_THANH_TOAN = kH.DIEU_KHOAN_THANH_TOAN;
                khach.SO_NGAY_DUOC_NO = kH.SO_NGAY_DUOC_NO;
                khach.SO_NO_TOI_DA = kH.SO_NO_TOI_DA;
                khach.TINH_TRANG_HOAT_DONG = kH.TINH_TRANG_HOAT_DONG;
                khach.GHI_CHU = kH.GHI_CHU;
                khach.TRUC_THUOC = kH.TRUC_THUOC;
                khach.SALES_TAO = kH.SALES_TAO;
            }
            //db.Entry(kH).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KHExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }


        [Route("api/Api_KH/GetIdKH")]
        public string GetIdKH()
        {
            var query = db.Database.SqlQuery<string>("XL_LayMaKhachMoiNhat");
            

            if (query.Count() > 0)
            {
                mkh = query.FirstOrDefault();
            }
                return mkh;
        }

        // POST: api/Api_KH
        [ResponseType(typeof(KH))]
        public IHttpActionResult PostKH(KH kH)
        {
            string makhachhang;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            String nam = DateTime.Today.Year.ToString();
            String nam2so = nam.Substring(2);
            var query = db.Database.SqlQuery<string>("XL_LayMaKhachMoiNhat");


            if (query.Count()>0)
            {
                string prefixID = "KH"+nam2so;
                var data = query.FirstOrDefault();
                string LastID = data;

                int nextID = int.Parse(LastID.Remove(0, prefixID.Length)) + 1;
                int lengthNumerID = LastID.Length - prefixID.Length;
                string zeroNumber = "";
                for (int i = 1; i <= lengthNumerID; i++)
                {
                    if (nextID < Math.Pow(10, i))
                    {
                        for (int j = 1; j <= lengthNumerID - i; i++)
                        {
                            zeroNumber += "0";
                        }
                    }
                }
               // int ma = Convert.ToInt32(makhach.Substring(4));
                makhachhang = prefixID + zeroNumber + nextID.ToString();
            }
            else
                makhachhang = "KH" + nam2so + "0001";

            KH khach = new KH();
            khach.MA_KHACH_HANG = makhachhang;
                khach.TEN_CONG_TY = kH.TEN_CONG_TY;
                khach.VAN_PHONG_GIAO_DICH = kH.VAN_PHONG_GIAO_DICH;
                khach.DIA_CHI_XUAT_HOA_DON = kH.DIA_CHI_XUAT_HOA_DON;
                khach.TINH = kH.TINH;
                khach.QUOC_GIA = kH.QUOC_GIA;
                khach.MST = kH.MST;
                khach.HOTLINE = kH.HOTLINE;
                khach.EMAIL = kH.EMAIL;
                khach.FAX = kH.FAX;
                khach.LOGO = kH.LOGO;
                khach.WEBSITE = kH.WEBSITE;
                khach.DIEU_KHOAN_THANH_TOAN = kH.DIEU_KHOAN_THANH_TOAN;
                khach.SO_NGAY_DUOC_NO = kH.SO_NGAY_DUOC_NO;
                khach.SO_NO_TOI_DA = kH.SO_NO_TOI_DA;
                khach.TINH_TRANG_HOAT_DONG = kH.TINH_TRANG_HOAT_DONG;
                khach.GHI_CHU = kH.GHI_CHU;
                khach.TRUC_THUOC = kH.TRUC_THUOC;
                khach.SALES_TAO = kH.SALES_TAO;
                db.KHs.Add(khach);


            

            

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (KHExists(kH.MA_KHACH_HANG))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = kH.MA_KHACH_HANG }, kH);
        }

        // DELETE: api/Api_KH/5
        [ResponseType(typeof(KH))]
        public IHttpActionResult DeleteKH(string id)
        {
            KH kH = db.KHs.Find(id);
            if (kH == null)
            {
                return NotFound();
            }

            db.KHs.Remove(kH);
            db.SaveChanges();

            return Ok(kH);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KHExists(string id)
        {
            return db.KHs.Count(e => e.MA_KHACH_HANG == id) > 0;
        }
    }
}