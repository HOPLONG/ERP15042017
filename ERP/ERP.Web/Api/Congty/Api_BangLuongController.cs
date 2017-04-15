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
using ERP.Web.Models;

namespace ERP.Web.Api.HeThong
{
    public class Api_BangLuongController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_BangLuong
        public List<Bangluong> GetCCTC_BANG_LUONG(string id)
        {
            List<Bangluong> listbangluong = new List<Bangluong>();
            var vData = db.CCTC_BANG_LUONG.Where(x => x.USERNAME == id);
            foreach (var item in vData)
            {
                Bangluong bl = new Bangluong();
                bl.THANG_LUONG = item.THANG_LUONG;
                bl.USERNAME = item.USERNAME;
                bl.LUONG_CO_BAN = string.Format("{0:#,##0.##}", item.LUONG_CO_BAN);
                bl.LUONG_BAO_HIEM = String.Format("{0:#,##0.##}", item.LUONG_BAO_HIEM);
                bl.PHU_CAP_AN_TRUA = String.Format("{0:#,##0.##}", item.PHU_CAP_AN_TRUA);
                bl.PHU_CAP_DI_LAI_DIEN_THOAI = String.Format("{0:#,##0.##}", item.PHU_CAP_DI_LAI_DIEN_THOAI);
                bl.PHU_CAP_THUONG_DOANH_SO = String.Format("{0:#,##0.##}", item.PHU_CAP_THUONG_DOANH_SO);
                bl.PHU_CAP_TRACH_NHIEM = String.Format("{0:#,##0.##}", item.PHU_CAP_TRACH_NHIEM);
                bl.CONG_CO_BAN = String.Format("{0:#,##0.##}", item.CONG_CO_BAN);
                bl.LUONG_CO_BAN_NGAY = String.Format("{0:#,##0.##}", item.CONG_CO_BAN);
                bl.LUONG_CO_BAN_GIO = String.Format("{0:#,##0.##}", item.LUONG_CO_BAN_GIO);
                bl.BAO_HIEM_CONG_TY_DONG = String.Format("{0:#,##0.##}", item.BAO_HIEM_CONG_TY_DONG);
                bl.BAO_HIEM_NHAN_VIEN_DONG = String.Format("{0:#,##0.##}", item.BAO_HIEM_NHAN_VIEN_DONG);
                bl.LUONG_THUC_TE_CONG_LAM_THUC = String.Format("{0:#,##0.##}", item.LUONG_THUC_TE_CONG_LAM_THUC);
                bl.LUONG_THUC_TE_SO_TIEN = String.Format("{0:#,##0.##}", item.LUONG_THUC_TE_SO_TIEN);
                bl.LUONG_LAM_THEM_CONG_NGAY_THUONG = String.Format("{0:#,##0.##}", item.LUONG_LAM_THEM_CONG_NGAY_THUONG);
                bl.LUONG_LAM_THEM_TIEN_CONG_NGAY_THUONG = String.Format("{0:#,##0.##}", item.LUONG_LAM_THEM_TIEN_CONG_NGAY_THUONG);
                bl.LUONG_LAM_THEM_CONG_NGAY_NGHI = String.Format("{0:#,##0.##}", item.LUONG_LAM_THEM_CONG_NGAY_NGHI);
                bl.LUONG_LAM_THEM_TIEN_CONG_NGAY_NGHI = String.Format("{0:#,##0.##}", item.LUONG_LAM_THEM_TIEN_CONG_NGAY_NGHI);
                bl.LUONG_LAM_THEM_CONG_NGAY_LE = String.Format("{0:#,##0.##}", item.LUONG_LAM_THEM_CONG_NGAY_LE);
                bl.LUONG_LAM_THEM_TIEN_CONG_NGAY_LE = String.Format("{0:#,##0.##}", item.LUONG_LAM_THEM_TIEN_CONG_NGAY_LE);
                bl.TONG_THU_NHAP = String.Format("{0:#,##0.##}", item.TONG_THU_NHAP);
                bl.TAM_UNG = String.Format("{0:#,##0.##}", item.TAM_UNG);
                bl.VAY_TIN_DUNG = String.Format("{0:#,##0.##}", item.VAY_TIN_DUNG);
                bl.GIO_DI_TRE = String.Format("{0:N2}", item.GIO_DI_TRE);
                bl.PHAT_DI_TRE = String.Format("{0:#,##0.##}", item.PHAT_DI_TRE);
                bl.CONG_DOAN = String.Format("{0:#,##0.##}", item.CONG_DOAN);
                bl.LUONG_LAO_CONG = String.Format("{0:#,##0.##}", item.LUONG_LAO_CONG);
                bl.THUC_LINH = String.Format("{0:#,##0.##}", item.THUC_LINH);
                listbangluong.Add(bl);
            }
            var result = listbangluong.ToList();
            return result;
        }

        // GET: api/Api_BangLuong/5
        [ResponseType(typeof(CCTC_BANG_LUONG))]
        public IHttpActionResult GetCCTC_BANG_LUONG()
        {
            CCTC_BANG_LUONG cCTC_BANG_LUONG = db.CCTC_BANG_LUONG.Find();
            if (cCTC_BANG_LUONG == null)
            {
                return NotFound();
            }

            return Ok(cCTC_BANG_LUONG);
        }

        // PUT: api/Api_BangLuong/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCCTC_BANG_LUONG(string id, CCTC_BANG_LUONG cCTC_BANG_LUONG)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cCTC_BANG_LUONG.THANG_LUONG)
            {
                return BadRequest();
            }

            db.Entry(cCTC_BANG_LUONG).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CCTC_BANG_LUONGExists(id))
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

        // POST: api/Api_BangLuong
        [ResponseType(typeof(CCTC_BANG_LUONG))]
        public IHttpActionResult PostCCTC_BANG_LUONG(CCTC_BANG_LUONG cCTC_BANG_LUONG)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CCTC_BANG_LUONG.Add(cCTC_BANG_LUONG);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CCTC_BANG_LUONGExists(cCTC_BANG_LUONG.THANG_LUONG))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = cCTC_BANG_LUONG.THANG_LUONG }, cCTC_BANG_LUONG);
        }

        // DELETE: api/Api_BangLuong/5
        [ResponseType(typeof(CCTC_BANG_LUONG))]
        public IHttpActionResult DeleteCCTC_BANG_LUONG(string id)
        {
            CCTC_BANG_LUONG cCTC_BANG_LUONG = db.CCTC_BANG_LUONG.Find(id);
            if (cCTC_BANG_LUONG == null)
            {
                return NotFound();
            }

            db.CCTC_BANG_LUONG.Remove(cCTC_BANG_LUONG);
            db.SaveChanges();

            return Ok(cCTC_BANG_LUONG);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CCTC_BANG_LUONGExists(string id)
        {
            return db.CCTC_BANG_LUONG.Count(e => e.THANG_LUONG == id) > 0;
        }
    }
}