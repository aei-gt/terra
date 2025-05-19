# Copyright (c) 2025, AEI and contributors
# For license information, please see license.txt


import frappe
from frappe.utils import getdate

def execute(filters=None):
    columns = [
        {"label": "catastro_inmueble", "fieldname": "parent", "fieldtype": "Link","options": "catastro_inmueble", "width": 100},
        {"label": "Description", "fieldname": "cc_descripcion", "fieldtype": "Data", "width": 350},
        {"label": "Vencimiento", "fieldname": "cc_vencimiento", "fieldtype": "Date", "width": 150},
        {"label": "Estado", "fieldname": "cc_estado", "fieldtype": "Data", "width": 100},
        {"label": "Monto", "fieldname": "cc_monto", "fieldtype": "Currency", "width": 150},
        {"label": "Tipo Documento", "fieldname": "cc_documento_tipo", "fieldtype": "Data", "width": 200},
        {"label": "Numero Documento", "fieldname": "cc_documento_numero", "fieldtype": "Data", "width": 200},
    ]
    conditions = ""
    if filters:
        if filters.get("catastro_inmueble"):
            conditions += " AND parent = %(parent)s"
        if filters.get("cc_descripcion"):
            conditions += " AND cc_descripcion LIKE %(cc_descripcion)s"
        if filters.get("cc_vencimiento"):
            conditions += " AND cc_vencimiento LIKE %(cc_vencimiento)s"
        if filters.get("cc_estado"):
            conditions += " AND cc_estado LIKE %(cc_estado)s"
    data = frappe.db.sql(
        f"""
        SELECT 
        	parent,
            name,
            cc_descripcion,
            cc_vencimiento,
            cc_estado,
            cc_monto,
            cc_documento_tipo,
            cc_documento_numero
        FROM 
            `tabcatastro_inmueble_cc`
        WHERE 
            parenttype = 'catastro_inmueble'
            {conditions}
        ORDER BY cc_vencimiento ASC
        """,
        filters,
        as_dict=True
    )

    return columns, data
