//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ERP.Web.Models.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class HH_BANG_GIA_BAN1
    {
        public int ID { get; set; }
        public string MA_HANG { get; set; }
        public string SERIES { get; set; }
        public string MA_NHOM_HANG { get; set; }
        public decimal PRICE_LIST { get; set; }
        public decimal GIA_BAN { get; set; }
        public decimal CHIET_KHAU { get; set; }
        public decimal GIA_SPECIAL { get; set; }
        public string GHI_CHU { get; set; }
    
        public virtual HH HH { get; set; }
        public virtual HH_NHOM_VTHH HH_NHOM_VTHH { get; set; }
        public virtual HH_NHOM_VTHH HH_NHOM_VTHH1 { get; set; }
    }
}
