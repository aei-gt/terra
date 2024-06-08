// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.query_reports["Catastro Inmueble Base on Propietario"] = {
	"filters": [
		{
			fieldname: 'propietario',
			label: __('Propietario'),
			fieldtype: 'Link',
			options: 'Customer',
		
		   
		},
	],
};
