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

namespace ERP.Web.Api.NhaCungCap
{
    public class Api_NhaCungCapController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_NhaCungCap
        public List<NCC_HL> GetNCCs()
        {
            var vData = (from t1 in db.NCCs
                         join t2 in db.NCC_LOAI on t1.PHAN_LOAI_NCC equals t2.MA_LOAI_NCC
                         select new
                         {
                             t1.MA_NHA_CUNG_CAP,                          
                             t1.TEN_NHA_CUNG_CAP,
                             t1.VAN_PHONG_GIAO_DICH,
                             t1.DIA_CHI_XUAT_HOA_DON,
                             t1.PHAN_LOAI_NCC,
                             t1.SDT,
                             t1.MST,
                             t1.DANH_GIA,
                             t1.EMAIL,
                             t1.FAX,
                             t1.LOGO,
                             t1.WEBSITE
                         ,
                             t1.DIEU_KHOAN_THANH_TOAN,
                             t1.SO_NGAY_DUOC_NO,
                             t1.SO_NO_TOI_DA,
                             t1.GHI_CHU,
                             t2.TEN_LOAI_NCC,
                             t2.MA_LOAI_NCC
                         });
            var result = vData.ToList().Select(x => new NCC_HL()
            {
                MA_NHA_CUNG_CAP = x.MA_NHA_CUNG_CAP,
                TEN_NHA_CUNG_CAP = x.TEN_NHA_CUNG_CAP,
                VAN_PHONG_GIAO_DICH = x.VAN_PHONG_GIAO_DICH,
                DIA_CHI_XUAT_HOA_DON = x.DIA_CHI_XUAT_HOA_DON,
                PHAN_LOAI_NCC = x.PHAN_LOAI_NCC,
                SDT = x.SDT,
                MST = x.MST,
                DANH_GIA = x.DANH_GIA,
                EMAIL = x.EMAIL,
                FAX = x.FAX,
                LOGO = x.LOGO,
                WEBSITE = x.WEBSITE,
                DIEU_KHOAN_THANH_TOAN = x.DIEU_KHOAN_THANH_TOAN,
                SO_NGAY_DUOC_NO = x.SO_NGAY_DUOC_NO,
                SO_NO_TOI_DA = x.SO_NO_TOI_DA,
                GHI_CHU = x.GHI_CHU,
                TEN_LOAI_NCC = x.TEN_LOAI_NCC,
                MA_LOAI_NCC = x.MA_LOAI_NCC,
            }).ToList();
            return result;
        }

        // GET: api/Api_NhaCungCap/5
        [ResponseType(typeof(NCC))]
        public IHttpActionResult GetNCC(string id)
        {
            NCC nCC = db.NCCs.Find(id);
            if (nCC == null)
            {
                return NotFound();
            }

            return Ok(nCC);
        }

        // PUT: api/Api_NhaCungCap/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNCC(string id, NCC nCC)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nCC.MA_NHA_CUNG_CAP)
            {
                return BadRequest();
            }

            db.Entry(nCC).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NCCExists(id))
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

        // POST: api/Api_NhaCungCap
        [ResponseType(typeof(NCC))]
        public IHttpActionResult PostNCC(NCC nCC)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


           db.NCCs.Add(nCC);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (NCCExists(nCC.MA_NHA_CUNG_CAP))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = nCC.MA_NHA_CUNG_CAP }, nCC);
        }

        // DELETE: api/Api_NhaCungCap/5
        [ResponseType(typeof(NCC))]
        public IHttpActionResult DeleteNCC(string id)
        {
            NCC nCC = db.NCCs.Find(id);
            if (nCC == null)
            {
                return NotFound();
            }

            db.NCCs.Remove(nCC);
            db.SaveChanges();

            return Ok(nCC);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NCCExists(string id)
        {
            return db.NCCs.Count(e => e.MA_NHA_CUNG_CAP == id) > 0;
        }
    }
}