import frappe

def execute():
    frappe.db.delete('Workspace', {'name': 'CATASTRO'})
    frappe.db.commit()