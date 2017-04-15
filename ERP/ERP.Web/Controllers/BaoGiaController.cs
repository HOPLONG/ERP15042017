using ERP.Web.Models.Database;
using System;
using System.Collections.Generic;
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
    }
}