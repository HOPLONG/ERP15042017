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

namespace ERP.Web.Api.HeThong
{
    public class Api_DonhangdukienController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_Donhangdukien
        [Route("api/Api_Donhangdukien/LocDonDuKien/{username}")]
        public List<GetAll_DonDuKienTheoSale_Result> LocDonDuKien(string username)
        {
            var query = db.Database.SqlQuery<GetAll_DonDuKienTheoSale_Result>("GetAll_DonDuKienTheoSale @macongty, @sale", new SqlParameter("macongty", "HOPLONG"), new SqlParameter("sale", username));
            var result = query.ToList();
            return result;
        }



        // GET: api/Api_Donhangdukien/5
        [ResponseType(typeof(BH_DON_HANG_DU_KIEN))]
        public IHttpActionResult GetBH_DON_HANG_DU_KIEN(string id)
        {
            BH_DON_HANG_DU_KIEN bH_DON_HANG_DU_KIEN = db.BH_DON_HANG_DU_KIEN.Find(id);
            if (bH_DON_HANG_DU_KIEN == null)
            {
                return NotFound();
            }

            return Ok(bH_DON_HANG_DU_KIEN);
        }

        // PUT: api/Api_Donhangdukien/5
        [ResponseType(typeof(void))]
        public void PutBH_DON_HANG_DU_KIEN(string id, BH_DON_HANG_DU_KIEN bH_DON_HANG_DU_KIEN)
        {
            var check = db.BH_DON_HANG_DU_KIEN.Where(x => x.MA_DU_KIEN == id);
            if (check.Count() > 0)
            {
                var resultupdate = check.FirstOrDefault();
                resultupdate.THANH_CONG = bH_DON_HANG_DU_KIEN.THANH_CONG;
                resultupdate.THAT_BAI = bH_DON_HANG_DU_KIEN.THAT_BAI;
                resultupdate.LY_DO_THAT_BAI = bH_DON_HANG_DU_KIEN.LY_DO_THAT_BAI;
                db.SaveChanges();
            }
        }
           

        // POST: api/Api_Donhangdukien
        [ResponseType(typeof(BH_DON_HANG_DU_KIEN))]
        public IHttpActionResult PostBH_DON_HANG_DU_KIEN(BH_DON_HANG_DU_KIEN bH_DON_HANG_DU_KIEN)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BH_DON_HANG_DU_KIEN.Add(bH_DON_HANG_DU_KIEN);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (BH_DON_HANG_DU_KIENExists(bH_DON_HANG_DU_KIEN.MA_DU_KIEN))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = bH_DON_HANG_DU_KIEN.MA_DU_KIEN }, bH_DON_HANG_DU_KIEN);
        }

        // DELETE: api/Api_Donhangdukien/5
        [ResponseType(typeof(BH_DON_HANG_DU_KIEN))]
        public void DeleteBH_DON_HANG_DU_KIEN(string id)
        {
            var check = db.BH_DON_HANG_DU_KIEN.Where(x => x.MA_DU_KIEN == id);
            if (check.Count() > 0)
            {
                var resultdelete = check.FirstOrDefault();
                db.BH_DON_HANG_DU_KIEN.Remove(resultdelete);
                db.SaveChanges();
            }
            
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BH_DON_HANG_DU_KIENExists(string id)
        {
            return db.BH_DON_HANG_DU_KIEN.Count(e => e.MA_DU_KIEN == id) > 0;
        }
    }
}