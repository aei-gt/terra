# Copyright (c) 2024, AEI and contributors
# For license information, please see license.txt

import frappe



def execute(filters=None):
	columns = get_columns(filters)
	data = get_data(filters)
	return columns, data,

def get_columns(filters):
	columns = [
		{
			"label": "Catastro Inmueble",
			"fieldname": "catastro_inmueble",
			"fieldtype": "Data",
			"width": 270
		},
		{
			"label": "Propietario ID",
			"fieldname": "propietario_id",
			"fieldtype": "Data",
			"width": 270
		},
		{
			"label": "Propietario",
			"fieldname": "Propietario",
			"fieldtype": "Data",
			"width": 650,
		},
		
	]
	return columns

def get_data(filters):
	data = []
	emp_filters = {}
	
	if filters.get('propietario'):
		emp_filters['propietario'] = filters.get('propietario')
		
	property_list = frappe.get_all('catastro_inmueble', emp_filters, ["*"])
	
	for property_data in property_list:

		data.append({
			"catastro_inmueble": property_data.name,
			"propietario_id": property_data.propietario,
			"Propietario": property_data.customer_name,
		})

	return data

