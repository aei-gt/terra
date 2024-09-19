import frappe
from frappe.model.document import Document

class catastro_movimiento(Document):
     def validate(self):
        if self.catastro_movimiento_tipo == "1-INSCRIPCION NUEVA":
                inmueble_doc= frappe.get_doc("catastro_inmueble",self.id_catastro)
       
                doc = frappe.get_doc({
                    'doctype': 'catastro_inmueble',
                    'propietario': inmueble_doc.propietario,
                    'finca': inmueble_doc.finca,
                    'folio': inmueble_doc.folio,
                    'libro': inmueble_doc.libro,
                    'ubicacion_catastral':inmueble_doc.ubicacion_catastral,
                    
                })
                doc.insert()
                return frappe.msgprint(f"New catastro_inmueble = {doc.name}and the  Tarjeta = {doc.tarjeta}")


        elif self.catastro_movimiento_tipo == "4-ACTUALIZACION DE VALOR":
            fields = ["valor_del_terreno", "valor_de_construccion", "valor_de_cultivo", "valor_total"]
            catastro_values = frappe.get_value("catastro_inmueble", {"name": self.id_catastro}, fields)

            if catastro_values:
                updates = {}
                
                # Compare and update values
                if catastro_values[0] < self.valor_del_terreno:
                    updates["valor_del_terreno"] = self.valor_del_terreno
                if catastro_values[1] < self.valor_de_construccion:
                    updates["valor_de_construccion"] = self.valor_de_construccion
                if catastro_values[2] < self.valor_de_cultivo:
                    updates["valor_de_cultivo"] = self.valor_de_cultivo
                if catastro_values[3] < self.valor_total:
                    updates["valor_total"] = self.valor_total

                # Apply updates if there are any changes
                if updates:
                    frappe.db.set_value("catastro_inmueble", self.id_catastro, updates)
                    frappe.msgprint(f"Updated fields: {', '.join(updates.keys())}")
            else:
                frappe.msgprint(f"Document not found for ID {self.id_catastro}")