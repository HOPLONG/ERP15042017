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
using System.Text.RegularExpressions;
using ERP.Web.Models.NewModels.XuatKho;
using ERP.Web.Common;
using ERP.Web.Security;
using ERP.Web.Models.NewModels.All;
using ERP.Web.Controllers;
using System.Data.SqlClient;

namespace ERP.Web.Api.Kho
{
    public class Api_XuatKhoController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_XuatKho
        [Route("api/Api_XuatKho/GetDSPhieuXuatKho")]
        public List<GetAll_DS_PhieuXuatKho_NoDate_Result> GetDSPhieuXuatKho()
        {
            var query = db.Database.SqlQuery<GetAll_DS_PhieuXuatKho_NoDate_Result>("GetAll_DS_PhieuXuatKho_NoDate @macongty", new SqlParameter("macongty", "HOPLONG"));
            return query.ToList();
        }

        // GET: api/Api_XuatKho/5
        [ResponseType(typeof(KHO_XUAT_KHO))]
        public IHttpActionResult GetKHO_XUAT_KHO(string id)
        {
            KHO_XUAT_KHO kHO_XUAT_KHO = db.KHO_XUAT_KHO.Find(id);
            if (kHO_XUAT_KHO == null)
            {
                return NotFound();
            }

            return Ok(kHO_XUAT_KHO);
        }

        // PUT: api/Api_XuatKho/5
        [Route("api/Api_XuatKho/PutKHO_XUAT_KHO")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutKHO_XUAT_KHO(XuatKho kho_xuatkho)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Lưu thông tin nhập kho
            var xk = db.KHO_XUAT_KHO.Where(x => x.SO_CHUNG_TU == kho_xuatkho.SO_CHUNG_TU).FirstOrDefault();

            xk.NGAY_CHUNG_TU = GeneralFunction.ConvertToTime(kho_xuatkho.NGAY_CHUNG_TU);
            xk.NGAY_HACH_TOAN = GeneralFunction.ConvertToTime(kho_xuatkho.NGAY_HACH_TOAN);
            xk.SO_CHUNG_TU = kho_xuatkho.SO_CHUNG_TU;
            xk.NGUOI_NHAN = kho_xuatkho.NGUOI_NHAN;
            xk.KHACH_HANG = kho_xuatkho.KHACH_HANG;
            xk.NGUOI_LAP_PHIEU = kho_xuatkho.NGUOI_LAP_PHIEU;

            xk.TRUC_THUOC = "HOPLONG";

            xk.LOAI_XUAT_KHO = kho_xuatkho.LOAI_XUAT_KHO;

            //Lưu thông tin tham chiếu
            if (kho_xuatkho.ThamChieu.Count > 0)
            {
                foreach (ThamChieu item in kho_xuatkho.ThamChieu)
                {
                    var newItem = db.XL_THAM_CHIEU_CHUNG_TU.Where(x => x.SO_CHUNG_TU_GOC == xk.SO_CHUNG_TU).FirstOrDefault();
                    if (newItem != null)
                    {
                        //newItem.SO_CHUNG_TU_GOC = xk.SO_CHUNG_TU;
                        newItem.SO_CHUNG_TU_THAM_CHIEU = item.SO_CHUNG_TU;
                    }
         
                }
            }
            //Lưu chi tiết
            decimal tongtien = 0;
            //TONKHO_HOPLONG HHTon = new TONKHO_HOPLONG();
            //HH_NHOM_VTHH NhomHang = new HH_NHOM_VTHH();
            if (kho_xuatkho.ChiTietPX != null && kho_xuatkho.ChiTietPX.Count > 0)
            {
                foreach (ChiTietPhieuXuatKho item in kho_xuatkho.ChiTietPX)
                {
                    var newItem = db.KHO_CT_XUAT_KHO.Where(x => x.SO_CHUNG_TU == xk.SO_CHUNG_TU).FirstOrDefault();
                    int sl_cu = newItem.SO_LUONG;
                    if (newItem != null)
                    {
                        newItem.SO_CHUNG_TU = xk.SO_CHUNG_TU;
                        newItem.MA_HANG = item.MA_HANG;
                        newItem.TK_CO = item.TK_CO;
                        newItem.TK_NO = item.TK_NO;
                        newItem.DVT = item.DVT;
                        newItem.DON_GIA_BAN = Convert.ToDecimal(item.DON_GIA_BAN);
                        newItem.DON_GIA_VON = Convert.ToDecimal(item.DON_GIA_VON);
                        newItem.SO_LUONG = Convert.ToInt32(item.SO_LUONG);
                        newItem.THANH_TIEN = newItem.DON_GIA_BAN * newItem.SO_LUONG;
                        tongtien += newItem.THANH_TIEN;
                        newItem.TK_KHO = item.TK_KHO;
                    }
                    
                    //Cập nhật hàng tồn
                    TONKHO_HOPLONG newHangTon = db.TONKHO_HOPLONG.Where(x => x.MA_HANG == item.MA_HANG).FirstOrDefault();
                    newHangTon.SL_HOPLONG = newHangTon.SL_HOPLONG + sl_cu;
                    if (newHangTon == null || newHangTon.SL_HOPLONG < item.SO_LUONG)
                    {
                        return BadRequest("Hàng không có trong kho hoặc SL tồn không đủ");
                    }
                    else
                    newHangTon.SL_HOPLONG -= Convert.ToInt32(item.SO_LUONG);
                    //if (newHangTon == null)
                    //{
                    //    db.TONKHO_HOPLONG.Add(newHangTon);
                    //}
                    ////Cập nhật nhóm hàng
                    //TONKHO_HANG hangton = NhomHang.GetNhomHang(item.MaHang);
                    //if (hangton != null)
                    //{
                    //    hangton.SL_HANG = Convert.ToInt32(item.SoLuong);
                    //}


                }
            }
            //Lưu chi tiết
            decimal tt = 0;
            //TONKHO_HOPLONG HHTon = new TONKHO_HOPLONG();
            //HH_NHOM_VTHH NhomHang = new HH_NHOM_VTHH();
            if (kho_xuatkho.ChiTietPX != null && kho_xuatkho.ChiTietPX.Count > 0)
            {
                foreach (ChiTietPhieuXuatKho item in kho_xuatkho.ChiTietPX)
                {
                    var newItem = db.KHO_CT_XUAT_KHO.Where(x => x.SO_CHUNG_TU == xk.SO_CHUNG_TU).FirstOrDefault();
                    int sl_cu = newItem.SO_LUONG;
                    if (newItem != null)
                    {
                        newItem.SO_CHUNG_TU = xk.SO_CHUNG_TU;
                        newItem.MA_HANG = item.MA_HANG;
                        newItem.TK_CO = item.TK_CO;
                        newItem.TK_NO = item.TK_NO;
                        newItem.DVT = item.DVT;
                        newItem.DON_GIA_BAN = Convert.ToDecimal(item.DON_GIA_BAN);
                        newItem.DON_GIA_VON = Convert.ToDecimal(item.DON_GIA_VON);
                        newItem.SO_LUONG = Convert.ToInt32(item.SO_LUONG);
                        newItem.THANH_TIEN = newItem.DON_GIA_BAN * newItem.SO_LUONG;
                        tongtien += newItem.THANH_TIEN;
                        newItem.TK_KHO = item.TK_KHO;
                    }

                    //Cập nhật hàng tồn
                    TONKHO_HOPLONG newHangTon = db.TONKHO_HOPLONG.Where(x => x.MA_HANG == item.MA_HANG).FirstOrDefault();
                    newHangTon.SL_HOPLONG = newHangTon.SL_HOPLONG + sl_cu;
                    if (newHangTon == null || newHangTon.SL_HOPLONG < item.SO_LUONG)
                    {
                        return BadRequest("Hàng không có trong kho hoặc SL tồn không đủ");
                    }
                    else
                        newHangTon.SL_HOPLONG -= Convert.ToInt32(item.SO_LUONG);
                    //if (newHangTon == null)
                    //{
                    //    db.TONKHO_HOPLONG.Add(newHangTon);
                    //}
                    ////Cập nhật nhóm hàng
                    //TONKHO_HANG hangton = NhomHang.GetNhomHang(item.MA_HANG);
                    //if (hangton != null)
                    //{
                    //    hangton.SL_HANG = Convert.ToInt32(item.SO_LUONG);
                    //}

                }
            }

            xk.TONG_TIEN = tt;


            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
      
                
                    throw;
                

            }

