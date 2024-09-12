# Copyright (c) 2024, AEI and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
class catastro_inmueble(Document):
    def before_insert(self):
        digits = 6
        prefix = "IUSIFRA"

        settings = frappe.get_single("Terra Settings")
        if not settings.catastro_series:
            frappe.throw("Please set counter in Terra Settings")

        current_number = int(settings.catastro_series) + 1

        settings.catastro_series = current_number
        settings.save()

        formatted_number = format_with_leading_zeros(current_number, digits)
        self.tarjeta = f"{formatted_number}-{prefix}"

def format_with_leading_zeros(number, digits):
    return str(number).zfill(digits)
    
    
    
    
    # def on_update(self):
    #     change_customer(self)
    #     frappe.db.commit()
    #     self.refresh()
    #     old_doc = self.get_doc_before_save()
    #     change_customer(old_doc)
    #     frappe.db.commit()
    #     self.refresh()

# def change_customer(self):
#     changed_docs = frappe.get_all("catastro_inmueble", {"propietario": self.propietario}, ["name","propietario"])
#     # frappe.msgprint(f"{changed_docs}")







    # total_len = len(changed_docs)
    # for row in changed_docs:
    #     inmueble_doc = frappe.get_doc("catastro_inmueble",row.name)
    #     if len(inmueble_doc.listado_de_otros_inmuebles)==total_len:
    #         count=0
    #         for changed_newrow in changed_docs:
    #             for newrow in inmueble_doc.listado_de_otros_inmuebles:
    #                 if newrow.inmueble_id == changed_newrow.name:
    #                     count+=1
    #                 if newrow.propietario == changed_newrow.propietario:
    #                     count+=1
    #         continue
    #     inmueble_doc.listado_de_otros_inmuebles=[]
    #     for item in changed_docs:
    #         inmueble_doc.append('listado_de_otros_inmuebles', {
    #             'inmueble_id': item.name,
    #             'propietario': item.propietario
    #         })
    #     inmueble_doc.save()
    


