# Copyright (c) 2024, AEI and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class sp_inmueble(Document):
	def after_insert(self):
		self.update_catastro_child_table()
	def on_update(self):
		self.update_catastro_child_table()
	def update_catastro_child_table(self):
		if not self.inmueble_id:
			return
		doc = frappe.get_doc("catastro_inmueble", self.inmueble_id)
		existing_entry = None
		for entry in doc.sp_inmueble_services:
			if entry.sp_inmueble == self.name:
				existing_entry = entry
				break
		if existing_entry:
			# If values are same, do nothing
			if (
				existing_entry.ubicacion_servicio == self.ubicacion_servicio and
				existing_entry.item_code == self.item_code and
				existing_entry.total_amount == self.total_amount
			):
				return

			existing_entry.ubicacion_servicio = self.ubicacion_servicio
			existing_entry.item_code = self.item_code
			existing_entry.total_amount = self.total_amount
		else:
			doc.append("sp_inmueble_services", {
				"sp_inmueble": self.name,
				"ubicacion_servicio": self.ubicacion_servicio,
				"item_code": self.item_code,
				"total_amount": self.total_amount
			})
		doc.total_amount+=self.total_amount
		doc.save(ignore_permissions=True)
		doc.reload()
