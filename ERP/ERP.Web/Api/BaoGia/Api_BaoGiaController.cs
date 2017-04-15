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
using ERP.Web.Models.BusinessModel;

namespace ERP.Web.Api.BaoGia
{
    public class Api_BaoGiaController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();
        XuLyNgayThang xlnt = new XuLyNgayThang();
        // GET: api/Api_BaoGia
        public IQueryable<BH_BAO_GIA> GetBH_BAO_GIA()
        {
            return db.BH_BAO_GIA;
        }

        [Route("api/Api_BaoGia/GetLienHeKhach/{makhachhang}")]
        public List<GetAll_LienHeTheoKhach_Result> GetLienHeKhach(string makhachhang)
        {
            var query = db.Database.SqlQuery<GetAll_LienHeTheoKhach_Result>("GetAll_LienHeTheoKhach @makhachhang", new SqlParameter("makhachhang", makhachhang));
            var result = query.ToList();
            return result;
        }

        [Route("api/Api_BaoGia/BaoGiaTheoDuKien/{sodukien}")]
        public List<Get_BaoGia_TheoDuKien_Result> GetBaoGiaTheoDuKien(string sodukien)
        {
            var query = db.Database.SqlQuery<Get_BaoGia_TheoDuKien_Result>("Get_BaoGia_TheoDuKien @sodukien,@macongty", new SqlParameter("sodukien", sodukien), new SqlParameter("macongty", "HOPLONG"));
            var result = query.ToList();
            return result;
        }

        // GET: api/Api_BaoGia/5
        [ResponseType(typeof(BH_BAO_GIA))]
        public IHttpActionResult GetBH_BAO_GIA(string id)
        {
            BH_BAO_GIA bH_BAO_GIA = db.BH_BAO_GIA.Find(id);
            if (bH_BAO_GIA == null)
            {
                return NotFound();
            }

            return Ok(bH_BAO_GIA);
        }

        // PUT: api/Api_BaoGia/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBH_BAO_GIA(string id, BH_BAO_GIA bH_BAO_GIA)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bH_BAO_GIA.SO_BAO_GIA)
            {
                return BadRequest();
            }
            var baogia = db.BH_BAO_GIA.Where(x => x.SO_BAO_GIA == id).FirstOrDefault();
            if(baogia != null)
            {
                baogia.PHUONG_THUC_THANH_TOAN = bH_BAO_GIA.PHUONG_THUC_THANH_TOAN;
                baogia.HAN_THANH_TOAN = bH_BAO_GIA.HAN_THANH_TOAN;
                baogia.HIEU_LUC_BAO_GIA = bH_BAO_GIA.HIEU_LUC_BAO_GIA;
                baogia.DIEU_KHOAN_THANH_TOAN = bH_BAO_GIA.DIEU_KHOAN_THANH_TOAN;
                baogia.PHI_VAN_CHUYEN = bH_BAO_GIA.PHI_VAN_CHUYEN;
                baogia.TONG_TIEN = bH_BAO_GIA.TONG_TIEN;
            }
            
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BH_BAO_GIAExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(bH_BAO_GIA);
        }

        // POST: api/Api_BaoGia
        [ResponseType(typeof(BH_BAO_GIA))]
        public IHttpActionResult PostBH_BAO_GIA(BH_BAO_GIA bH_BAO_GIA)
        {
            string sobaogia;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            String nam = DateTime.Today.Year.ToString();
            String nam2so = nam.Substring(2);
            var query = db.Database.SqlQuery<string>("XL_LayBaoGiaMoiNhat");


            if (query.Count() > 0)
            {
                string prefixID = "BG" + nam2so;
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
                sobaogia = prefixID + zeroNumber + nextID.ToString();
            }
            else
                sobaogia = "BG" + nam2so + "0001";


            BH_BAO_GIA baogia = new BH_BAO_GIA();
            baogia.SO_BAO_GIA = sobaogia;
            baogia.MA_KHACH_HANG = bH_BAO_GIA.MA_KHACH_HANG;
            baogia.MA_DU_KIEN = bH_BAO_GIA.MA_DU_KIEN;
            baogia.NGAY_BAO_GIA = DateTime.Today.Date;
            baogia.LIEN_HE_KHACH_HANG = bH_BAO_GIA.LIEN_HE_KHACH_HANG;
            baogia.PHUONG_THUC_THANH_TOAN = bH_BAO_GIA.PHUONG_THUC_THANH_TOAN;
            baogia.HAN_THANH_TOAN = bH_BAO_GIA.HAN_THANH_TOAN;
            baogia.HIEU_LUC_BAO_GIA = bH_BAO_GIA.HIEU_LUC_BAO_GIA;
            baogia.DIEU_KHOAN_THANH_TOAN = bH_BAO_GIA.DIEU_KHOAN_THANH_TOAN;
            baogia.PHI_VAN_CHUYEN = bH_BAO_GIA.PHI_VAN_CHUYEN;
            baogia.TONG_TIEN = bH_BAO_GIA.TONG_TIEN;
            baogia.DA_DUYET = bH_BAO_GIA.DA_DUYET;
            baogia.DIEU_KHOAN_THANH_TOAN = bH_BAO_GIA.DIEU_KHOAN_THANH_TOAN;
            baogia.NGUOI_DUYET = bH_BAO_GIA.NGUOI_DUYET;
            baogia.DA_TRUNG = bH_BAO_GIA.DA_TRUNG;
            baogia.DA_HUY = bH_BAO_GIA.DA_HUY;
            baogia.LY_DO_HUY = bH_BAO_GIA.LY_DO_HUY;
            baogia.SALES_BAO_GIA = bH_BAO_GIA.SALES_BAO_GIA;
            baogia.TRUC_THUOC = bH_BAO_GIA.TRUC_THUOC;
            db.BH_BAO_GIA.Add(baogia);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (BH_BAO_GIAExists(bH_BAO_GIA.SO_BAO_GIA))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok(baogia);
        }

        // DELETE: api/Api_BaoGia/5
        [ResponseType(typeof(BH_BAO_GIA))]
        public IHttpActionResult DeleteBH_BAO_GIA(string id)
        {
            BH_BAO_GIA bH_BAO_GIA = db.BH_BAO_GIA.Find(id);
            if (bH_BAO_GIA == null)
            {
                return NotFound();
            }

            db.BH_BAO_GIA.Remove(bH_BAO_GIA);
            db.SaveChanges();

            return Ok(bH_BAO_GIA);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BH_BAO_GIAExists(string id)
        {
            return db.BH_BAO_GIA.Count(e => e.SO_BAO_GIA == id) > 0;
        }
    }
}