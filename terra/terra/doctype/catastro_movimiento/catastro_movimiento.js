// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("catastro_movimiento", {
    refresh: function(frm) {
        frm.add_custom_button('Run Operations', () => {
            if (frm.doc.catastro_movimiento_tipo == "1-INSCRIPCION NUEVA") {
                frm.call("inscripcion_nueva");
                frm.refresh();
            } 
            else if (frm.doc.catastro_movimiento_tipo == "4-ACTUALIZACION DE VALOR") {
                frm.call("actualizacion_valor");
                frm.refresh();
            } 
            else {
                frappe.msgprint(__('No valid movimiento tipo selected.'));
            }
        });
        frm.add_custom_button('Clear Fields', () => {
            frm.call("clear_fields").then(() => {
                frm.reload();
            
            });
        });
        
    },
    
    onload: function(frm) {
        CastastroTrimestreTable(frm);
        frm.refresh();
    },

    id_catastro: function(frm) {
        CastastroTrimestreTable(frm);
        frm.refresh();
    }
});

function CastastroTrimestreTable(frm) {
    if (frm.doc.propietario) {
        frappe.db.get_list('castastro_detalles_trimestre', {
            filters: {
                propietario: frm.doc.propietario
            },
            fields: ['*']
        }).then(castastrotrimestre_docs => {
            console.log(castastrotrimestre_docs);
            let castastrotrimestre_rows = '';
            castastrotrimestre_docs.forEach(doc => {
                castastrotrimestre_rows += `<tr>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.name || ""}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.propietario || ""}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.trimestre_cargo || ""}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.abono || ""}</td>
                </tr>`;
            });

            $('[data-fieldname="catastro_trimestre"]').html(`
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
                    <thead style="background-color: #f4f4f4;">
                        <tr>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Castastro Trimestre</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Propietario</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Cargo</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Abono</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${castastrotrimestre_rows}
                    </tbody>
                </table>
            `);
        });
    }
}
