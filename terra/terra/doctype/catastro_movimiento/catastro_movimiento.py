import frappe
from frappe.model.document import Document

class catastro_movimiento(Document):

    @frappe.whitelist()
    def inscripcion_nueva(self):
        doc = frappe.get_doc({
            'doctype': 'catastro_inmueble',
            'propietario': self.propietario,
            'finca': self.finca,
            'folio': self.folio,
            'libro': self.libro,
            'registro': self.registro,
            'ubicacion_catastral': self.ubicación_catastral_dirección,
            'valor_del_terreno': self.valor_del_terreno,
            'valor_de_construccion': self.valor_de_construccion,
            'valor_de_cultivo': self.valor_de_cultivo,
            'area_del_terreno_en_m2': self.area_del_terreno_en_m2,
            'area_de_construcción_en_m2': self.area_de_construcción_en_m2,
            'area_de_cultivos_en_m2': self.area_de_cultivos_en_m2,
        })
        total_value = (self.valor_del_terreno or 0) + (self.valor_de_construccion or 0) + (self.valor_de_cultivo or 0)
        doc.db_set('valor_total', total_value)
        doc.insert()
        frappe.msgprint(f"New catastro_inmueble created: {doc.name}. Tarjeta = {doc.tarjeta}")

    @frappe.whitelist()
    def actualizacion_valor(self):
        if self.id_catastro:
            fields = ["valor_del_terreno", "valor_de_construccion", "valor_de_cultivo", "valor_total"]
            catastro_values = frappe.get_value("catastro_inmueble", self.id_catastro, fields)

            if catastro_values:
                updates = {}
                total_value = (self.valor_del_terreno or 0) + (self.valor_de_construccion or 0) + (self.valor_de_cultivo or 0)
                if catastro_values[0] < self.valor_del_terreno:
                    updates["valor_del_terreno"] = self.valor_del_terreno
                if catastro_values[1] < self.valor_de_construccion:
                    updates["valor_de_construccion"] = self.valor_de_construccion
                if catastro_values[2] < self.valor_de_cultivo:
                    updates["valor_de_cultivo"] = self.valor_de_cultivo
                if catastro_values[3] < total_value:
                    updates["valor_total"] = total_value
                self.valor_total = total_value

                if updates:
                    frappe.db.set_value("catastro_inmueble", self.id_catastro, updates)
                    frappe.msgprint(
                        title="Updated Fields Successfully", 
                        msg="These Are All The Updated Fields: {}".format(', '.join(updates.keys())), 
                        indicator='green'
                    )

    @frappe.whitelist()
    def clear_fields(self):
        fields_to_clear = [
            'propietario', 'finca', 'folio', 'libro', 'registro',
            'ubicación_catastral_dirección', 'valor_del_terreno', 'valor_de_construccion',
            'valor_de_cultivo', 'area_del_terreno_en_m2', 'area_de_construcción_en_m2',
            'area_de_cultivos_en_m2', 'id_catastro', 'valor_total','inmueble_propietario',
            'movimiento_notario_nombre', 'movimiento_colegiado','matricula_de_propietario',
            'id_catastro', 'propietario','movimiento_nota','custom_matricula',
        ]
        
        for field in fields_to_clear:
            self.set(field, None)
        self.save()
    
        frappe.msgprint("All fields have been cleared successfully.")
