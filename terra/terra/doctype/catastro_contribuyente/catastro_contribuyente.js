frappe.ui.form.on("Catastro Contribuyente", {

    propietario_id(frm) {
        if (frm.doc.propietario_id) {
            frappe.db.get_list('catastro_inmueble', {
                filters: {
                    propietario: frm.doc.propietario_id,
                    // name: ['!=', frm.doc.name]
                },
                fields: ['*']
            }).then(inmueble_docs => {
                console.log(inmueble_docs);
                let inmueble_rows = '';
                inmueble_docs.forEach(doc => {
                    inmueble_rows += `<tr>
                        <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.name}</td>
                        <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${frm.doc.propietario_id}</td>
                    </tr>`;
                });

                $('[data-fieldname="html_first"]').html(`
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
                        <thead style="background-color: #f4f4f4;">
                            <tr>
                                <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Catastro Inmueble</th>
                                <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Propietario</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${inmueble_rows}
                        </tbody>
                    </table>
                `);
            });

            frappe.db.get_list('catastro_licencia', {
                filters: {
                    propietario_inmueble: frm.doc.propietario_id,
                    // name: ['!=', frm.doc.name]
                },
                fields: ['*']
            }).then(licencia_docs => {
                console.log(licencia_docs);
                let licencia_rows = '';
                licencia_docs.forEach(doc => {
                    licencia_rows += `<tr>
                        <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.name}</td>
                        <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${frm.doc.propietario_id}</td>
                    </tr>`;
                });
                $('[data-fieldname="html_second"]').html(`
                    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
                        <thead style="background-color: #f4f4f4;">
                            <tr>
                                <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Catastro Licencia</th>
                                <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Propietario</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${licencia_rows}
                        </tbody>
                    </table>
                `);
            });
        }
    }
});
