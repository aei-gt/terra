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
        frm.refresh()
    },
    id_catastro: function(frm) {
        CatastroInmuebleTable(frm);
        frm.refresh()
    }
    
});
function CatastroInmuebleTable(frm) {
    if (frm.doc.id_catastro) {
        frappe.db.get_list('catastro_inmueble', {
            filters: {
                name: frm.doc.id_catastro,
                // name: ['!=', frm.doc.propietario]
            },
            fields: ['*']
        }).then(inmueble_docs => {
            console.log(inmueble_docs);
            let inmueble_rows = '';
            inmueble_docs.forEach(doc => {
                inmueble_rows += `<tr>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.name || ""}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.propietario || ""}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.ubicacion_catastral || ""}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.finca || ""}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.folio || ""}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.libro || ""}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.valor_total || ""}</td>
                </tr>`;
            });

            $('[data-fieldname="html_inmueble"]').html(`
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
                    <thead style="background-color: #f4f4f4;">
                        <tr>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Catastro Inmueble</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Propietario</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Ubicación Catastral</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Finca</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Folio</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Libro</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Valor Fiscal Afecto</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${inmueble_rows}
                    </tbody>
                </table>
            `);
        });
    }
}





