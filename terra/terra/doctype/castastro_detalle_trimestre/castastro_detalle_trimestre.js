// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("castastro_detalle_trimestre", {
    onload: function(frm) {
        CatastroMovimientoTable(frm);
        frm.refresh();
    },
    id_catastro: function(frm) {
        CatastroMovimientoTable(frm);
        frm.refresh();
    }
});

function CatastroMovimientoTable(frm) {
    if (frm.doc.propietario) {
        frappe.db.get_list('catastro_movimiento', {
            filters: {
                propietario: frm.doc.propietario
            },
            fields: ['*']
        }).then(catastromovimiento_docs => {
            console.log(catastromovimiento_docs);
            let catastromovimiento_rows = '';

            catastromovimiento_docs.forEach(doc => {
                catastromovimiento_rows += `<tr>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.name || ""}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.propietario || ""}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.catastro_movimiento_tipo || ""}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.movimiento_colegiado || ""}</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.movimiento_notario_nombre || ""}</td>
                </tr>`;
            });

            $('[data-fieldname="castastro_movimiento"]').html(`
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
                    <thead style="background-color: #f4f4f4;">
                        <tr>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Catastro Trimestre</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Propietario</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Tipo de Movimiento / Procedencia</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Colegiado</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${catastromovimiento_rows}
                    </tbody>
                </table>
            `);
        });
    }
}
