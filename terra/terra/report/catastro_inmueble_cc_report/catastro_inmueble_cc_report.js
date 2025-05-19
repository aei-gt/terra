// Copyright (c) 2025, AEI and contributors
// For license information, please see license.txt

frappe.query_reports["Catastro Inmueble cc Report"] = {
    "filters": [
        {
            fieldname: "catastro_inmueble",
            label: "catastro_inmueble",
            fieldtype: "Link",
			options: "catastro_inmueble",
            width: 150
        },
        {
            fieldname: "description",
            label: "Description",
            fieldtype: "Data",
            width: 150
        },
        {
            fieldname: "cc_vencimiento",
            label: "Vencimiento",
            fieldtype: "Date",
            width: 150
        },
        {
            fieldname: "cc_estado",
            label: "Estado",
            fieldtype: "Select",
            options: "\nPOR PAGAR\nPAGADO",
            width: 120
        }
    ]
};

