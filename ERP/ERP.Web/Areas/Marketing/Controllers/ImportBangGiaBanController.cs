using ERP.Web.Models.Database;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Web.Areas.Marketing.Controllers
{
    public class ImportBangGiaBanController : Controller
    {
        // GET: Marketing/ImportBangGiaBan
        string mahang, manhomhang, series;
        decimal cksp1, cksp2, cksp3, giasp1, giasp2, giasp3, slmoq1, slmoq2, slmoq3, ckmoq1, ckmoq2, ckmoq3, giamoq1, giamoq2, giamoq3, ckseries1, ckseries2, ckseries3, giaseries1, giaseries2, giaseries3,
            cklistncc1_1, cklistncc1_2, cklistncc1_3, cklistncc2_1, cklistncc2_2, cklistncc2_3, cklistncc3_1, cklistncc3_2, cklistncc3_3, cklistncc4_1, cklistncc4_2, cklistncc4_3,
             gialistncc1_1, gialistncc1_2, gialistncc1_3, gialistncc2_1, gialistncc2_2, gialistncc2_3, gialistncc3_1, gialistncc3_2, gialistncc3_3, gialistncc4_1, gialistncc4_2, gialistncc4_3;

        #region ""
        public ActionResult ImportBangGia()
        {
            return View();
        }

        public ActionResult ImportBangGia(HttpPostedFileBase file)
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




                                    HH_BANG_GIA_BAN banggia = new HH_BANG_GIA_BAN();

                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    banggia.MA_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();


                                    db.TONKHO_HANG.Add(HH);

                                    db.SaveChanges();
                                    so_dong_thanh_cong++;
                                    dong = rowIterator - 1;
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

                return View("Import_Hanghoa");
            }
               
        }


        public ActionResult UpdateBangGia()
        {
            return View();
        }
    }
}