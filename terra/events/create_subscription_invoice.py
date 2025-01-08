import frappe
from frappe import _
from frappe.utils import nowdate

@frappe.whitelist(allow_guest=True)
def create_recurring_invoice(doctype, name):
	"""
	Create a Sales Order and Sales Invoice for the given persona.
	"""
	fields_map = {
		"customer": {
			"sp_inmueble": "customer_name",
			"sp_persona": "customer"
		}
	}

	invoice_log_doc = frappe.get_doc({
		"doctype": "Subscription Invoice Log",
		"posting_date": nowdate(),
		"reference_doctype": doctype,
		"reference_name": name,
	})
	invoice_log_doc.save()

	try:
		doc = frappe.get_doc(doctype, name)
		
		si_doc = frappe.get_doc({
			"doctype": "Sales Invoice",
			"customer": doc.get(fields_map["customer"][doctype]),
			"posting_date": nowdate(),
			"due_date": nowdate(),
			"custom_reference_doctype": doctype,
			"custom_reference_name": name,
		})
		
		si_doc.append("items",
			{
				"item_code": doc.item_code,
				"qty": doc.multiplicador_item or 1,
				"rate": doc.price_list_rate
			}
		)
		
		si_doc.save()
		si_doc.submit()
		invoice_log_doc.db_set("status", "Invoiced")
		invoice_log_doc.save()
		
	except Exception as e:
		invoice_log_doc.status = "Failed"
		invoice_log_doc.error_log = e
		invoice_log_doc.save()
	