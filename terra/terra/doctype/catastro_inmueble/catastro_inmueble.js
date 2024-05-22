// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("catastro_inmueble", {
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

});
frappe.ui.form.on('inmueble_copropietario', {
    nombre_copropietario:function(frm, cdt, cdn) {
        // Get the specific row in the child table
        let row = locals[cdt][cdn];
        frappe.model.set_value(row.doctype , row.name , "inmueble_id"  , frm.doc.name)
        // Log the row to the console for debugging
    }
})

