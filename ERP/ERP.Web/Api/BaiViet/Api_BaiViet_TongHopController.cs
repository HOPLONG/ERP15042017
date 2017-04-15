using ERP.Web.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ERP.Web.Api.BaiViet
{
    public class Api_BaiViet_TongHopController : ApiController
    {

        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();
        [Route("api/Api_BaiViet_TongHop/GetThongBaoKinhDoanh")]
        public List<Get_BaiViet_ThongBaoKinhDoanh_Result> GetThongBaoKinhDoanh()
        {
            var query = db.Database.SqlQuery<Get_BaiViet_ThongBaoKinhDoanh_Result>("Get_BaiViet_ThongBaoKinhDoanh");
            var data = query.ToList();
            return data;
        }
    }
}
