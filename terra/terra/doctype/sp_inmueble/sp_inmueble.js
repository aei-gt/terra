// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("sp_inmueble", {
    refresh(frm) {
        if (!frm.is_new()) {
            frm.add_custom_button(__('Create Invoice'), function () {
                frappe.call({
                    method: "terra.events.create_subscription_invoice.create_recurring_invoice",
                    args: {
                        doctype: frm.doc.doctype,
                        name: frm.doc.name,
                    },
                    callback: function (r) {
                        frappe.msgprint(__("Sales Invoice created successfully."))
                    }
                });
            });
        }
    }
});
