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
using System.Text.RegularExpressions;
using ERP.Web.Models.NewModels.MuaHang;
using System.Data.Entity.Validation;
using System.Threading.Tasks;

namespace ERP.Web.Api.MuaHang
{
    public class Api_DonPOMuaHangController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

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
            string SoChungTu = (from nhapkho in db.MH_PO_MUA_HANG where nhapkho.MA_SO_PO.Contains(prefixNumber) select nhapkho.MA_SO_PO).Max();


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

        // GET: api/Api_DonPOMuaHang
        public IQueryable<MH_PO_MUA_HANG> GetMH_PO_MUA_HANG()
        {
            return db.MH_PO_MUA_HANG;
        }

        // GET: api/Api_DonPOMuaHang/5
        [ResponseType(typeof(MH_PO_MUA_HANG))]
        public IHttpActionResult GetMH_PO_MUA_HANG(string id)
        {
            MH_PO_MUA_HANG mH_PO_MUA_HANG = db.MH_PO_MUA_HANG.Find(id);
            if (mH_PO_MUA_HANG == null)
            {
                return NotFound();
            }

            return Ok(mH_PO_MUA_HANG);
        }

        // PUT: api/Api_DonPOMuaHang/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMH_PO_MUA_HANG(string id, MH_PO_MUA_HANG mH_PO_MUA_HANG)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != mH_PO_MUA_HANG.MA_SO_PO)
            {
                return BadRequest();
            }

            db.Entry(mH_PO_MUA_HANG).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MH_PO_MUA_HANGExists(id))
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

        // POST: api/Api_DonPOMuaHang
        [HttpPost]
        [Route("api/Api_DonPOMuaHang/ThongTinChungPOMuaHang")]
        public IHttpActionResult ThongTinChungPOMuaHang(MH_PO_MUA_HANG mH_PO_MUA_HANG)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MH_PO_MUA_HANG newpo = new MH_PO_MUA_HANG();
            newpo.MA_SO_PO = GenerateMaSoPO();
            newpo.NGAY_PO = DateTime.Today.Date;
            newpo.NGUOI_TAO = mH_PO_MUA_HANG.NGUOI_TAO;
            newpo.NHA_CUNG_CAP = mH_PO_MUA_HANG.NHA_CUNG_CAP;
            newpo.NGUOI_LIEN_HE = mH_PO_MUA_HANG.NGUOI_LIEN_HE;
            newpo.DIA_DIEM_GIAO_HANG = mH_PO_MUA_HANG.DIA_DIEM_GIAO_HANG;
            newpo.HINH_THUC_THANH_TOAN = mH_PO_MUA_HANG.HINH_THUC_THANH_TOAN;
            newpo.HINH_THUC_VAN_CHUYEN = mH_PO_MUA_HANG.HINH_THUC_VAN_CHUYEN;
            newpo.THOI_HAN_THANH_TOAN = mH_PO_MUA_HANG.THOI_HAN_THANH_TOAN;
            newpo.TIEN_THUE_VAT = mH_PO_MUA_HANG.TIEN_THUE_VAT;
            newpo.TONG_TIEN_BANG_CHU = mH_PO_MUA_HANG.TONG_TIEN_BANG_CHU;
            newpo.TONG_TIEN_HANG = mH_PO_MUA_HANG.TONG_TIEN_HANG;
            newpo.TONG_TIEN_DA_BAO_GOM_VAT = mH_PO_MUA_HANG.TONG_TIEN_DA_BAO_GOM_VAT;
            newpo.THUE_VAT = mH_PO_MUA_HANG.THUE_VAT;
            db.MH_PO_MUA_HANG.Add(newpo);



            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {

                throw;

            }

            return Ok(newpo);
        }

        // Chi tiet PO mua hang
        [HttpPost]
        [Route("api/Api_DonPOMuaHang/ChiTietPOMuaHang")]
        public IHttpActionResult ChiTietPOMuaHang(List<ChiTietPOMuaHang> muahang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            foreach(var item in muahang)
            {
                MH_PO_CT_MUA_HANG newpoct = new MH_PO_CT_MUA_HANG();
                newpoct.MA_SO_PO = item.MA_SO_PO;
                newpoct.MA_HANG = item.MA_HANG;
                newpoct.SL = item.SL;
                newpoct.DON_GIA_CHUA_VAT = item.DON_GIA_CHUA_VAT;
                newpoct.THANH_TIEN_CHUA_VAT = item.THANH_TIEN_CHUA_VAT;
                newpoct.THOI_GIAN_GIAO_HANG = item.THOI_GIAN_GIAO_HANG;
                newpoct.GHI_CHU = item.GHI_CHU;
                newpoct.DA_NHAP_KHO = item.DA_NHAP_KHO;
                newpoct.GIA_BAN_RA = item.GIA_BAN_RA;
                newpoct.ID_BAN_HANG = item.ID_BAN_HANG;
                db.MH_PO_CT_MUA_HANG.Add(newpoct);
            }


            try
            {
                 db.SaveChanges();
            }
            catch (DbUpdateException)
            {
               
                    throw;
                
            }

            return Ok(muahang);
        }

        // DELETE: api/Api_DonPOMuaHang/5
        [ResponseType(typeof(MH_PO_MUA_HANG))]
        public IHttpActionResult DeleteMH_PO_MUA_HANG(string id)
        {
            MH_PO_MUA_HANG mH_PO_MUA_HANG = db.MH_PO_MUA_HANG.Find(id);
            if (mH_PO_MUA_HANG == null)
            {
                return NotFound();
            }

            db.MH_PO_MUA_HANG.Remove(mH_PO_MUA_HANG);
            db.SaveChanges();

            return Ok(mH_PO_MUA_HANG);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MH_PO_MUA_HANGExists(string id)
        {
            return db.MH_PO_MUA_HANG.Count(e => e.MA_SO_PO == id) > 0;
        }
    }
}