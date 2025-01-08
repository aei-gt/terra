// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("sp_persona", {
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

            // frm.add_custom_button(__('Check Cron Job (Temp Button)'), function () {
            //     frappe.call({
            //         method: "terra.events.cron_job.create_subscription_invoices",
                    
            //         args: {
            //             doctype: frm.doc.doctype,
            //             name: frm.doc.name,
            //         }
            //     });
            // });
            frm.set_query('price_list', function () {
                return {
                    filters: {
                        item_code:frm.doc.item_code,
                    }
                };
            });
    }
    },
});
