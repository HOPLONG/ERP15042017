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

namespace ERP.Web.Api.BaoGia
{
    public class Api_DuyetDonPOController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_DuyetDonPO
        public List<ChiTietBaoGia> GetDuyet_Don_PO(string masoPO)
        {
            var vData = (from t1 in db.BH_DON_HANG_PO
                         join t3 in db.KHs on t1.MA_KHACH_HANG equals t3.MA_KHACH_HANG
                         join t5 in db.HT_NGUOI_DUNG on t1.NHAN_VIEN_QUAN_LY equals t5.USERNAME
                         where t1.MA_SO_PO == masoPO
                         select new
                         {
                             t1.MA_SO_PO,
                             t1.NGAY_LEN_PO,
                             t1.MA_KHACH_HANG,
                             t1.TEN_LIEN_HE,
                             t1.HINH_THUC_THANH_TOAN,
                             t1.TONG_TIEN_HANG,
                             t1.SO_TIEN_VIET_BANG_CHU,
                             t1.NGAY_GIAO_HANG,t1.DIA_DIEM_GIAO_HANG,t1.NHAN_VIEN_QUAN_LY,t1.DA_BAN_HANG,t1.TRUC_THUOC,t1.TONG_TIEN_THANH_TOAN,
                             t1.TONG_TIEN_THUE_GTGT,t1.DA_GIU,t1.DA_HUY,t1.LY_DO_HUY,t1.CAN_LAY_HOA_DON,t1.CAN_XUAT_NGAY,t1.DA_DUYET,t1.NGUOI_DUYET,t1.DANG_DUYET
                         });
            var result = vData.ToList().Select(x => new ChiTietBaoGia()
            {
                
            }).ToList();
            return result;
        }

        // GET: api/Api_DuyetDonPO/5
        [ResponseType(typeof(BH_CT_DON_HANG_PO))]
        public IHttpActionResult GetBH_CT_DON_HANG_PO(int id)
        {
            BH_CT_DON_HANG_PO bH_CT_DON_HANG_PO = db.BH_CT_DON_HANG_PO.Find(id);
            if (bH_CT_DON_HANG_PO == null)
            {
                return NotFound();
            }

            return Ok(bH_CT_DON_HANG_PO);
        }

        // PUT: api/Api_DuyetDonPO/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBH_CT_DON_HANG_PO(int id, BH_CT_DON_HANG_PO bH_CT_DON_HANG_PO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bH_CT_DON_HANG_PO.ID)
            {
                return BadRequest();
            }

            db.Entry(bH_CT_DON_HANG_PO).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BH_CT_DON_HANG_POExists(id))
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

        // POST: api/Api_DuyetDonPO
        [ResponseType(typeof(BH_CT_DON_HANG_PO))]
        public IHttpActionResult PostBH_CT_DON_HANG_PO(BH_CT_DON_HANG_PO bH_CT_DON_HANG_PO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BH_CT_DON_HANG_PO.Add(bH_CT_DON_HANG_PO);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bH_CT_DON_HANG_PO.ID }, bH_CT_DON_HANG_PO);
        }

        // DELETE: api/Api_DuyetDonPO/5
        [ResponseType(typeof(BH_CT_DON_HANG_PO))]
        public IHttpActionResult DeleteBH_CT_DON_HANG_PO(int id)
        {
            BH_CT_DON_HANG_PO bH_CT_DON_HANG_PO = db.BH_CT_DON_HANG_PO.Find(id);
            if (bH_CT_DON_HANG_PO == null)
            {
                return NotFound();
            }

            db.BH_CT_DON_HANG_PO.Remove(bH_CT_DON_HANG_PO);
            db.SaveChanges();

            return Ok(bH_CT_DON_HANG_PO);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BH_CT_DON_HANG_POExists(int id)
        {
            return db.BH_CT_DON_HANG_PO.Count(e => e.ID == id) > 0;
        }
    }
}