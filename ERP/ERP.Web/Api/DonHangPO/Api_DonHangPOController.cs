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
using ERP.Web.Models.NewModels;
using System.Text.RegularExpressions;

namespace ERP.Web.Api.DonHangPO
{
    public class Api_DonHangPOController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();
        XuLyNgayThang xlnt = new XuLyNgayThang();
        int tongton;
        // GET: api/Api_DonHangPO
        [Route("api/Api_DonHangPO/GetBH_DON_HANG_PO/{isadmin}/{sale}")]
        public List<GetAll_DonHangPO_Result> GetBH_DON_HANG_PO(bool isadmin,string sale)
        {
            var query = db.Database.SqlQuery<GetAll_DonHangPO_Result>("GetAll_DonHangPO @macongty,@isadmin,@sale", new SqlParameter("macongty", "HOPLONG"), new SqlParameter("isadmin", isadmin), new SqlParameter("sale", sale));
            var result = query.ToList();
            return result;
        }

        // GET: api/Api_DonHangPO/5
        [Route("api/Api_DonHangPO/GetThongtinChung/{masoPO}")]
        public List<GetAll_ThongTinChungDonHangPO_Result> GetThongtinChung(string masoPO)
        {
            var query = db.Database.SqlQuery<GetAll_ThongTinChungDonHangPO_Result>("GetAll_ThongTinChungDonHangPO @masoPO", new SqlParameter("masoPO", masoPO));
            var result = query.ToList();
            return result;
        }

        // PUT: api/Api_DonHangPO/5
        [ResponseType(typeof(void))]
        [Route("api/Api_DonHangPO/PutBH_DON_HANG_PO/{id}")]
        public IHttpActionResult PutBH_DON_HANG_PO(string id, ThongTinDonPO bH_DON_HANG_PO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bH_DON_HANG_PO.MA_SO_PO)
            {
                return BadRequest();
            }

