using ERP.Web.Models.Database;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Web.Controllers.ControllerVietThem
{
    public class ControllerVietThemController : Controller
    {
        // GET: ControllerVietThem
        int so_dong_thanh_cong, that_bai;
        int dong;
        


        #region "Update Hàng Hóa"
        public ActionResult UpdateMaHang()
        {
            return View();
        }

        
        [HttpPost]
        public ActionResult UpdateMaHang(HttpPostedFileBase file)
        {
            using (var db = new ERP_DATABASEEntities())
            {
                try
                {
                    if (Request != null)
                    {
                        HttpPostedFileBase filetonkho = Request.Files["UploadedFile"];
                        if ((filetonkho != null) && (filetonkho.ContentLength > 0) && !string.IsNullOrEmpty(filetonkho.FileName))
                        {
                            string fileName = filetonkho.FileName;
                            string fileContentType = filetonkho.ContentType;
                            byte[] fileBytes = new byte[filetonkho.ContentLength];
                            var data = filetonkho.InputStream.Read(fileBytes, 0, Convert.ToInt32(filetonkho.ContentLength));
                            //var usersList = new List<Users>();
                            using (var package = new ExcelPackage(filetonkho.InputStream))
                            {
                                var currentSheet = package.Workbook.Worksheets;
                                var workSheet = currentSheet.First();
                                var noOfCol = workSheet.Dimension.End.Column;
                                var noOfRow = workSheet.Dimension.End.Row;
                                for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                                {

                                    var mahang = workSheet.Cells[rowIterator, 3].Value.ToString();
                                    var hanghoa = db.HHs.Where(x => x.MA_HANG == mahang).FirstOrDefault();
                                    if (hanghoa != null)
                                    {

                                        if (workSheet.Cells[rowIterator, 2].Value != null)
                                            hanghoa.MA_HANG = workSheet.Cells[rowIterator, 2].Value.ToString();

                                        so_dong_thanh_cong++;
                                    }
                                    else
                                    {
                                        that_bai = rowIterator - 1;
                                    }
                                    db.SaveChanges();

                                    //dong = rowIterator;
                                }

                            }
                        }
                    }
                }
                catch (Exception Ex)
                {
                    ViewBag.Error = " Đã xảy ra lỗi, Liên hệ ngay với admin. " + Environment.NewLine + " Thông tin chi tiết về lỗi:" + Environment.NewLine + Ex;
                    //ViewBag.Information = "Lỗi tại dòng thứ: " + dong;

                }
                finally
                {
                    ViewBag.Message = "Đã import thành công " + so_dong_thanh_cong + " dòng";
                    ViewBag.Dongloi = "dòng lỗi: " + that_bai;
                }

                return View("UpdateMaHang");
            }
               
        }

        #endregion
    }
}