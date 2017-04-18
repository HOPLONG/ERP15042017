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

namespace ERP.Web.Api.DonHangPO
{
    public class Api_DonHangPOController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();
        XuLyNgayThang xlnt = new XuLyNgayThang();
        // GET: api/Api_DonHangPO
        [Route("api/Api_DonHangPO/GetBH_DON_HANG_PO")]
        public List<GetAll_DonHangPO_Result> GetBH_DON_HANG_PO()
        {
            var query = db.Database.SqlQuery<GetAll_DonHangPO_Result>("GetAll_DonHangPO");
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
                edit.THUE_SUAT_GTGT = bH_DON_HANG_PO.THUE_SUAT_GTGT;
                edit.TIEN_THUE_GTGT = bH_DON_HANG_PO.TIEN_THUE_GTGT;
                edit.TONG_TIEN_THANH_TOAN = bH_DON_HANG_PO.TONG_TIEN_THANH_TOAN;
                edit.SO_TIEN_VIET_BANG_CHU = bH_DON_HANG_PO.SO_TIEN_VIET_BANG_CHU;
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

        // POST: api/Api_DonHangPO
        [ResponseType(typeof(BH_DON_HANG_PO))]
        public IHttpActionResult PostBH_DON_HANG_PO(BH_DON_HANG_PO bH_DON_HANG_PO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BH_DON_HANG_PO.Add(bH_DON_HANG_PO);

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