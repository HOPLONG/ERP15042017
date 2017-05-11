using ERP.Web.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Web.Models.NewModels.BaoGiaAll
{
    public class BaoGia_All
    {
        public Prod_BH_GetThongTinBaoGia_Result BG { get; set; }
        public List<Prod_BH_GetThongTin_CT_BaoGia_Result> CTBG { get; set; }
    }
}