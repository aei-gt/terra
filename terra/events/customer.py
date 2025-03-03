import frappe
from frappe.model.naming import make_autoname

def custom_series(doc, method=None):
    digits = 6
    prefix = "0113"

    settings = frappe.get_single("Terra Settings")
    if not settings.customer_series:
        frappe.throw("Please set counter in Terra Settings")

    current_number = int(settings.customer_series) + 1

    settings.customer_series = current_number
    settings.save()

    formatted_number = format_with_leading_zeros(current_number, digits)
    doc.custom_matricula = f"{prefix}{formatted_number}"

def format_with_leading_zeros(number, digits):
    return str(number).zfill(digits)



def autoname(doc, method):
    if doc.naming_series:
        doc.name = make_autoname(doc.naming_series)  