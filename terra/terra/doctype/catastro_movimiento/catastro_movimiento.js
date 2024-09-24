// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("catastro_movimiento", {
    after_save: function(frm) {
        frm.set_value("finca", "");
        frm.set_value("folio", "");
        frm.set_value("libro", "");
        frm.set_value("catastro_movimiento_tipo", "9-OTRO");
        frm.set_value("valor_del_terreno", "0");
        frm.set_value("valor_de_cultivo", "0");
        frm.set_value("valor_de_construccion", "0");
        frm.set_value("propietario", "");
        frm.set_value("ubicación_catastral_dirección", "");
        frm.set_value("area_del_terreno_en_m2", "0");
        frm.set_value("area_de_construcción_en_m2", "0");
        frm.set_value("area_de_cultivos_en_m2", "0");
        frm.set_value("id_catastro", "");
        frm.set_value("valor_total", "0");
        frm.set_value("inmueble_propietario", "");
        frm.set_value("movimiento_notario_nombre", "");
        frm.set_value("movimiento_colegiado", "");
        frm.set_value("matricula_de_propietario", "");
        frm.set_value("movimiento_nota", "");
        frm.set_value("custom_matricula", "");
    },
   
    // validate(frm){
    //     if(frm.doc.catastro_movimiento_tipo == "1-INSCRIPCION NUEVA"){
    //         console.log("HELlo");
            
    //         frm.call("inscripcion_nueva")
    //         .then(r => {
    //             if (r.message) {
    //                 let doc = r.message
    //                 frappe.msgprint("New catastro_inmueble created: " + doc.name + ". Tarjeta = " + doc.tarjeta)
                    
    //                 // let linked_doc = r.message;
    //                 // do something with linked_doc
    //             }
    //         })
    //     }
    // },
    // refresh: function(frm) {
    //     frm.add_custom_button('Run Operations', () => {
    //         if (frm.doc.catastro_movimiento_tipo == "1-INSCRIPCION NUEVA") {
    //             frm.call("inscripcion_nueva");
    //             frm.refresh();
    //         } 
    //         else if (frm.doc.catastro_movimiento_tipo == "4-ACTUALIZACION DE VALOR") {
    //             frm.call("actualizacion_valor");
    //             frm.refresh();
    //         } 
    //         else {
    //             frappe.msgprint(__('No valid movimiento tipo selected.'));
    //         }
    //     });
    //     frm.add_custom_button('Clear Fields', () => {
    //         frm.call("clear_fields").then(() => {
    //             frm.reload();
            
    //         });
    //     });
        
    // },
    
    // onload: function(frm) {
    //     CastastroTrimestreTable(frm);
    //     frm.refresh();
    // },

    // id_catastro: function(frm) {
    //     CastastroTrimestreTable(frm);
    //     frm.refresh();
    // }
});

// function CastastroTrimestreTable(frm) {
//     if (frm.doc.propietario) {
//         frappe.db.get_list('castastro_detalles_trimestre', {
//             filters: {
//                 propietario: frm.doc.propietario
//             },
//             fields: ['*']
//         }).then(castastrotrimestre_docs => {
//             console.log(castastrotrimestre_docs);
//             let castastrotrimestre_rows = '';
//             castastrotrimestre_docs.forEach(doc => {
//                 castastrotrimestre_rows += `<tr>
//                     <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.name || ""}</td>
//                     <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.propietario || ""}</td>
//                     <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.trimestre_cargo || ""}</td>
//                     <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.abono || ""}</td>
//                 </tr>`;
//             });

//             $('[data-fieldname="catastro_trimestre"]').html(`
//                 <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
//                     <thead style="background-color: #f4f4f4;">
//                         <tr>
//                             <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Castastro Trimestre</th>
//                             <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Propietario</th>
//                             <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Cargo</th>
//                             <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Abono</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${castastrotrimestre_rows}
//                     </tbody>
//                 </table>
//             `);
//         });
//     }
// }
