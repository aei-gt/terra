// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("sp_persona", {
    refresh(frm) {
        if (!frm.is_new()) {
            if (frm.doc.qurately_invoice==0 && frm.doc.yearly_invoice==0 ){
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
                                frm.refresh_field("generated_invoices")
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
        })
        }
        frm.set_query('price_list', function () {
            return {
                filters: {
                    item_code: frm.doc.item_code,
                }
            };
        });
        frm.fields_dict.price_list.$input.on('click', function() {
            console.log("price_list field clicked!");
            const interval = setInterval(function() {
                console.log("Checking for listbox...");
                const listbox = document.querySelector('#awesomplete_list_8');
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
    },
    custom_periodo_label(frm){
        if(frm.doc.custom_periodo_label==="UNICO"){
            frm.set_df_property('price_list_rate', 'read_only', 0)
        }
        
    },
    price_list(frm){
        frappe.db.get_doc("Item Price", frm.doc.price_list).then(priceListDoc => {
            console.log(priceListDoc.price_list_rate);
            frm.set_value('price_list_rate', priceListDoc.price_list_rate);
        })
        if(frm.doc.custom_periodo_label!="UNICO"){
            frm.set_df_property('price_list_rate', 'read_only', 1)
        }
    }

});