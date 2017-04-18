using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Web.Models.NewModels
{
    public class ChiTietDonHangPO
    {
        public int ID { set; get; }
        public string MA_SO_PO { set; get; }
        public string MA_HANG { set; get; }
        public string MA_DIEU_CHINH { set; get; }
        public string DVT { set; get; }
        public int SO_LUONG { set; get; }
        public decimal DON_GIA { set; get; }
        public decimal THANH_TIEN { set; get; }
    }
}