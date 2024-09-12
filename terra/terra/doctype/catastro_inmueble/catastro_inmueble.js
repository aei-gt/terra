// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("catastro_inmueble", {
    refresh: function(frm) {
        frm.add_custom_button('Catastro Base on Propietario', function() {
            frappe.set_route("query-report", "Catastro Contribuyente", { propietario: frm.doc.propietario });
        });




        if(frm.doc.propietario){
            frappe.db.get_list('catastro_inmueble', {
                fields: ['*'],
                filters: {
                    customer_name: frm.doc.propietario,
                    name: ['!=', frm.doc.name]
                }
            }).then(records => {
                if (records && records.length > 0) {
                    if(records.length != frm.doc.listado_de_otros_inmuebles.length){
                        frm.clear_table('listado_de_otros_inmuebles');
                        for (let row of records) {
    
                            frm.add_child('listado_de_otros_inmuebles', {
                                inmueble_id: row.name,
                                propietario: row.customer_name
                            });
                        }
                        frm.refresh_field('listado_de_otros_inmuebles');
                        frm.save()
                    }
                }
            })
        }
        else{
            frm.doc.listado_de_otros_inmuebles = []
            frm.refresh_field('listado_de_otros_inmuebles');
        }
    },
    

    propietario(frm){
        if(frm.doc.propietario){
            frappe.db.get_list('catastro_inmueble', {
                fields: ['*'],
                filters: {
                    customer_name: frm.doc.propietario,
                    name: ['!=', frm.doc.name]
                }
            }).then(records => {
                frm.clear_table('listado_de_otros_inmuebles');
                if(records && records.length > 0 ){
                    for(let row of records){
                        frm.add_child('listado_de_otros_inmuebles', {
                            inmueble_id: row.name,
                            propietario : row.customer_name
                        })
                    }
                    frm.refresh_field('listado_de_otros_inmuebles');
                }
            })
        }
        else{
            frm.doc.listado_de_otros_inmuebles = []
            frm.refresh_field('listado_de_otros_inmuebles');
        }
    },




    licencia_id(frm){
        if (frm.doc.licencia_id){
            frappe.db.get_list('catastro_licencia', {
                fields: ['*'],
                filters: {
                    propietario_inmueble: frm.doc.propietario
                }
            }).then(records => {
                frm.clear_table('data1');
                if(records && records.length > 0 ){
                    for(let row of records){
                        frm.add_child('data1', {
                            id: row.name,
                            licencia_tipo : row.licencia_tipo,
                            licencia_descripcion:row.licencia_descripcion,
                            fecha_finaliza:row.creation,
                            licencia_valor:row.licencia_categoria,

                        })
                    }
                    frm.refresh_field('data1');
                }
            })
        }
        else{
            frm.doc.data1=[]
            frm.refresh_field("data")
        }
    }





});

// frappe.ui.form.on('inmueble_copropietario', {
//     nombre_copropietario:function(frm, cdt, cdn) {
//         let row = locals[cdt][cdn];
//         frappe.model.set_value(row.doctype , row.name , "inmueble_id"  , frm.doc.name)
//     }
// })

