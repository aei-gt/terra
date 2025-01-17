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
                            const formatDate = (dateString) => {
                                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                const date = new Date(dateString);
                                const day = date.getDate();
                                const month = months[date.getMonth()];
                                const year = date.getFullYear();
                                return `${day}-${month}-${year}`;
                            };
                            const formattedNextStartDate = formatDate(next_start_date);
                            const formattedDueDate = formatDate(due_date);
                            frappe.msgprint(__(`Sales Invoice '{0}' created successfully for the period {1} to {2}.`, 
                                [invoice_name, formattedNextStartDate, formattedDueDate]));
                        }
                    }
                });
            });
        }
    }
    if (frm.doc.coordenada_gps) { 
        frm.add_custom_button(__('Open Location'), function () {
            let coordinates = frm.doc.coordenada_gps; 
            let googleMapsUrl = `https://www.google.com/maps/place/${coordinates}`; 
            
            window.open(googleMapsUrl, '_blank');
            // if (!frm.doc.latitude || !frm.doc.longitude || !frm.doc.device_id) {
        //  if (frm.doc.coordenada_gps) {
            // frm.add_custom_button(__('Open Location'), function() {
            //     let coordina = frm.doc.coordenada_gps;

            //     // Split latitude and longitude from coordenada_gps
            //     let [latitude, longitude] = coordina.split(',');

            //     // Validate coordinates
            //     if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
            //         frappe.msgprint(__('Invalid GPS coordinates provided.'));
            //         return;
            //     }

            //     // Update geolocation field
            //     frm.set_value('location', `${latitude},${longitude}`);

            //     // Alert user
            //     frappe.msgprint(__('Geolocation field has been updated.'));
            // // });
        // }
    })
    
        frm.set_query('price_list', function () {
            return {
                filters: {
                    item_code:frm.doc.item_code,
                }
            };
        });
        frm.fields_dict.price_list.$input.on('click', function() {
            console.log("price_list field clicked!");
            const interval = setInterval(function() {
                console.log("Checking for listbox...");
                const listbox = document.querySelector('#awesomplete_list_5');
                if (listbox) {
                    console.log("Listbox found. Processing...");
                    const items = listbox.querySelectorAll('div[role="option"]');
                    items.forEach(item => {
                        const span = item.querySelector('span.small');
                        if (span) {
                            const text = span.textContent;
                                const updatedText = text.split(',').slice(1).join(',');
                                console.log("Updating item:", updatedText);
                                span.textContent = updatedText.trim();
                        }
                    });
                }
                clearInterval(interval);
            }, 800);
        });

    }
}
});

frappe.ui.form.on('Generated Invoices', {
    amount: function (frm, cdt, cdn) {
        console.log("aaa");
        calculate_total_amount(frm, "total_amount", "generated_invoices");
    }, 
    generated_invoices_remove: function (frm, cdt, cdn) {
        console.log("aaa");
        calculate_total_amount(frm, "total_amount", "generated_invoices");
    }
});
const calculate_total_amount = (frm, field_name, table_name) => {
    let total = 0;
    if (frm.doc[table_name]) {
        frm.doc[table_name].forEach(row => {
            total += flt(row.amount);
        });
    }
    frm.set_value(field_name, total);
    frm.refresh_field(field_name);
};
