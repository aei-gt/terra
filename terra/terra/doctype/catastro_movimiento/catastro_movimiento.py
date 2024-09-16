import frappe
from frappe.model.document import Document

class catastro_movimiento(Document):
    def validate(self):
        fields = ["valor_del_terreno", "valor_de_construccion", "valor_de_cultivo", "valor_total"]
        catastro_values = frappe.get_value("catastro_inmueble", {"name": self.id_catastro}, fields)
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
                frappe.msgprint(f"Updated fields: {', '.join(updates.keys())}")
            else:
                frappe.msgprint("No fields needed updating.")
        else:
            frappe.msgprint(f"Document not found for ID {self.id_catastro}")
