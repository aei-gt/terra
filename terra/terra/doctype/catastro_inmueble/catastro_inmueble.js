// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("catastro_inmueble", {
    refresh: function(frm) {
        frm.add_custom_button('Catastro Base on Propietario', function() {
            frappe.set_route("query-report", "Catastro Inmueble Base on Propietario", { propietario: frm.doc.propietario });
        });
    },
    catastro_licencia_details(frm){
        // let data = frappe.get_all("catastro_licencia")
        if(frm.doc.id){
            frappe.db.get_doc('catastro_licencia',frm.doc.id)
            .then(doc => {
                frm.add_child('data', {
                    id:doc.id_catastro,
                    licencia_tipo:doc.licencia_tipo,
                    licencia_descripcion: doc.licencia_descripcion,
                    fecha_finaliza:doc.fecha_finaliza,
                    licencia_valor:doc.licencia_valor
                });
                
            
                // console.log(doc)
                frm.refresh_field('data');
            })
        }
    },
    // propietario(frm){
    //     if(frm.doc.propietario){
    //         frappe.db.get_list('catastro_inmueble', {
    //             fields: ['*'],
    //             filters: {
    //                 propietario: frm.doc.propietario
    //             }
    //         }).then(records => {
    //             console.log(records);
    //             if(records && records.length > 0 ){
    //                 frm.doc.propietario = []
    //                 for(let row of records){
    //                     frm.add_child('listado_de_otros_inmuebles', {
    //                         id : row.name,
    //                         propietario : row.propietario 
    //                     })
    //                 }
    //                 frm.refresh_field('listado_de_otros_inmuebles');
    //             }
    //         })
    //     }
    //     else{
    //         frm.doc.listado_de_otros_inmuebles = []
    //         frm.refresh_field('listado_de_otros_inmuebles');
    //     }
    // }

});
frappe.ui.form.on('inmueble_copropietario', {
    nombre_copropietario:function(frm, cdt, cdn) {
        // Get the specific row in the child table
        let row = locals[cdt][cdn];
        frappe.model.set_value(row.doctype , row.name , "inmueble_id"  , frm.doc.name)
        // Log the row to the console for debugging
    }
})

