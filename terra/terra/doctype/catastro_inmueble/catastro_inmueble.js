// Copyright (c) 2024, AEI and contributors
// For license information, please see license.txt

frappe.ui.form.on("catastro_inmueble", {
    
    refresh: function(frm) {
        frm.add_custom_button('Catastro Base on Propietario', function() {
            frappe.set_route("query-report", "Catastro Contribuyente", { propietario: frm.doc.propietario });
        });
        update_ffl_unificado(frm);
    },

    onload: function(frm) {
        PropietarioTable(frm);
        frm.refresh()
    },

    propietario: function(frm) {
        PropietarioTable(frm)
        frm.refresh()
    },

    valor_del_terreno: function(frm) {
        sumFields(frm);
    },

    valor_de_cultivo: function(frm) {
        sumFields(frm);
    },

    valor_de_construccion: function(frm) {
        sumFields(frm);
    },
    finca: function(frm) {
        update_ffl_unificado(frm);
    },
    folio: function(frm) {
        update_ffl_unificado(frm);
    },
    libro: function(frm) {
        update_ffl_unificado(frm);
    },
    get_total: function(frm) {
        let total = 0;
        let coutas = 0;
        let rows = frm.doc.cc_detalle_table || [];
    
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            if (row.cc_estado === "POR_PAGAR") {
                total += flt(row.cc_monto);
                coutas += 1;
            }
        }
    
        frm.set_value('total', total);
        frm.set_value('coutas', coutas);
    },

});
frappe.ui.form.on('inmueble_copropietario', {
    inmueble_copropietario_add: function(frm, cdt, cdn) {
        var child_row = locals[cdt][cdn];
        child_row.property =frm.name;
        frm.refresh_field(cdt);
    }
});


function PropietarioTable(frm) {
    if (frm.doc.propietario) {
        frappe.db.get_list('catastro_inmueble', {
                filters: {
                    propietario: frm.doc.propietario,
                    name: ['!=', frm.doc.name]
                },
                fields: ['*']
            }).then(inmueble_docs => {
                let inmueble_rows = '';
                if (inmueble_docs.length > 0) {
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
                } else {
                    inmueble_rows = `<tr><td colspan="7" style="padding: 8px; text-align: center; border: 1px solid #ddd;">No data available</td></tr>`;
                }
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
        frappe.db.get_list('catastro_movimiento', {
            filters: {
                new_catastro_inmueble: frm.doc.name,
            },
            fields: ['name', 'propietario', 'fecha_operacion']
        }).then(movimiento_docs => {
            let movimiento_rows = '';
    
            if (movimiento_docs.length > 0) {
                movimiento_docs.forEach(doc => {
                    movimiento_rows += `
                        <tr>
                            <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.name || ""}</td>
                            <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.propietario || ""}</td>
                            <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.fecha_operacion || ""}</td>
                        </tr>`;
                });
            } else {
                movimiento_rows = `<tr><td colspan="3" style="padding: 8px; text-align: center; border: 1px solid #ddd;">No data available</td></tr>`;
            }
            $('[data-fieldname="movimiento"]').html(`
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
                    <thead style="background-color: #f4f4f4;">
                        <tr>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Tipo de Movimiento / Procedencia</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Propietario</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Fecha Operacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${movimiento_rows}
                    </tbody>
                </table>
            `);
        });
        frappe.db.get_list('catastro_licencia', {
            filters: {
                id_catastro: frm.doc.name,
            },
            fields: ['name', 'propietario_inmueble', 'licencia_tipo', 'fecha_finaliza', 'licencia_valor']
        }).then(licencia_docs => {
            let licencia_rows = '';
    
            if (licencia_docs.length > 0) {
                licencia_docs.forEach(doc => {
                    licencia_rows += `
                        <tr>
                            <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.name || ""}</td>
                            <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.propietario_inmueble || ""}</td>
                            <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.licencia_tipo || ""}</td>
                            <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.fecha_finaliza || ""}</td>
                            <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${doc.licencia_valor || ""}</td>
                        </tr>`;
                });
            } else {
                licencia_rows = `<tr><td colspan="5" style="padding: 8px; text-align: center; border: 1px solid #ddd;">No data available</td></tr>`;
            }
            $('[data-fieldname="html_licencia"]').html(`
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
function sumFields(frm) {
    const valor_del_terreno = frm.doc.valor_del_terreno || 0;
    const valor_de_cultivo = frm.doc.valor_de_cultivo || 0;
    const valor_de_construccion = frm.doc.valor_de_construccion || 0;
    const total = valor_del_terreno + valor_de_cultivo + valor_de_construccion;
    frm.set_value('valor_total', total);
}
function update_ffl_unificado(frm) {
    if (frm.doc.finca && frm.doc.folio && frm.doc.libro) {
        frm.set_value('ffl_unificado', `${frm.doc.finca}-${frm.doc.folio}-${frm.doc.libro}`);
    } else {
        frm.set_value('ffl_unificado', '');
    }
}