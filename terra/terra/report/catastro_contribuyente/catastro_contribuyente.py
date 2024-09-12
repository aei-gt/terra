import frappe

def execute(filters=None):
    columns = get_columns(filters)

    data1 = get_data(filters, "catastro_inmueble", "propietario")
    data2 = get_data(filters, "catastro_licencia", "propietario_inmueble")

    return columns, data1 + data2

def get_columns(filters):
    columns = [
        {
            "label": "Catastro Inmueble / Licencia",
            "fieldname": "catastro_inmueble",
            "fieldtype": "Data",
            "width": 600
        },
        {
            "label": "Propietario ID",
            "fieldname": "propietario_id",
            "fieldtype": "Data",
            "width": 600
        },
        # {
        #     "label": "Propietario",
        #     "fieldname": "propietario",
        #     "fieldtype": "Data",
        #     "width": 650,
        # },
    ]
    return columns

def get_data(filters, doctype, propietario_field):
    data = []
    emp_filters = {}

    if filters.get('propietario'):
        emp_filters[propietario_field] = filters.get('propietario')

    doc_list = frappe.get_all(doctype, filters=emp_filters, fields=["name", propietario_field])

    # Append data to the list
    for doc in doc_list:
        data.append({
            "catastro_inmueble": doc.name,
            "propietario_id": doc.get(propietario_field),
            # "propietario": doc.get(propietario_field),
        })

    return data
