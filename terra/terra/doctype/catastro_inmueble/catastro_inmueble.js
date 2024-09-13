// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("catastro_inmueble", {
    refresh: function(frm) {
        frm.add_custom_button('Catastro Base on Propietario', function() {
            frappe.set_route("query-report", "Catastro Contribuyente", { propietario: frm.doc.propietario });
        });
    },
    onload: function(frm) {
        PropietarioTable(frm);
    },
    propietario: function(frm) {
        PropietarioTable(frm);
    }

   
    


    // licencia_id(frm){
    //     if (frm.doc.licencia_id){
    //         frappe.db.get_list('catastro_licencia', {
    //             fields: ['*'],
    //             filters: {
    //                 propietario_inmueble: frm.doc.propietario
    //             }
    //         }).then(records => {
    //             frm.clear_table('data1');
    //             if(records && records.length > 0 ){
    //                 for(let row of records){
    //                     frm.add_child('data1', {
    //                         id: row.name,
    //                         licencia_tipo : row.licencia_tipo,
    //                         licencia_descripcion:row.licencia_descripcion,
    //                         fecha_finaliza:row.creation,
    //                         licencia_valor:row.licencia_categoria,

    //                     })
    //                 }
    //                 frm.refresh_field('data1');
    //             }
    //         })
    //     }
    //     else{
    //         frm.doc.data1=[]
    //         frm.refresh_field("data")
    //     }
    // }





});

function updatePropietarioTable(frm) {
    if (frm.doc.propietario) {
        frappe.db.get_list('catastro_inmueble', {
            filters: {
                propietario: frm.doc.propietario,
                name: ['!=', frm.doc.name]
            },
            fields: ['*']
        }).then(docs => {
            console.log(docs);
            let rows = '';
            docs.forEach(doc => {
                rows += `<tr>
                    <td>${doc.name}</td>
                    <td>${frm.doc.propietario}</td>
                </tr>`;
            });

            // Update the HTML field with the new table content
            $('[data-fieldname="html_field"]').html(`
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #ddd;">
                    <thead style="background-color: #f4f4f4;">
                        <tr>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Catastro Inmueble</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Propietario</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            `);
        });
    }
}


