using ERP.Web.Models.BusinessModel;
using ERP.Web.Models.Database;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Web.Areas.Settings.Controllers
{
    public class ImportBangLuongController : Controller
    {
        // GET: Settings/ImportBangLuong
        XuLyNgayThang xulydate = new XuLyNgayThang();
        int so_dong_thanh_cong;
        int dong;
        ERP_DATABASEEntities db = new ERP_DATABASEEntities();
        // GET: HopLong/ImportExcel

        #region "Import Bảng chấm công"
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(FormCollection formCollection)
        {
            try
            {
                if (Request != null)
                {
                    HttpPostedFileBase file = Request.Files["UploadedFile"];
                    if ((file != null) && (file.ContentLength > 0) && !string.IsNullOrEmpty(file.FileName))
                    {
                        string fileName = file.FileName;
                        string fileContentType = file.ContentType;
                        byte[] fileBytes = new byte[file.ContentLength];
                        var data = file.InputStream.Read(fileBytes, 0, Convert.ToInt32(file.ContentLength));
                        //var usersList = new List<Users>();
                        using (var package = new ExcelPackage(file.InputStream))
                        {
                            var currentSheet = package.Workbook.Worksheets;
                            var workSheet = currentSheet.First();
                            var noOfCol = workSheet.Dimension.End.Column;
                            var noOfRow = workSheet.Dimension.End.Row;
                            for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                            {
                                CCTC_BANG_LUONG bl = new CCTC_BANG_LUONG();
                                bl.THANG_LUONG = workSheet.Cells[rowIterator, 15].Value.ToString();
                                bl.USERNAME = workSheet.Cells[rowIterator, 3].Value.ToString();
                                bl.LUONG_CO_BAN = Convert.ToDecimal(workSheet.Cells[rowIterator, 4].Value);
                                bl.LUONG_BAO_HIEM = Convert.ToDecimal(workSheet.Cells[rowIterator, 5].Value);
                                bl.PHU_CAP_AN_TRUA = Convert.ToDecimal(workSheet.Cells[rowIterator, 13].Value);
                                db.CCTC_BANG_LUONG.Add(bl);
                                db.SaveChanges();
                                so_dong_thanh_cong++;
                                dong = rowIterator;
                            }
                        }
                    }
                }
            }
            catch (Exception Ex)
            {
                ViewBag.Error = " Đã xảy ra lỗi, Liên hệ ngay với admin. " + Environment.NewLine + " Thông tin chi tiết về lỗi:" + Environment.NewLine + Ex;
                ViewBag.Information = "Lỗi tại dòng thứ: " + dong;

            }
            finally
            {
                ViewBag.Message = "Đã import thành công " + so_dong_thanh_cong + " dòng";
            }
            return View();
        }
        #endregion
    }
}