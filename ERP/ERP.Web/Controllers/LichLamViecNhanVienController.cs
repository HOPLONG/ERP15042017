using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ERP.Web.Models.Database;

namespace ERP.Web.Controllers
{
    public class LichLamViecNhanVienController : Controller
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: LichLamViecNhanVien
        public ActionResult Index()
        {
            var nV_LICH_LAM_VIEC = db.NV_LICH_LAM_VIEC.Include(n => n.CCTC_NHAN_VIEN);
            return View(nV_LICH_LAM_VIEC.ToList());
        }

        // GET: LichLamViecNhanVien/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            NV_LICH_LAM_VIEC nV_LICH_LAM_VIEC = db.NV_LICH_LAM_VIEC.Find(id);
            if (nV_LICH_LAM_VIEC == null)
            {
                return HttpNotFound();
            }
            return View(nV_LICH_LAM_VIEC);
        }

        // GET: LichLamViecNhanVien/Create
        public ActionResult Create()
        {
            ViewBag.NHAN_VIEN_THUC_HIEN = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH");
            return View();
        }

        // POST: LichLamViecNhanVien/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,TIEU_DE_CONG_VIEC,NGAY_THUC_HIEN,NOI_DUNG_CONG_VIEC,DIA_DIEM_LAM_VIEC,NHAN_VIEN_THUC_HIEN,HUY_CONG_VIEC,TRANG_THAI,GHI_CHU")] NV_LICH_LAM_VIEC nV_LICH_LAM_VIEC)
        {
            if (ModelState.IsValid)
            {
                db.NV_LICH_LAM_VIEC.Add(nV_LICH_LAM_VIEC);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.NHAN_VIEN_THUC_HIEN = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH", nV_LICH_LAM_VIEC.NHAN_VIEN_THUC_HIEN);
            return View(nV_LICH_LAM_VIEC);
        }

        // GET: LichLamViecNhanVien/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            NV_LICH_LAM_VIEC nV_LICH_LAM_VIEC = db.NV_LICH_LAM_VIEC.Find(id);
            if (nV_LICH_LAM_VIEC == null)
            {
                return HttpNotFound();
            }
            ViewBag.NHAN_VIEN_THUC_HIEN = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH", nV_LICH_LAM_VIEC.NHAN_VIEN_THUC_HIEN);
            return View(nV_LICH_LAM_VIEC);
        }

        // POST: LichLamViecNhanVien/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,TIEU_DE_CONG_VIEC,NGAY_THUC_HIEN,NOI_DUNG_CONG_VIEC,DIA_DIEM_LAM_VIEC,NHAN_VIEN_THUC_HIEN,HUY_CONG_VIEC,TRANG_THAI,GHI_CHU")] NV_LICH_LAM_VIEC nV_LICH_LAM_VIEC)
        {
            if (ModelState.IsValid)
            {
                db.Entry(nV_LICH_LAM_VIEC).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.NHAN_VIEN_THUC_HIEN = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH", nV_LICH_LAM_VIEC.NHAN_VIEN_THUC_HIEN);
            return View(nV_LICH_LAM_VIEC);
        }

        // GET: LichLamViecNhanVien/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            NV_LICH_LAM_VIEC nV_LICH_LAM_VIEC = db.NV_LICH_LAM_VIEC.Find(id);
            if (nV_LICH_LAM_VIEC == null)
            {
                return HttpNotFound();
            }
            return View(nV_LICH_LAM_VIEC);
        }

        // POST: LichLamViecNhanVien/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            NV_LICH_LAM_VIEC nV_LICH_LAM_VIEC = db.NV_LICH_LAM_VIEC.Find(id);
            db.NV_LICH_LAM_VIEC.Remove(nV_LICH_LAM_VIEC);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
