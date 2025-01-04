import frappe
from frappe import _
from frappe.utils import nowdate, getdate
from terra.events.create_subscription_invoice import create_recurring_invoice


@frappe.whitelist(allow_guest=True)
def create_subscription_invoices():
	if "terra" in frappe.get_installed_apps():
		create_subscription_invoices_for_sp_persona("sp_persona")
		create_subscription_invoices_for_sp_persona("sp_inmueble")
	

def create_subscription_invoices_for_sp_persona(dt):
	try:
		docs = frappe.get_all(dt, fields=["name", "custom_periodo_label", "fecha_inicio"])
		today = getdate(nowdate())

		for doc in docs:
			name = doc.get("name")
			
			if not frappe.get_all("Sales Invoice",
				filters = {
					"custom_reference_doctype": dt,
					"custom_reference_name": name
				}):
				create_recurring_invoice(dt, name)
				continue

			sales_invoice = frappe.get_last_doc("Sales Invoice",
				filters = {
					"custom_reference_doctype": dt,
					"custom_reference_name": name
				}
			)
			
				
			frequency = doc.get("custom_periodo_label")
			last_invoice_date = sales_invoice.get("posting_date")

			year_cond = today.year > last_invoice_date.year
			month_cond = today.month > last_invoice_date.month
			day_cond = today.day > last_invoice_date.day
		
			if frequency == "ANUAL":
				if year_cond:
					create_recurring_invoice(dt, name)

			elif frequency == "QUARTERLY":
				continue
			
			elif frequency == "MONTHLY":
				if year_cond or month_cond:
					create_recurring_invoice(dt, name)
					
			elif frequency == "DIARIO":
				if year_cond or month_cond or day_cond:
					create_recurring_invoice(dt, name)
	except Exception as e:
		frappe.log_error(f"{e}")
