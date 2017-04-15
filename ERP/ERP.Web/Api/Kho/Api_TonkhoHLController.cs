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
using System.Data.SqlClient;

namespace ERP.Web.Areas.HopLong.Api.Kho
{
    public class Api_TonKhoHLController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        [Route("api/Api_TonKhoHL/GetHH_TON_KHO/{id}")]
        public List<HopLong_DS_TONKHO_Result> GetHH_TON_KHO(string id)
        {
            var query = db.Database.SqlQuery<HopLong_DS_TONKHO_Result>("HopLong_DS_TONKHO @MA_CHUAN", new SqlParameter("MA_CHUAN", id));
            var result = query.ToList();
            return result;
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