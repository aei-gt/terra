// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("catastro_contribuyente", {
	contribuyente_nombre(frm) {
        if(frm.doc.contribuyente_nombre){
            frappe.db.get_list('catastro_inmueble', {
                fields: ['*'],
                filters: {
                    customer_name : frm.doc.contribuyente_nombre
                }
            }).then(records => {
                frm.clear_table('inmueble_detalle');
                if(records && records.length > 0 ){
                    for(let row of records){
                        frm.add_child('inmueble_detalle', {
                            inmueble_id: row.name,
                            propietario : row.customer_name
                        })
                    }
                    frm.refresh_field('inmueble_detalle');
                }
            })
        }
        else{
            frm.doc.inmueble_detalle = []
            frm.refresh_field('inmueble_detalle');
        }


        if(frm.doc.contribuyente_nombre){
            frappe.db.get_list('catastro_licencia', {
                fields: ['*'],
                filters: {
                    propietario_inmueble: frm.doc.contribuyente_nombre
                }
            }).then(records => {
                frm.clear_table('detalle_de_licencia');
                
                if(records && records.length > 0 ){
                    for(let row of records){
                        frm.add_child('detalle_de_licencia', {
                            licencia_id : row.name,
                            propietario : row.propietario_inmueble 
                        })
                    }
                    frm.refresh_field('detalle_de_licencia');
                }
            })
        }
        else{
            frm.doc.licencia_propietario = []
            frm.refresh_field('detalle_de_licencia');
        }
	},
});
