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
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.propietario}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.ubicacion_catastral}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.finca}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.folio}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.libro}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.valor_total}</td>
                </tr>`;
                });

                $('[data-fieldname="html_first"]').html(`
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
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.propietario_inmueble}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.licencia_tipo}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.fecha_finaliza}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.licencia_valor}</td>
                </tr>`;
                });
                $('[data-fieldname="html_second"]').html(`
                    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
                        <thead style="background-color: #f4f4f4;">
                        <tr>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Catastro Licencia</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Propietario</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Tipo de Construcción</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Fecha de Finalización</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Valor Total de la Licencia</th>

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
