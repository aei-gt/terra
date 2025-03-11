import frappe
from frappe import _
from frappe.utils import nowdate, getdate
# from terra.events.create_subscription_invoice import create_recurring_invoice


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

			elif frequency == "TRIMESTRAL":
				continue
			
			elif frequency == "MENSUAL":
				if year_cond or month_cond:
					create_recurring_invoice(dt, name)
					
			elif frequency == "DIARIO":
				if year_cond or month_cond or day_cond:
					create_recurring_invoice(dt, name)
	except Exception as e:
		frappe.log_error(f"{e}")



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
			"set_posting_time":1,
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
		total_amount=float(doc.multiplicador_item)*float(doc.price_list_rate)
		doc.append("generated_invoices", {
            "sales_invoice": si_doc.name,
            "posting_date": nowdate(),
            "due_date": nowdate(),
            "amount": total_amount 
        })
		doc.save()
		invoice_log_doc.db_set("status", "Invoiced")
		invoice_log_doc.save()
		return{
			"sales_invoice":si_doc.name
		}
		
	except Exception as e:
		invoice_log_doc.status = "Failed"
		invoice_log_doc.error_log = e
		invoice_log_doc.save()