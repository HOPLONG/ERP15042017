using ERP.Web.Models.Database;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace ERP.Web.Controllers
{
    public class BaoGiaController : Controller
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();
        // GET: BaoGia
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BH_BAO_GIA bH_BAO_GIA = db.BH_BAO_GIA.Find(id);
            if (bH_BAO_GIA == null)
            {
                return HttpNotFound();
            }
            return View(bH_BAO_GIA);
        }






        /// <summary>
        /// using partial view for pdf generation
        /// </summary>
        /// <returns></returns>
        public ActionResult DownloadBaoGiaPDF(string so_bao_gia, string macongty)
        {
            var query = db.Database.SqlQuery<Prod_BH_GetThongTinBaoGia_Result > ("Prod_BH_GetThongTinBaoGia @so_bao_gia, @macongty", new SqlParameter("so_bao_gia", so_bao_gia), new SqlParameter("macongty", macongty));
            var result = query.ToList();
            // var model = new GeneratePDFModel();
            

            return new Rotativa.PartialViewAsPdf("ViewBaoGiaPDF", result) { FileName = "partialViewAsPdf.pdf" };
        }
    }
}