import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Reserva, Funcion, Pelicula } from '@/api/api';

// Tipo para los datos formateados de reserva
export type ReservaExportData = {
  id: string;
  cliente: string;
  funcion: string;
  asientos: string;
  cantidad: number;
  estado: string;
  fechaCreacion: string;
};

/**
 * Formatea las reservas para exportación
 */
export function formatReservasForExport(
  reservas: Reserva[],
  funciones: Funcion[],
  peliculas: Pelicula[]
): ReservaExportData[] {
  return reservas.map((r) => {
    const funcion = funciones.find((f) => f.id === r.funcionId);
    const pelicula = funcion
      ? peliculas.find((p) => p.id === funcion.peliculaId)
      : null;

    const funcionInfo = funcion && pelicula
      ? `${pelicula.titulo} - ${funcion.fecha} ${funcion.hora}`
      : `ID: ${r.funcionId}`;

    return {
      id: r.id?.toString() || '-',
      cliente: r.nombreCliente || '-',
      funcion: funcionInfo,
      asientos: r.asientos?.join(', ') || '-',
      cantidad: r.cantidad || 0,
      estado: r.estado || 'CREADA',
      fechaCreacion: r.createdAt
        ? new Date(r.createdAt).toLocaleString('es-CO')
        : '-',
    };
  });
}

/**
 * Exporta las reservas a PDF
 */
export function exportReservasToPDF(
  reservas: Reserva[],
  funciones: Funcion[],
  peliculas: Pelicula[]
): void {
  if (reservas.length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  const doc = new jsPDF();
  const formattedData = formatReservasForExport(reservas, funciones, peliculas);

  // Título del documento
  doc.setFontSize(18);
  doc.text('Reporte de Reservas', 14, 20);

  // Información adicional
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text(`Total de reservas: ${reservas.length}`, 14, 30);
  doc.text(
    `Fecha de generación: ${new Date().toLocaleString('es-CO')}`,
    14,
    36
  );

  // Tabla
  (doc as any).autoTable({
    startY: 42,
    head: [
      [
        'ID',
        'Cliente',
        'Función',
        'Asientos',
        'Cantidad',
        'Estado',
        'Fecha de Creación',
      ],
    ],
    body: formattedData.map((r) => [
      r.id,
      r.cliente,
      r.funcion,
      r.asientos,
      r.cantidad.toString(),
      r.estado,
      r.fechaCreacion,
    ]),
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [66, 139, 202], // Color azul para el header
      textColor: 255,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 20 }, // ID
      1: { cellWidth: 40 }, // Cliente
      2: { cellWidth: 50 }, // Función
      3: { cellWidth: 30 }, // Asientos
      4: { cellWidth: 25 }, // Cantidad
      5: { cellWidth: 30 }, // Estado
      6: { cellWidth: 40 }, // Fecha
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 42, left: 14, right: 14 },
  });

  // Guardar el PDF
  const fileName = `Reservas_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}

/**
 * Exporta las reservas a Excel
 */
export function exportReservasToExcel(
  reservas: Reserva[],
  funciones: Funcion[],
  peliculas: Pelicula[]
): void {
  if (reservas.length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  const formattedData = formatReservasForExport(reservas, funciones, peliculas);

  // Crear workbook y worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(formattedData);

  // Ajustar anchos de columnas
  const colWidths = [
    { wch: 8 },  // ID
    { wch: 25 }, // Cliente
    { wch: 40 }, // Función
    { wch: 25 }, // Asientos
    { wch: 10 }, // Cantidad
    { wch: 15 }, // Estado
    { wch: 25 }, // Fecha de Creación
  ];
  ws['!cols'] = colWidths;

  // Agregar worksheet al workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Reservas');

  // Generar archivo Excel
  const fileName = `Reservas_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

