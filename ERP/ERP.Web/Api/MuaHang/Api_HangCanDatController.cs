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

namespace ERP.Web.Api.MuaHang
{
    public class Api_HangCanDatController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_HangCanDat
        public IQueryable<BH_DON_HANG_PO> GetBH_DON_HANG_PO()
        {
            return db.BH_DON_HANG_PO;
        }

        // GET: api/Api_HangCanDat/5
        [ResponseType(typeof(BH_DON_HANG_PO))]
        [Route("api/Api_HangCanDat/GetHangCanDat/{isadmin}/{purchase}")]
        public List<Prod_HangCanDat_Result> GetHangCanDat(bool isadmin,string purchase)
        {
            var query = db.Database.SqlQuery<Prod_HangCanDat_Result>("Prod_HangCanDat @macongty,@isadmin,@purchase", new SqlParameter("macongty", "HOPLONG"), new SqlParameter("isadmin", isadmin), new SqlParameter("purchase", purchase));
            var result = query.ToList();
            return result;
        }

        // PUT: api/Api_HangCanDat/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBH_DON_HANG_PO(string id, BH_DON_HANG_PO bH_DON_HANG_PO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bH_DON_HANG_PO.MA_SO_PO)
            {
                return BadRequest();
            }

            db.Entry(bH_DON_HANG_PO).State = EntityState.Modified;

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

        // POST: api/Api_HangCanDat
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

        // DELETE: api/Api_HangCanDat/5
        [ResponseType(typeof(BH_DON_HANG_PO))]
        public IHttpActionResult DeleteBH_DON_HANG_PO(string id)
        {
            BH_DON_HANG_PO bH_DON_HANG_PO = db.BH_DON_HANG_PO.Find(id);
            if (bH_DON_HANG_PO == null)
            {
                return NotFound();
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