            return Ok(xk.SO_CHUNG_TU);
        }
    
        public string GeneralChungTu()
        {
            Regex digitsOnly = new Regex(@"[^\d]");
            string SoChungTu = (from nhapkho in db.KHO_XUAT_KHO where nhapkho.SO_CHUNG_TU.Contains("XK") select nhapkho.SO_CHUNG_TU).Max();
            string year = DateTime.Now.Year.ToString().Substring(2, 2);
            string month = DateTime.Now.Month.ToString();
            if (month.Length == 1)
            {
                month = "0" + month;
            }
            if (SoChungTu == null)
            {
                return "XK" + year + month + "00001";
            }
            SoChungTu = SoChungTu.Substring(6, SoChungTu.Length - 6);
            string number = (Convert.ToInt32(digitsOnly.Replace(SoChungTu, "")) + 1).ToString();
            string result = number.ToString();
            int count = 5 - number.ToString().Length;
            for (int i = 0; i < count; i++)
            {
                result = "0" + result;
            }
            return "XK" + year + month + result;
        }

        // POST: api/Api_XuatKho
        [Route("api/Api_XuatKho/")]
        [ResponseType(typeof(KHO_XUAT_KHO))]

        public IHttpActionResult PostKHO_XUAT_KHO(XuatKho kho_xuatkho)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            //Lưu thông tin nhập kho
            KHO_XUAT_KHO xk = new KHO_XUAT_KHO();
            xk.NGAY_CHUNG_TU = GeneralFunction.ConvertToTime(kho_xuatkho.NGAY_CHUNG_TU);
            xk.NGAY_HACH_TOAN = GeneralFunction.ConvertToTime(kho_xuatkho.NGAY_HACH_TOAN);
            xk.SO_CHUNG_TU = GeneralChungTu();
            xk.NGUOI_NHAN = kho_xuatkho.NGUOI_NHAN;
            xk.KHACH_HANG = kho_xuatkho.KHACH_HANG;

            xk.NGUOI_LAP_PHIEU = kho_xuatkho.NGUOI_LAP_PHIEU;
            xk.TRUC_THUOC = "HOPLONG";

            xk.LOAI_XUAT_KHO = kho_xuatkho.LOAI_XUAT_KHO;
            db.KHO_XUAT_KHO.Add(xk);

            //Lưu thông tin tham chiếu
            if (kho_xuatkho.ThamChieu.Count > 0)
            {
                foreach (ThamChieu item in kho_xuatkho.ThamChieu)
                {
                    XL_THAM_CHIEU_CHUNG_TU newItem = new XL_THAM_CHIEU_CHUNG_TU();
                    newItem.SO_CHUNG_TU_GOC = xk.SO_CHUNG_TU;
                    newItem.SO_CHUNG_TU_THAM_CHIEU = item.SO_CHUNG_TU;
                    db.XL_THAM_CHIEU_CHUNG_TU.Add(newItem);
                }
            }
            //Lưu chi tiết
            decimal tongtien = 0;
            //TONKHO_HOPLONG HHTon = new TONKHO_HOPLONG();
            //HH_NHOM_VTHH NhomHang = new HH_NHOM_VTHH();
            if (kho_xuatkho.ChiTiet != null && kho_xuatkho.ChiTiet.Count > 0)
            {
                foreach (ChiTietXuatKho item in kho_xuatkho.ChiTiet)
                {
                    KHO_CT_XUAT_KHO newItem = new KHO_CT_XUAT_KHO();
                    newItem.SO_CHUNG_TU = xk.SO_CHUNG_TU;
                    newItem.MA_HANG = item.MA_HANG;
                    newItem.TK_CO = item.TK_CO;
                    newItem.TK_NO = item.TK_NO;
                    newItem.DVT = item.DVT;
                    newItem.DON_GIA_BAN = Convert.ToDecimal(item.DON_GIA);
                    newItem.DON_GIA_VON = Convert.ToDecimal(item.DON_GIA_VON);
                    newItem.SO_LUONG = Convert.ToInt32(item.SO_LUONG);
                    newItem.THANH_TIEN = newItem.DON_GIA_BAN * newItem.SO_LUONG;
                    tongtien += newItem.THANH_TIEN;
                    newItem.TK_KHO = item.TK_KHO;
                    db.KHO_CT_XUAT_KHO.Add(newItem);
                    //Cập nhật hàng tồn
                    TONKHO_HOPLONG newHangTon = db.TONKHO_HOPLONG.Where(x => x.MA_HANG == item.MA_HANG).FirstOrDefault();
                    if (newHangTon == null || newHangTon.SL_HOPLONG < item.SO_LUONG)
                    {
                        return BadRequest("Hàng không có trong kho hoặc SL tồn không đủ");
                    }
                    newHangTon.SL_HOPLONG -= Convert.ToInt32(item.SO_LUONG);
                    //if (newHangTon == null)
                    //{
                    //    db.TONKHO_HOPLONG.Add(newHangTon);
                    //}
                    ////Cập nhật nhóm hàng
                    //TONKHO_HANG hangton = NhomHang.GetNhomHang(item.MA_HANG);
                    //if (hangton != null)
                    //{
                    //    hangton.SL_HANG = Convert.ToInt32(item.SO_LUONG);
                    //}

                }
            }

            xk.TONG_TIEN = tongtien;
            


            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (KHO_XUAT_KHOExists(kho_xuatkho.SO_CHUNG_TU))
                {
                    return Conflict();
                }
                else

                    throw;

            }


            return Ok(xk.SO_CHUNG_TU);
            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateException)
            //{
            //    if (KHO_XUAT_KHOExists(kho_xuatkho.SO_CHUNG_TU))
            //    {
            //        return Conflict();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return Ok(xk.SO_CHUNG_TU);
        }

        // DELETE: api/Api_XuatKho/5
        [ResponseType(typeof(KHO_XUAT_KHO))]
        public IHttpActionResult DeleteKHO_XUAT_KHO(string id)
        {
            KHO_XUAT_KHO kHO_XUAT_KHO = db.KHO_XUAT_KHO.Find(id);
            if (kHO_XUAT_KHO == null)
            {
                return NotFound();
            }

            db.KHO_XUAT_KHO.Remove(kHO_XUAT_KHO);
            db.SaveChanges();

            return Ok(kHO_XUAT_KHO);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KHO_XUAT_KHOExists(string id)
        {
            return db.KHO_XUAT_KHO.Count(e => e.SO_CHUNG_TU == id) > 0;
        }
    }
}