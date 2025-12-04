import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductosApi, Producto } from '@/api/api';
import { Table, THead, TBody, TH, TD } from '@/components/ui/Table';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { ExportService } from '@/services/ExportService';

export default function ProductosListPage() {
  const [data, setData] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const list = await ProductosApi.listar();
      setData(list);
    } catch (e: any) {
      setError(e?.message ?? 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const eliminar = async (id: number) => {
    if (!confirm('¿Eliminar producto?')) return;
    try {
      await ProductosApi.eliminar(id);
      await load();
    } catch (e: any) {
      setError(e?.message ?? 'Error al eliminar');
    }
  };

  const handleExportPDF = () => {
    if (data.length === 0) {
      setError('No hay datos para exportar');
      return;
    }
    try {
      ExportService.exportToPDF(
        data,
        [
          { key: 'id', label: 'ID', width: 20 },
          { key: 'nombre', label: 'Nombre', width: 40 },
          { key: 'precio', label: 'Precio', width: 30, format: (v) => `$${v.toFixed(2)}` },
          { key: 'stock', label: 'Stock', width: 25 }
        ],
        {
          title: 'Reporte de Productos',
          fileName: 'productos',
          metadata: { total: data.length }
        }
      );
    } catch (error: any) {
      setError(error?.message ?? 'Error al exportar a PDF');
    }
  };

  const handleExportExcel = () => {
    if (data.length === 0) {
      setError('No hay datos para exportar');
      return;
    }
    try {
      ExportService.exportToExcel(
        data,
        [
          { key: 'id', label: 'ID', width: 10 },
          { key: 'nombre', label: 'Nombre', width: 30 },
          { key: 'precio', label: 'Precio', width: 15, format: (v) => `$${v.toFixed(2)}` },
          { key: 'stock', label: 'Stock', width: 12 }
        ],
        {
          title: 'Reporte de Productos',
          fileName: 'productos',
          metadata: { total: data.length }
        }
      );
    } catch (error: any) {
      setError(error?.message ?? 'Error al exportar a Excel');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Productos</h1>
        <div className="flex items-center gap-3">
          {data.length > 0 && (
            <>
              <Button 
                onClick={handleExportPDF} 
                variant="ghost" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors"
              >
                <span>📄</span>
                PDF
              </Button>
              <Button 
                onClick={handleExportExcel} 
                variant="ghost" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors"
              >
                <span>📊</span>
                Excel
              </Button>
            </>
          )}
          <Button 
            onClick={() => navigate('/productos/nuevo')}
            className="px-4 py-2 rounded-md transition-colors"
          >
            Nuevo
          </Button>
        </div>
      </div>
      {error && <ErrorAlert message={error} />}
      <div className="overflow-x-auto">
        <Table>
          <THead>
            <tr>
              <TH>ID</TH>
              <TH>Nombre</TH>
              <TH>Precio</TH>
              <TH>Stock</TH>
              <TH></TH>
            </tr>
          </THead>
          <TBody>
            {data.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-neutral-900">
                <TD>{p.id}</TD>
                <TD><Link to={`/productos/${p.id}`} className="underline">{p.nombre}</Link></TD>
                <TD>${p.precio.toFixed(2)}</TD>
                <TD>{p.stock}</TD>
                <TD>
                  <div className="flex items-center gap-2">
                    <Link 
                      to={`/productos/${p.id}/editar`} 
                      className="btn-primary px-3 py-1.5 rounded-md transition-colors"
                    >
                      Editar
                    </Link>
                    <Button 
                      variant="ghost" 
                      onClick={() => eliminar(p.id!)}
                      className="px-3 py-1.5 rounded-md transition-colors"
                    >
                      Eliminar
                    </Button>
                  </div>
                </TD>
              </tr>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  );
}


