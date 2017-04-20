﻿using System;
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
using ERP.Web.Models.BusinessModel;
using ERP.Web.Models.NewModels;
using System.Web.Http.Results;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace ERP.Web.Api.BaoGia
{
    public class Api_ChiTietBaoGiaController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();
        XuLyNgayThang xlnt = new XuLyNgayThang();
        // GET: api/Api_ChiTietBaoGia
        [Route("api/Api_ChiTietBaoGia/CT_BAO_GIA/{so_bao_gia}")]
        public List<GetAll_ChiTietBaoGia_Result> CT_BAO_GIA(string so_bao_gia)
        {
            var query = db.Database.SqlQuery<GetAll_ChiTietBaoGia_Result>("GetAll_ChiTietBaoGia  @so_bao_gia, @ma_cong_ty", new SqlParameter("so_bao_gia", so_bao_gia),new SqlParameter("ma_cong_ty", "HOPLONG"));
            var result = query.ToList();
            return result;
        }

        // GET: api/Api_ChiTietBaoGia/5
        [ResponseType(typeof(BH_CT_BAO_GIA))]
        public IHttpActionResult GetBH_CT_BAO_GIA(int id)
        {
            BH_CT_BAO_GIA bH_CT_BAO_GIA = db.BH_CT_BAO_GIA.Find(id);
            if (bH_CT_BAO_GIA == null)
            {
                return NotFound();
            }

            return Ok(bH_CT_BAO_GIA);
        }

        // PUT: api/Api_ChiTietBaoGia/5
        [HttpPost]
        [Route("api/Api_ChiTietBaoGia/PutBH_CT_BAO_GIA")]
        public async Task<IHttpActionResult> PutBH_CT_BAO_GIA([FromBody] List<ChiTietBaoGia> bH_CT_BAO_GIA)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            //try
            //{
            foreach (var item in bH_CT_BAO_GIA)
            {
                var baogia = db.BH_CT_BAO_GIA.Where(x => x.ID == item.ID).FirstOrDefault();
                if (baogia != null)
                {
                    baogia.SO_BAO_GIA = item.SO_BAO_GIA;
                    baogia.MA_HANG = item.MA_HANG;
                    baogia.SO_LUONG = item.SO_LUONG;
                    baogia.DON_GIA = item.DON_GIA;
                    baogia.GIA_LIST = item.GIA_LIST;
                    baogia.DON_GIA_NHAP = item.DON_GIA_NHAP;
                    baogia.HE_SO_LOI_NHUAN = item.HE_SO_LOI_NHUAN;
                    baogia.CHIET_KHAU = item.CHIET_KHAU;
                    baogia.THANH_TIEN = item.THANH_TIEN;
                    baogia.THOI_GIAN_GIAO_HANG = item.THOI_GIAN_GIAO_HANG;
                    baogia.GHI_CHU = item.GHI_CHU;
                }
                else if (baogia == null)

                {
                    BH_CT_BAO_GIA newbaogia = new BH_CT_BAO_GIA();
                    newbaogia.SO_BAO_GIA = item.SO_BAO_GIA;
                    newbaogia.MA_HANG = item.MA_HANG;
                    newbaogia.SO_LUONG = item.SO_LUONG;
                    newbaogia.DON_GIA = item.DON_GIA;
                    newbaogia.CHIET_KHAU = item.CHIET_KHAU;
                    newbaogia.THANH_TIEN = item.THANH_TIEN;
                    newbaogia.GIA_LIST = item.GIA_LIST;
                    newbaogia.DON_GIA_NHAP = item.DON_GIA_NHAP;
                    newbaogia.HE_SO_LOI_NHUAN = item.HE_SO_LOI_NHUAN;
                    newbaogia.THOI_GIAN_GIAO_HANG = item.THOI_GIAN_GIAO_HANG;
                    newbaogia.GHI_CHU = item.GHI_CHU;
                    db.BH_CT_BAO_GIA.Add(newbaogia);
                }

            }
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {

                throw;

            }
            //return this.CreatedAtRoute("GetNH_NTTK", new { id = nH_NTTK.SO_CHUNG_TU }, nH_NTTK);
            return Ok(bH_CT_BAO_GIA);
        }

        // POST: api/Api_ChiTietBaoGia
        [ResponseType(typeof(BH_CT_BAO_GIA))]
        [Route("api/ApiChiTietBaoGia/PostKH_LIEN_HE")]
        public IHttpActionResult PostKH_LIEN_HE(List<ChiTietBaoGia> lh)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ModelState);
            }
            foreach (var item in lh)
            {
                BH_CT_BAO_GIA lienhe = new BH_CT_BAO_GIA();
                lienhe.SO_BAO_GIA = item.SO_BAO_GIA;
                lienhe.MA_HANG = item.MA_HANG;
                lienhe.MA_DIEU_CHINH = item.MA_DIEU_CHINH;
                lienhe.TEN_HANG = item.TEN_HANG;
                lienhe.HANG_SP = item.HANG_SP;
                lienhe.ITEM_CODE = item.ITEM_CODE;

                lienhe.SO_LUONG = item.SO_LUONG;
                lienhe.DVT = item.DVT;

                lienhe.DON_GIA = item.DON_GIA;
                lienhe.THANH_TIEN = item.THANH_TIEN;

                lienhe.THOI_GIAN_GIAO_HANG = item.THOI_GIAN_GIAO_HANG;
                lienhe.CHIET_KHAU = item.CHIET_KHAU;
                lienhe.GIA_LIST = item.GIA_LIST;
                lienhe.DON_GIA_NHAP = item.DON_GIA_NHAP;
                lienhe.HE_SO_LOI_NHUAN = item.HE_SO_LOI_NHUAN;
                lienhe.DON_GIA_BAO_DI_NET = item.DON_GIA_BAO_DI_NET;
                lienhe.CM = item.CM;
                lienhe.DON_GIA_MOI = item.DON_GIA_MOI;
                lienhe.THUE_TNDN = item.THUE_TNDN;
                lienhe.TIEN_THUE_TNDN = item.TIEN_THUE_TNDN;
                lienhe.KHACH_NHAN_DUOC = item.KHACH_NHAN_DUOC;
                lienhe.GHI_CHU = item.GHI_CHU;
                db.BH_CT_BAO_GIA.Add(lienhe);
              
                        
            }
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
               
                    throw;
            }

            return Ok("Thành công");
        }
    

        // DELETE: api/Api_ChiTietBaoGia/5
        [ResponseType(typeof(BH_CT_BAO_GIA))]
        public IHttpActionResult DeleteBH_CT_BAO_GIA(int id)
        {
            BH_CT_BAO_GIA bH_CT_BAO_GIA = db.BH_CT_BAO_GIA.Find(id);
            if (bH_CT_BAO_GIA == null)
            {
                return NotFound();
            }

            db.BH_CT_BAO_GIA.Remove(bH_CT_BAO_GIA);
            db.SaveChanges();

            return Ok(bH_CT_BAO_GIA);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BH_CT_BAO_GIAExists(int id)
        {
            return db.BH_CT_BAO_GIA.Count(e => e.ID == id) > 0;
        }
    }
}