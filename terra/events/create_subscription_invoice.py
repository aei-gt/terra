import frappe
from frappe import _
from frappe.utils import nowdate, getdate, add_months, get_last_day, add_days,add_years

@frappe.whitelist()
def create_recurring_invoice(doctype, name):
    """
    Create a Sales Invoice for the given document and ensure the invoice period is unique,
    using the real `due_date` field for period management.
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
        last_invoice = frappe.get_all(
            "Sales Invoice",
            filters={
                "custom_reference_doctype": doctype,
                "custom_reference_name": name,
                # "docstatus": 1 
            },
            fields=["due_date"],
            # order_by="posting_date desc",
            limit=1
        )
        if last_invoice:
            last_due_date = getdate(last_invoice[0].get("due_date"))
            if doc.custom_periodo_label == "MENSUAL":
                next_start_date = add_months(last_due_date.replace(day=1), 1)
                next_due_date = get_last_day(next_start_date)
            elif doc.custom_periodo_label == "DIARIO":
                next_start_date = add_days(last_due_date, 1)
                next_due_date = next_start_date
            else: 
                frappe.throw("You  Already Created Invoice for this Period")
        else:
            if doc.custom_periodo_label == "MENSUAL":
                next_start_date = getdate(doc.fecha_inicio).replace(day=1)
                next_due_date = get_last_day(next_start_date)
            elif doc.custom_periodo_label == "DIARIO":
                next_start_date = add_days(doc.fecha_inicio, 1)
                next_due_date=next_start_date
            elif doc.custom_periodo_label == "TRIMESTRAL" and doc.qurately_invoice==0:
                next_start_date = add_months(doc.fecha_inicio.replace(day=1), 2)
                next_due_date = get_last_day(next_start_date)
                doc.qurately_invoice=1
            elif doc.custom_periodo_label == "ANUAL" and doc.yearly_invoice==0:
                current_year = getdate(doc.fecha_inicio).year
                next_start_date = getdate(f"{current_year}-01-01")
                next_due_date = getdate(f"{current_year}-12-31") 
                doc.yearly_invoice=1

        si_doc = frappe.get_doc({
            "doctype": "Sales Invoice",
            "customer": doc.get(fields_map["customer"][doctype]),
            "set_posting_time":1,
            "posting_date": next_start_date,
            "due_date": next_due_date, 
            "custom_reference_doctype": doctype,
            "custom_reference_name": name,
            "territory":doc.get("territory")
        })
        si_doc.append("items", {
            "item_code": doc.item_code,
            "qty": doc.multiplicador_item or 1,
            "rate": doc.price_list_rate
        })

        si_doc.save()
        si_doc.submit()
        total_amount=float(doc.multiplicador_item)*float(doc.price_list_rate)
        doc.append("generated_invoices", {
            "sales_invoice": si_doc.name,
            "posting_date": next_start_date,
            "due_date": next_due_date,
            "amount": total_amount 
        })
        doc.save()
        invoice_log_doc.db_set("status", "Invoiced")
        invoice_log_doc.save()

        return {
            "status": "success",
            "message": f"Sales Invoice '{si_doc.name}' created successfully.",
            "invoice_name": si_doc.name,
            "next_start_date": next_start_date,
            "due_date": next_due_date
        }

    except Exception as e:
            invoice_log_doc.status = "Failed"
            invoice_log_doc.error_log = e
            invoice_log_doc.save()

# @frappe.whitelist(allow_guest=True)
# def create_recurring_invoice(doctype, name):
# 	"""
# 	Create a Sales Order and Sales Invoice for the given persona.
# 	"""
# 	fields_map = {
# 		"customer": {
# 			"sp_inmueble": "customer_name",
# 			"sp_persona": "customer"
# 		}
# 	}

# 	invoice_log_doc = frappe.get_doc({
# 		"doctype": "Subscription Invoice Log",
# 		"posting_date": nowdate(),
# 		"reference_doctype": doctype,
# 		"reference_name": name,
# 	})
# 	invoice_log_doc.save()

# 	try:
# 		doc = frappe.get_doc(doctype, name)
		
# 		si_doc = frappe.get_doc({
# 			"doctype": "Sales Invoice",
# 			"customer": doc.get(fields_map["customer"][doctype]),
# 			"posting_date": nowdate(),
# 			"due_date": nowdate(),
# 			"custom_reference_doctype": doctype,
# 			"custom_reference_name": name,
# 		})
		
# 		si_doc.append("items",
# 			{
# 				"item_code": doc.item_code,
# 				"qty": doc.multiplicador_item or 1,
# 				"rate": doc.price_list_rate
# 			}
# 		)
		
# 		si_doc.save()
# 		si_doc.submit()
# 		invoice_log_doc.db_set("status", "Invoiced")
# 		invoice_log_doc.save()
# 		return{
# 			"":si_doc.name
# 		}
		
# 	except Exception as e:
# 		invoice_log_doc.status = "Failed"
# 		invoice_log_doc.error_log = e
# 		invoice_log_doc.save()