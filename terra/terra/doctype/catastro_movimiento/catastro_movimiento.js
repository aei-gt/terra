// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("catastro_movimiento", {
    after_save: function(frm) {
        if (!frm.is_new()) {
            frm.set_df_property("finca", "read_only", 1);
            frm.set_df_property("folio", "read_only", 1);
            frm.set_df_property("libro", "read_only", 1);
            frm.set_df_property("catastro_movimiento_tipo", "read_only", 1);
            frm.set_df_property("valor_del_terreno", "read_only", 1);
            frm.set_df_property("valor_de_cultivo", "read_only", 1);
            frm.set_df_property("valor_de_construccion", "read_only", 1);
            frm.set_df_property("propietario", "read_only", 1);
            frm.set_df_property("ubicación_catastral_dirección", "read_only", 1);
            frm.set_df_property("area_del_terreno_en_m2", "read_only", 1);
            frm.set_df_property("area_de_construcción_en_m2", "read_only", 1);
            frm.set_df_property("area_de_cultivos_en_m2", "read_only", 1);
            frm.set_df_property("id_catastro", "read_only", 1);
            frm.set_df_property("valor_total", "read_only", 1);
            frm.set_df_property("inmueble_propietario", "read_only", 1);
            frm.set_df_property("movimiento_notario_nombre", "read_only", 1);
            frm.set_df_property("movimiento_colegiado", "read_only", 1);
            frm.set_df_property("matricula_de_propietario", "read_only", 1);
            frm.set_df_property("movimiento_nota", "read_only", 1);
            frm.set_df_property("custom_matricula", "read_only", 1);
            frm.set_df_property("fecha_operacion", "read_only", 1);
            frm.set_df_property("registro", "read_only", 1);
            frm.set_df_property("new_catastro_inmueble", "read_only", 1);
        }
    },
    valor_del_terreno: function(frm) {
        sumFields(frm);
    },
    valor_de_cultivo: function(frm) {
        sumFields(frm);
    },
    valor_de_construccion: function(frm) {
        sumFields(frm);
    }
    
});


function sumFields(frm) {
    const valor_del_terreno = frm.doc.valor_del_terreno || 0;
    const valor_de_cultivo = frm.doc.valor_de_cultivo || 0;
    const valor_de_construccion = frm.doc.valor_de_construccion || 0;
    const total = valor_del_terreno + valor_de_cultivo + valor_de_construccion;
    frm.set_value('valor_total', total);
}
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
