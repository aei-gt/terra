// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("catastro_inmueble", {
    refresh: function(frm) {
        frm.add_custom_button('Catastro Base on Propietario', function() {
            frappe.set_route("query-report", "Catastro Contribuyente", { propietario: frm.doc.propietario });
        });
    },

    propietario(frm) {
        if (frm.doc.propietario) {
            frappe.db.get_list('catastro_inmueble', {
                filters: {
                    propietario: frm.doc.propietario,
                    name: ['!=', frm.doc.name]
                },
                fields: ['*']
            }).then(docs => {
                console.log(docs)
                let rows = '';
                docs.forEach(doc => {
                    rows += `<tr>
                        <td>${doc.name}</td>
                        <td>${frm.doc.propietario}</td>
                    </tr>`;
                });
    
                $('[data-fieldname="html_field"]').html(`
                    <table>
                        <thead>
                            <tr>
                                <th>Catastro Inmueble</th>
                                <th>Propietario</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                `);
            });
        }
    },
    


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

