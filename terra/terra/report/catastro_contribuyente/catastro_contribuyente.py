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
            "width": 150
        },
        {
            "label": "Propietario ID",
            "fieldname": "propietario_id",
            "fieldtype": "Data",
            "width": 300
        },
        {
            "label": "Ubicación Catastral",
            "fieldname": "ubicacion_catastral",
            "fieldtype": "Data",
            "width": 150,
        },
        {
            "label": "Finca",
            "fieldname": "finca",
            "fieldtype": "Data",
            "width": 150,
        },
        {
            "label": "Folio",
            "fieldname": "folio",
            "fieldtype": "Data",
            "width": 150,
        },
        {
            "label": "Libro	",
            "fieldname": "libro",
            "fieldtype": "Data",
            "width": 150,
        },
        {
            "label": "Valor Fiscal Afecto",
            "fieldname": "valor_total",
            "fieldtype": "Data",
            "width": 150,
        },
        
    ]
    return columns

def get_data(filters, doctype, propietario_field):
    data = []
    emp_filters = {}

    if filters.get('propietario'):
        emp_filters[propietario_field] = filters.get('propietario')

    doc_list = frappe.get_all(doctype, filters=emp_filters, fields=["*"])
    # frappe.msgprint(f"{doc_list}")
    for doc in doc_list:
        data.append({
            "catastro_inmueble": doc.name,
            "propietario_id": doc.get(propietario_field),
            "ubicacion_catastral": doc.ubicacion_catastral,
            "finca": doc.finca,
            "folio": doc.folio,
            "libro": doc.libro,
            "valor_total": doc.valor_total,
        })

    return data
