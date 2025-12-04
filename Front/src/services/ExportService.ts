import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export interface ExportColumn {
  key: string;
  label: string;
  width?: number;
  format?: (value: any) => string;
}

export interface ExportOptions {
  title: string;
  fileName?: string;
  metadata?: {
    total?: number;
    date?: string;
    filters?: string;
  };
}

export class ExportService {
  static validateData(data: any[]): boolean {
    if (!Array.isArray(data)) {
      throw new Error('Los datos deben ser un array');
    }
    if (data.length === 0) {
      throw new Error('No hay datos para exportar');
    }
    return true;
  }

  static generateFileName(baseName: string, extension: string): string {
    const date = new Date().toISOString().split('T')[0];
    return `${baseName}_${date}.${extension}`;
  }

  static exportToPDF(rows: any[], columns: ExportColumn[], options: ExportOptions): void {
    this.validateData(rows);

    const doc = new jsPDF();
    const formattedRows = this.formatRows(rows, columns);

    doc.setFontSize(18);
    doc.text(options.title, 14, 20);

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    
    let yPos = 30;
    if (options.metadata?.total !== undefined) {
      doc.text(`Total de registros: ${options.metadata.total}`, 14, yPos);
      yPos += 6;
    }
    if (options.metadata?.filters) {
      doc.text(`Filtros: ${options.metadata.filters}`, 14, yPos);
      yPos += 6;
    }
    doc.text(`Fecha de generación: ${new Date().toLocaleString('es-CO')}`, 14, yPos);

    const tableStartY = yPos + 8;

    const head = [columns.map(col => col.label)];
    const body = formattedRows.map(row => columns.map(col => row[col.key] || '-'));

    const columnStyles: any = {};
    columns.forEach((col, index) => {
      if (col.width) {
        columnStyles[index] = { cellWidth: col.width };
      }
    });

    (doc as any).autoTable({
      startY: tableStartY,
      head: head,
      body: body,
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [66, 139, 202],
        textColor: 255,
        fontStyle: 'bold',
      },
      columnStyles: columnStyles,
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: tableStartY, left: 14, right: 14 },
    });

    const fileName = this.generateFileName(
      options.fileName || options.title.toLowerCase().replace(/\s+/g, '_'),
      'pdf'
    );
    doc.save(fileName);
  }

  static exportToExcel(rows: any[], columns: ExportColumn[], options: ExportOptions): void {
    this.validateData(rows);

    const formattedRows = this.formatRows(rows, columns);
    
    const wb = XLSX.utils.book_new();
    const wsData: any[][] = [];

    const headers = columns.map(col => col.label);
    wsData.push(headers);

    formattedRows.forEach(row => {
      const rowData = columns.map(col => row[col.key] || '-');
      wsData.push(rowData);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    const colWidths = columns.map(col => ({
      wch: col.width || 15
    }));
    ws['!cols'] = colWidths;

    const headerRange = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!ws[cellAddress]) continue;
      
      ws[cellAddress].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: 'D3E5F5' } },
        alignment: { horizontal: 'center', vertical: 'center' }
      };
    }

    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    const fileName = this.generateFileName(
      options.fileName || options.title.toLowerCase().replace(/\s+/g, '_'),
      'xlsx'
    );
    XLSX.writeFile(wb, fileName);
  }

  private static formatRows(rows: any[], columns: ExportColumn[]): any[] {
    return rows.map(row => {
      const formattedRow: any = {};
      columns.forEach(col => {
        const value = row[col.key];
        formattedRow[col.key] = col.format ? col.format(value) : (value ?? '-');
      });
      return formattedRow;
    });
  }
}