            var edit = db.BH_DON_HANG_PO.Where(x => x.MA_SO_PO == id).FirstOrDefault();
            if (edit != null)
            {
                if(bH_DON_HANG_PO.NGAY_LEN_PO != null)
                    edit.NGAY_LEN_PO = xlnt.Xulydatetime(bH_DON_HANG_PO.NGAY_LEN_PO);
                edit.MA_KHACH_HANG = bH_DON_HANG_PO.MA_KHACH_HANG;
                edit.TEN_LIEN_HE = bH_DON_HANG_PO.TEN_LIEN_HE;
                edit.HINH_THUC_THANH_TOAN = bH_DON_HANG_PO.HINH_THUC_THANH_TOAN;
                edit.TONG_TIEN_HANG = bH_DON_HANG_PO.TONG_TIEN_HANG;
                edit.SO_TIEN_VIET_BANG_CHU = bH_DON_HANG_PO.SO_TIEN_VIET_BANG_CHU;
                if(bH_DON_HANG_PO.NGAY_GIAO_HANG != null)
                edit.NGAY_GIAO_HANG = xlnt.Xulydatetime(bH_DON_HANG_PO.NGAY_GIAO_HANG.ToString());
                edit.DIA_DIEM_GIAO_HANG = bH_DON_HANG_PO.DIA_DIEM_GIAO_HANG;
                edit.TONG_TIEN_THANH_TOAN = bH_DON_HANG_PO.TONG_TIEN_THANH_TOAN;
                edit.TONG_TIEN_THUE_GTGT = bH_DON_HANG_PO.TONG_TIEN_THUE_GTGT;
                edit.DA_HUY = bH_DON_HANG_PO.DA_HUY;
                edit.LY_DO_HUY = bH_DON_HANG_PO.LY_DO_HUY;
                edit.CAN_XUAT_NGAY = bH_DON_HANG_PO.CAN_XUAT_NGAY;
                edit.CAN_LAY_HOA_DON = bH_DON_HANG_PO.CAN_LAY_HOA_DON;
            }

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BH_DON_HANG_POExists(id))
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

        public string GenerateMaSoPO()
        {
            Regex digitsOnly = new Regex(@"[^\d]");
            string year = DateTime.Now.Year.ToString().Substring(2, 2);
            string month = DateTime.Now.Month.ToString();
            string day = DateTime.Now.Day.ToString();
            if (month.Length == 1)
            {
                month = "0" + month;
            }
            if (day.Length == 1)
            {
                day = "0" + day;
            }
            string prefixNumber = "PO" + year.ToString() + month.ToString() + day.ToString();
            string SoChungTu = (from nhapkho in db.BH_DON_HANG_PO where nhapkho.MA_SO_PO.Contains(prefixNumber) select nhapkho.MA_SO_PO).Max();


            if (SoChungTu == null)
            {
                return "PO" + year + month + day + "0001";
            }
            SoChungTu = SoChungTu.Substring(8, SoChungTu.Length - 8);
            string number = (Convert.ToInt32(digitsOnly.Replace(SoChungTu, "")) + 1).ToString();
            string result = number.ToString();
            int count = 4 - number.ToString().Length;
            for (int i = 0; i < count; i++)
            {
                result = "0" + result;
            }
            return "PO" + year + month + day + result;
        }

        // POST: api/Api_DonHangPO
        [ResponseType(typeof(BH_DON_HANG_PO))]
        public IHttpActionResult PostBH_DON_HANG_PO(BH_DON_HANG_PO bH_DON_HANG_PO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            BH_DON_HANG_PO edit = new BH_DON_HANG_PO();
            edit.MA_SO_PO = GenerateMaSoPO();
            edit.NGAY_LEN_PO = DateTime.Today.Date;
            edit.MA_KHACH_HANG = bH_DON_HANG_PO.MA_KHACH_HANG;
            edit.TEN_LIEN_HE = bH_DON_HANG_PO.TEN_LIEN_HE;
            edit.HINH_THUC_THANH_TOAN = bH_DON_HANG_PO.HINH_THUC_THANH_TOAN;
            edit.TONG_TIEN_THANH_TOAN = bH_DON_HANG_PO.TONG_TIEN_THANH_TOAN;
            edit.SO_TIEN_VIET_BANG_CHU = bH_DON_HANG_PO.SO_TIEN_VIET_BANG_CHU;
            if (bH_DON_HANG_PO.NGAY_GIAO_HANG != null)
                edit.NGAY_GIAO_HANG = xlnt.Xulydatetime(bH_DON_HANG_PO.NGAY_GIAO_HANG.ToString());
            edit.DIA_DIEM_GIAO_HANG = bH_DON_HANG_PO.DIA_DIEM_GIAO_HANG;
            edit.TONG_TIEN_THANH_TOAN = bH_DON_HANG_PO.TONG_TIEN_THANH_TOAN;
            edit.TONG_TIEN_THUE_GTGT = bH_DON_HANG_PO.TONG_TIEN_THUE_GTGT;
            edit.NHAN_VIEN_QUAN_LY = bH_DON_HANG_PO.NHAN_VIEN_QUAN_LY;
            edit.TRUC_THUOC = bH_DON_HANG_PO.TRUC_THUOC;
            edit.DA_BAN_HANG = bH_DON_HANG_PO.DA_BAN_HANG;
            edit.CAN_XUAT_NGAY = bH_DON_HANG_PO.CAN_XUAT_NGAY;
            edit.CAN_LAY_HOA_DON = bH_DON_HANG_PO.CAN_LAY_HOA_DON;
            db.BH_DON_HANG_PO.Add(edit);
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (BH_DON_HANG_POExists(bH_DON_HANG_PO.MA_SO_PO))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = bH_DON_HANG_PO.MA_SO_PO }, bH_DON_HANG_PO);
        }

        // DELETE: api/Api_DonHangPO/5
        [Route("api/Api_DonHangPO/DeleteBH_DON_HANG_PO/{id}")]
        public IHttpActionResult DeleteBH_DON_HANG_PO(string id)
        {
            BH_DON_HANG_PO bH_DON_HANG_PO = db.BH_DON_HANG_PO.Find(id);
            if (bH_DON_HANG_PO == null)
            {
                return NotFound();
            }
            List<BH_CT_DON_HANG_PO> listChiTiet = new List<BH_CT_DON_HANG_PO>();

            listChiTiet = db.BH_CT_DON_HANG_PO.Where(x => x.MA_SO_PO == id).ToList();

            foreach (var item in listChiTiet)
            {
                db.BH_CT_DON_HANG_PO.Remove(item);
            }
           

            db.BH_DON_HANG_PO.Remove(bH_DON_HANG_PO);
            db.SaveChanges();

            return Ok(bH_DON_HANG_PO);
        }


        //Add new PO
        [HttpPost]
        [Route("api/Api_DonHangPO/PostDon_Hang_PO")]
        public IHttpActionResult PostDon_Hang_PO(ThongTinDonPO thongtinPO)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            BH_DON_HANG_PO baogia = new BH_DON_HANG_PO();
            baogia.MA_SO_PO = GenerateMaSoPO();
            baogia.NGAY_LEN_PO = DateTime.Today.Date;
            baogia.MA_KHACH_HANG = thongtinPO.MA_KHACH_HANG;
            baogia.TEN_LIEN_HE = thongtinPO.TEN_LIEN_HE;
            baogia.HINH_THUC_THANH_TOAN = thongtinPO.HINH_THUC_THANH_TOAN;
            baogia.TONG_TIEN_THANH_TOAN = thongtinPO.TONG_TIEN_THANH_TOAN;
            baogia.TONG_TIEN_HANG = thongtinPO.TONG_TIEN_HANG;
            baogia.TONG_TIEN_THUE_GTGT = thongtinPO.TONG_TIEN_THUE_GTGT;
            baogia.SO_TIEN_VIET_BANG_CHU = thongtinPO.SO_TIEN_VIET_BANG_CHU;
            baogia.TRUC_THUOC = thongtinPO.TRUC_THUOC;
            baogia.DA_BAN_HANG = thongtinPO.DA_BAN_HANG;
            baogia.NHAN_VIEN_QUAN_LY = thongtinPO.NHAN_VIEN_QUAN_LY;
            if(thongtinPO.NGAY_GIAO_HANG != null)
            baogia.NGAY_GIAO_HANG =xlnt.Xulydatetime(thongtinPO.NGAY_GIAO_HANG.ToString());
            baogia.DIA_DIEM_GIAO_HANG = thongtinPO.DIA_DIEM_GIAO_HANG;
            baogia.CAN_LAY_HOA_DON = thongtinPO.CAN_LAY_HOA_DON;
            baogia.CAN_XUAT_NGAY = thongtinPO.CAN_XUAT_NGAY;
            db.BH_DON_HANG_PO.Add(baogia);
            db.SaveChanges();

            foreach (var item in thongtinPO.ChiTietPO)
            {
                var query = db.TONKHO_HOPLONG.Where(x => x.MA_HANG == item.MA_HANG).ToList();
                tongton = 0;
                if (query != null)
                {
                    foreach (var tonkho in query)
                    {
                        tongton = tongton + tonkho.SL_HOPLONG;
                    }
                } else
                {
                    tongton = 0;
                }
                
                BH_CT_DON_HANG_PO lienhe = new BH_CT_DON_HANG_PO();
                lienhe.MA_SO_PO = baogia.MA_SO_PO;
                lienhe.MA_HANG = item.MA_HANG;
                lienhe.MA_DIEU_CHINH = item.MA_DIEU_CHINH;
                lienhe.SO_LUONG = item.SO_LUONG;
                lienhe.DVT = item.DVT;
                lienhe.DON_GIA = item.DON_GIA;
                lienhe.THANH_TIEN_HANG = item.THANH_TIEN_HANG;
                lienhe.THUE_GTGT = thongtinPO.THUE_SUAT_GTGT;
                lienhe.TIEN_THUE_GTGT =( (Convert.ToDouble(item.THANH_TIEN_HANG) * (thongtinPO.THUE_SUAT_GTGT / 100) ));
                lienhe.TIEN_THANH_TOAN = Convert.ToDouble(lienhe.THANH_TIEN_HANG) + lienhe.TIEN_THUE_GTGT;
                if(item.SO_LUONG <= tongton)
                {
                    lienhe.CAN_GIU_HANG = true;
                    lienhe.CAN_DAT_HANG = false;
                } else if(item.SO_LUONG > tongton)
                {
                    lienhe.CAN_GIU_HANG = false;
                    lienhe.CAN_DAT_HANG = true;
                }
                db.BH_CT_DON_HANG_PO.Add(lienhe);
            }

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return Ok(baogia.MA_SO_PO);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BH_DON_HANG_POExists(string id)
        {
            return db.BH_DON_HANG_PO.Count(e => e.MA_SO_PO == id) > 0;
        }
    }
}