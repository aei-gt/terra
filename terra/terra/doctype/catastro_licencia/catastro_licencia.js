// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("catastro_licencia", {
    refresh(frm){
        frm.add_custom_button('Catastro Base on Propietario', function() {
            frappe.set_route("query-report", "Catastro Contribuyente", { propietario: frm.doc.propietario_inmueble });
        });
    },

    onload: function(frm) {
        CatastroInmuebleTable(frm);
    },
    propietario_inmueble: function(frm) {
        CatastroInmuebleTable(frm);
    }
    
});

function CatastroInmuebleTable(frm) {
    if (frm.doc.propietario_inmueble) {
        frappe.db.get_list('catastro_licencia', {
            filters: {
                propietario_inmueble: frm.doc.propietario_inmueble,
                name: ['!=', frm.doc.name]
            },
            fields: ['*']
        }).then(docs => {
            console.log(docs);
            let rows = '';
            docs.forEach(doc => {
                rows += `<tr>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.name}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${frm.doc.propietario_inmueble}</td>
                </tr>`;
            });

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





