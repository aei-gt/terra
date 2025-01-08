// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("sp_inmueble", {
    refresh(frm) {
        if (!frm.is_new()) {
            if (frm.doc.custom_periodo_label=="DIARIO" || frm.doc.custom_periodo_label=="MENSUAL"){
            frm.add_custom_button(__('Create Invoice'), function () {
                frappe.call({
                    method: "terra.events.create_subscription_invoice.create_recurring_invoice",
                    args: {
                        doctype: frm.doc.doctype,
                        name: frm.doc.name,
                    },
                    callback: function (r) {
                        if (r.message && r.message.status === "success") {
                            const { invoice_name, next_start_date, due_date } = r.message;
                            frappe.msgprint(__(`Sales Invoice '{0}' created successfully for the period {1} to {2}.`, 
                                [invoice_name, next_start_date, due_date]));
                            }
                    }
                });
            });
        }
    }
        frm.set_query('price_list', function () {
            return {
                filters: {
                    item_code:frm.doc.item_code,
                }
            };
        });
    }
});
