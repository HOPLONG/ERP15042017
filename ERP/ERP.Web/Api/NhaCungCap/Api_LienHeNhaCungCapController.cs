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
    public class Api_LienHeNhaCungCapController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_LienHeNhaCungCap
        [Route("api/Api_LienHeNhaCungCap/{mancc}")]
        public List<LienHeNCC> GetNCC_LIEN_HE(string mancc)
        {
            var vData = (from t1 in db.NCC_LIEN_HE
                         join t2 in db.NCC_PUR_PHU_TRACH on t1.ID_LIEN_HE equals t2.ID_LIEN_HE
                         join t3 in db.HT_NGUOI_DUNG on t2.PUR_PHU_TRACH equals t3.USERNAME
                         join t4 in db.NCCs on t1.MA_NHA_CUNG_CAP equals t4.MA_NHA_CUNG_CAP
                         where t1.MA_NHA_CUNG_CAP == mancc
                         select new
                         {
                             t1.MA_NHA_CUNG_CAP,
                             t1.NGUOI_LIEN_HE,
                             t1.CHUC_VU,
                             t1.PHONG_BAN,
                             t1.NGAY_SINH,
                             t1.GIOI_TINH,
                             t1.EMAIL_CA_NHAN,
                             t1.EMAIL_CONG_TY,
                             t1.SKYPE,
                             t1.SO_DIEN_THOAI_1,
                             t1.SO_DIEN_THOAI_2,
                             t1.GHI_CHU,
                             t1.FACEBOOK
                         ,
                             t2.ID,
                             t2.ID_LIEN_HE,
                             t2.PUR_PHU_TRACH,
                             t2.NGAY_BAT_DAU_PHU_TRACH,
                             t2.NGAY_KET_THUC_PHU_TRACH,
                             t2.TRANG_THAI,
                             t3.HO_VA_TEN,
                             t4.TEN_NHA_CUNG_CAP,
                         });
            var result = vData.ToList().Select(x => new LienHeNCC()
            {
                ID_LIEN_HE = x.ID_LIEN_HE,
                HO_VA_TEN = x.HO_VA_TEN,
                MA_NHA_CUNG_CAP = x.MA_NHA_CUNG_CAP,
                NGUOI_LIEN_HE = x.NGUOI_LIEN_HE,
                CHUC_VU = x.CHUC_VU,
                PHONG_BAN = x.PHONG_BAN,
                NGAY_SINH = x.NGAY_SINH,
                GIOI_TINH = x.GIOI_TINH,
                EMAIL_CA_NHAN = x.EMAIL_CA_NHAN,
                EMAIL_CONG_TY = x.EMAIL_CONG_TY,
                SKYPE = x.SKYPE,
                FACEBOOK = x.FACEBOOK,
                SO_DIEN_THOAI_1 = x.SO_DIEN_THOAI_1,
                SO_DIEN_THOAI_2 = x.SO_DIEN_THOAI_2,
                GHI_CHU = x.GHI_CHU,
                ID = x.ID,
                PUR_PHU_TRACH = x.PUR_PHU_TRACH,
                TRANG_THAI = x.TRANG_THAI,
                NGAY_KET_THUC_PHU_TRACH = x.NGAY_KET_THUC_PHU_TRACH,
                NGAY_BAT_DAU_PHU_TRACH = x.NGAY_BAT_DAU_PHU_TRACH,
                TEN_NHA_CUNG_CAP = x.TEN_NHA_CUNG_CAP,
            }).ToList();
            return result;
        }

        // GET: api/Api_LienHeNhaCungCap/5
        [ResponseType(typeof(NCC_LIEN_HE))]
        public IHttpActionResult GetNCC_LIEN_HE(int id)
        {
            NCC_LIEN_HE nCC_LIEN_HE = db.NCC_LIEN_HE.Find(id);
            if (nCC_LIEN_HE == null)
            {
                return NotFound();
            }

            return Ok(nCC_LIEN_HE);
        }

        // PUT: api/Api_LienHeNhaCungCap/5
        [Route("api/Api_LienHeNhaCungCap/{id}")]
        public IHttpActionResult PutNCC_LIEN_HE(int id, NCC_LIEN_HE nCC_LIEN_HE)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nCC_LIEN_HE.ID_LIEN_HE)
            {
                return BadRequest();
            }

            db.Entry(nCC_LIEN_HE).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NCC_LIEN_HEExists(id))
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

        // POST: api/Api_LienHeNhaCungCap
        [ResponseType(typeof(NCC_LIEN_HE))]
        public IHttpActionResult PostNCC_LIEN_HE(LienHeNCC lh)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            NCC_LIEN_HE lienhe = new NCC_LIEN_HE();
            lienhe.MA_NHA_CUNG_CAP = lh.MA_NHA_CUNG_CAP;
            lienhe.NGUOI_LIEN_HE = lh.NGUOI_LIEN_HE;
            lienhe.CHUC_VU = lh.CHUC_VU;
            lienhe.PHONG_BAN = lh.PHONG_BAN;
            lienhe.NGAY_SINH = lh.NGAY_SINH;
            lienhe.GIOI_TINH = lh.GIOI_TINH;
            lienhe.EMAIL_CA_NHAN = lh.EMAIL_CA_NHAN;
            lienhe.EMAIL_CONG_TY = lh.EMAIL_CONG_TY;
            lienhe.SKYPE = lh.SKYPE;
            lienhe.FACEBOOK = lh.FACEBOOK;
            lienhe.GHI_CHU = lh.GHI_CHU;
            lienhe.SO_DIEN_THOAI_1 = lh.SO_DIEN_THOAI_1;
            lienhe.SO_DIEN_THOAI_2 = lh.SO_DIEN_THOAI_2;
            db.NCC_LIEN_HE.Add(lienhe);
            db.SaveChanges();
            var query = db.NCC_LIEN_HE.Where(x => x.SO_DIEN_THOAI_1 == lh.SO_DIEN_THOAI_1).ToList();
            var data = query.LastOrDefault();
            NCC_PUR_PHU_TRACH salept = new NCC_PUR_PHU_TRACH();
            salept.ID_LIEN_HE = data.ID_LIEN_HE;
            salept.PUR_PHU_TRACH = lh.PUR_PHU_TRACH;
            salept.NGAY_BAT_DAU_PHU_TRACH = DateTime.Today.Date;
            salept.TRANG_THAI = true;
            db.NCC_PUR_PHU_TRACH.Add(salept);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = lh.ID_LIEN_HE }, lh);
        }

        // DELETE: api/Api_LienHeNhaCungCap/5
        [ResponseType(typeof(NCC_LIEN_HE))]
        public IHttpActionResult DeleteNCC_LIEN_HE(int id)
        {
            NCC_LIEN_HE nCC_LIEN_HE = db.NCC_LIEN_HE.Find(id);
            if (nCC_LIEN_HE == null)
            {
                return NotFound();
            }

            db.NCC_LIEN_HE.Remove(nCC_LIEN_HE);
            db.SaveChanges();

            return Ok(nCC_LIEN_HE);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NCC_LIEN_HEExists(int id)
        {
            return db.NCC_LIEN_HE.Count(e => e.ID_LIEN_HE == id) > 0;
        }
    }
}