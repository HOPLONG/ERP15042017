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

namespace ERP.Web.Api.KhachHang
{
    public class Api_KhachHangPolicyController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_KhachHangPolicy
        public IQueryable<KH_POLICY> GetKH_POLICY()
        {
            return db.KH_POLICY;
        }

        // GET: api/Api_KhachHangPolicy/5

        public List<KH_POLICY> KH_POLICY(string id)
        {
            var vData = db.KH_POLICY.Where(x => x.MA_KHACH_HANG == id);
            var result = vData.ToList().Select(x => new KH_POLICY()
            {
                ID=x.ID,
                MA_KHACH_HANG = x.MA_KHACH_HANG,
                MA_NHOM_HANG = x.MA_NHOM_HANG,
                GIA_BAN = x.GIA_BAN,
                CHIET_KHAU_CM = x.CHIET_KHAU_CM,
                THOI_GIAN_AP_DUNG = x.THOI_GIAN_AP_DUNG,
                GHI_CHU = x.GHI_CHU,
            }).ToList();
            return result;
        }

        // PUT: api/Api_KhachHangPolicy/5
        [Route("api/Api_KhachHangPolicy/PutKH_POLICY/{id}")]
        public IHttpActionResult PutKH_POLICY(int id, KH_POLICY kH_POLICY)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != kH_POLICY.ID)
            {
                return BadRequest();
            }

            db.Entry(kH_POLICY).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KH_POLICYExists(id))
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

        // POST: api/Api_KhachHangPolicy
        [ResponseType(typeof(KH_POLICY))]
        public IHttpActionResult PostKH_POLICY(KH_POLICY kH_POLICY)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.KH_POLICY.Add(kH_POLICY);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = kH_POLICY.ID }, kH_POLICY);
        }

        // DELETE: api/Api_KhachHangPolicy/5
        [ResponseType(typeof(KH_POLICY))]
        public IHttpActionResult DeleteKH_POLICY(int id)
        {
            KH_POLICY kH_POLICY = db.KH_POLICY.Find(id);
            if (kH_POLICY == null)
            {
                return NotFound();
            }

            db.KH_POLICY.Remove(kH_POLICY);
            db.SaveChanges();

            return Ok(kH_POLICY);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KH_POLICYExists(int id)
        {
            return db.KH_POLICY.Count(e => e.ID == id) > 0;
        }
    }
}