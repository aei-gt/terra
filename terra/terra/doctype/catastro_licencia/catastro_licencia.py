# Copyright (c) 2024, AEI and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class catastro_licencia(Document):
    def on_update(self):
        change_customer(self)
        frappe.db.commit()
        old_doc = self.get_doc_before_save()
        change_customer(old_doc)
        frappe.db.commit()

def change_customer(self):
    changed_docs = frappe.get_all("catastro_licencia", {"propietario_inmueble": self.propietario_inmueble}, ["name","propietario_inmueble"])
    total_len = len(changed_docs)
    for row in changed_docs:
        inmueble_doc = frappe.get_doc("catastro_licencia",row.name)
        if len(inmueble_doc.licencia_propietario)==total_len:
            count=0
            for changed_newrow in changed_docs:
                for newrow in inmueble_doc.licencia_propietario:
                    if newrow.licencia_id == changed_newrow.name:
                        count+=1
                    if newrow.propietario == changed_newrow.propietario_inmueble:
                        count+=1
            continue
        inmueble_doc.licencia_propietario=[]
        for item in changed_docs:
            inmueble_doc.append('licencia_propietario', {
                'licencia_id': item.name,
                'propietario': item.propietario_inmueble
            })
        inmueble_doc.save()
        