# Copyright (c) 2024, AEI and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
class catastro_inmueble(Document):
	def send_data(self):
  		print("Hello from a function")