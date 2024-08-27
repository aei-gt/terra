// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("catastro_licencia", {
    id_catastro(frm){
        if(frm.doc.propietario_inmueble){
            frappe.db.get_list('catastro_licencia', {
                fields: ['*'],
                filters: {
                    propietario_inmueble: frm.doc.propietario_inmueble
                }
            }).then(records => {
                frm.clear_table('licencia_propietario');
                if(records && records.length > 0 ){
                    for(let row of records){
                        frm.add_child('licencia_propietario', {
                            licencia_id : row.name,
                            propietario : row.propietario_inmueble 
                        })
                    }
                    frm.refresh_field('licencia_propietario');
                }
            })
        }
        else{
            frm.doc.licencia_propietario = []
            frm.refresh_field('licencia_propietario');
        }
    }

});

