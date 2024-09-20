import frappe
from frappe.model.document import Document

class catastro_movimiento(Document):
    def validate(self):
        if self.catastro_movimiento_tipo == "1-INSCRIPCION NUEVA":
            doc = frappe.get_doc({
                'doctype': 'catastro_inmueble',
                'propietario': self.propietario,
                'finca': self.finca,
                'folio': self.folio,
                'libro': self.libro,
                'registro': self.registro,
                'ubicacion_catastral': self.ubicación_catastral_dirección,
            })
            doc.insert()
            return frappe.msgprint(f"New catastro_inmueble created: {doc.name}. Tarjeta = {doc.tarjeta}")

        elif self.catastro_movimiento_tipo == "4-ACTUALIZACION DE VALOR":
            if self.id_catastro:
                fields = ["valor_del_terreno", "valor_de_construccion", "valor_de_cultivo", "valor_total"]
                catastro_values = frappe.get_value("catastro_inmueble", self.id_catastro, fields)
                if catastro_values:
                    updates = {}
                    if catastro_values[0] < self.valor_del_terreno:
                        updates["valor_del_terreno"] = self.valor_del_terreno
                    if catastro_values[1] < self.valor_de_construccion:
                        updates["valor_de_construccion"] = self.valor_de_construccion
                    if catastro_values[2] < self.valor_de_cultivo:
                        updates["valor_de_cultivo"] = self.valor_de_cultivo
                    if catastro_values[3] < self.valor_total:
                        updates["valor_total"] = self.valor_total
                    
                    if updates:
                        frappe.db.set_value("catastro_inmueble", self.id_catastro, updates)
                        frappe.msgprint(title="Updated fields Successfully", msg="These Are All The Updated fields: {}".format(', '.join(updates.keys())), indicator='green')

