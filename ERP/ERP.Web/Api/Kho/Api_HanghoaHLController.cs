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
using System.Dynamic;
using System.Web.Routing;
using System.Data.SqlClient;

namespace ERP.Web.Areas.HopLong.Api.Kho
{
    public class Api_HanghoaHLController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        //int page_size = 30;
     
        
        // GET: api/Api_HanghoaHL
        [Route("api/Api_HanghoaHL/TimKiemHH/{ma_chuan}")]
        public List<HH> TimKiemHH(string ma_chuan)
        {
            // var vData = db.HHs.Where(x => x.MA_NHOM_HANG == ma_chuan);
            var query = db.Database.SqlQuery<HH>("XL_TimKiemHangHoa @tukhoa", new SqlParameter("tukhoa", ma_chuan));


            var result = query.ToList().Select(x => new HH()
            {
                MA_HANG = x.MA_HANG,
                TEN_HANG = x.TEN_HANG,
                MA_NHOM_HANG = x.MA_NHOM_HANG,
                GIA_NHAP = x.GIA_NHAP,
                THONG_SO = x.THONG_SO,
                MA_CHUAN = x.MA_CHUAN,
                MA_NHAP_HANG = x.MA_NHAP_HANG,
                DISCONTINUE = x.DISCONTINUE,
                MA_CHUYEN_DOI = x.MA_CHUYEN_DOI,
                GIA_LIST = x.GIA_LIST,
                DON_VI_TINH = x.DON_VI_TINH,
                KHOI_LUONG = x.KHOI_LUONG,
                XUAT_XU = x.XUAT_XU,
                BAO_HANH = x.BAO_HANH,
                THONG_SO_KY_THUAT = x.THONG_SO_KY_THUAT,
                QUY_CACH_DONG_GOI = x.QUY_CACH_DONG_GOI,
                HINH_ANH = x.HINH_ANH,
                GHI_CHU = x.GHI_CHU,
                TK_HACH_TOAN_KHO = x.TK_HACH_TOAN_KHO,
                TK_DOANH_THU = x.TK_DOANH_THU,
                TK_CHI_PHI = x.TK_CHI_PHI
            }).ToList();
            return result;
        }


        [Route("api/Api_HanghoaHL/GetAllHH/{ma_nhom_hang}")]
        public List<HH> GetAllHH( string ma_nhom_hang)
        {
                var vData = db.HHs.Where(x => x.MA_NHOM_HANG == ma_nhom_hang).Take(50);

            var result  = vData.ToList().Select(x => new HH()
                {
                    MA_HANG = x.MA_HANG,
                    TEN_HANG = x.TEN_HANG,
                    MA_NHOM_HANG = x.MA_NHOM_HANG,
                    GIA_NHAP = x.GIA_NHAP,
                    THONG_SO = x.THONG_SO,
                    MA_CHUAN = x.MA_CHUAN,
                    MA_NHAP_HANG = x.MA_NHAP_HANG,
                    DISCONTINUE = x.DISCONTINUE,
                    MA_CHUYEN_DOI = x.MA_CHUYEN_DOI,
                    GIA_LIST = x.GIA_LIST,
                    DON_VI_TINH = x.DON_VI_TINH,
                    KHOI_LUONG = x.KHOI_LUONG,
                    XUAT_XU = x.XUAT_XU,
                    BAO_HANH = x.BAO_HANH,
                    THONG_SO_KY_THUAT = x.THONG_SO_KY_THUAT,
                    QUY_CACH_DONG_GOI = x.QUY_CACH_DONG_GOI,
                    HINH_ANH = x.HINH_ANH,
                    GHI_CHU = x.GHI_CHU,
                    TK_HACH_TOAN_KHO = x.TK_HACH_TOAN_KHO,
                    TK_DOANH_THU = x.TK_DOANH_THU,
                    TK_CHI_PHI = x.TK_CHI_PHI
                }).ToList();
            
            
            return result;
        }

       
        // GET: api/Api_HanghoaHL/5
        [ResponseType(typeof(HH))]
        public IHttpActionResult GetHH(string id)
        {
            HH Hh = db.HHs.Find(id);
            if (Hh == null)
            {
                return NotFound();
            }

            return Ok(Hh);
        }

        // PUT: api/Api_HanghoaHL/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDM_HANG_HOA(string id, HH Hh)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Hh.MA_HANG)
            {
                return BadRequest();
            }

            db.Entry(Hh).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DM_HANG_HOAExists(id))
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

        // POST: api/Api_HanghoaHL
        [ResponseType(typeof(HH))]
        public IHttpActionResult PostHH(HH Hh)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.HHs.Add(Hh);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (DM_HANG_HOAExists(Hh.MA_HANG))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = Hh.MA_HANG }, Hh);
        }

        // DELETE: api/Api_HanghoaHL/5
        [ResponseType(typeof(HH))]
        public IHttpActionResult DeleteDM_HANG_HOA(string id)
        {
            HH Hh = db.HHs.Find(id);
            if (Hh == null)
            {
                return NotFound();
            }

            db.HHs.Remove(Hh);
            db.SaveChanges();

            return Ok(Hh);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DM_HANG_HOAExists(string id)
        {
            return db.HHs.Count(e => e.MA_HANG == id) > 0;
        }
    }
}