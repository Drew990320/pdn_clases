import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UsuariosApi, Usuario } from '@/api/api';
import { Table, THead, TBody, TH, TD } from '@/components/ui/Table';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { ExportService } from '@/services/ExportService';

export default function UsuariosListPage() {
  const [data, setData] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const list = await UsuariosApi.listar();
      setData(list);
    } catch (e: any) {
      setError(e?.message ?? 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

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
          { key: 'email', label: 'Email', width: 50 },
          { key: 'nombre', label: 'Nombre', width: 40, format: (v) => v || '-' },
          { key: 'enabled', label: 'Estado', width: 30, format: (v) => v ? 'Activo' : 'Inactivo' }
        ],
        {
          title: 'Reporte de Usuarios',
          fileName: 'usuarios',
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
          { key: 'email', label: 'Email', width: 35 },
          { key: 'nombre', label: 'Nombre', width: 30, format: (v) => v || '-' },
          { key: 'enabled', label: 'Estado', width: 15, format: (v) => v ? 'Activo' : 'Inactivo' }
        ],
        {
          title: 'Reporte de Usuarios',
          fileName: 'usuarios',
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
        <h1 className="text-xl font-semibold">Usuarios</h1>
        {data.length > 0 && (
          <div className="flex items-center gap-3">
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
          </div>
        )}
      </div>
      {error && <ErrorAlert message={error} />}
      <div className="overflow-x-auto">
        <Table>
          <THead>
            <tr>
              <TH>ID</TH>
              <TH>Email</TH>
              <TH>Nombre</TH>
              <TH>Estado</TH>
              <TH></TH>
            </tr>
          </THead>
          <TBody>
            {data.map(u => (
              <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-neutral-900">
                <TD>{u.id}</TD>
                <TD><Link to={`/usuarios/${u.id}`} className="underline">{u.email}</Link></TD>
                <TD>{u.nombre ?? '-'}</TD>
                <TD>{u.enabled ? 'Activo' : 'Inactivo'}</TD>
                <TD>
                  <div className="flex items-center gap-2">
                    <Link 
                      to={`/usuarios/${u.id}/editar`} 
                      className="btn-primary px-3 py-1.5 rounded-md transition-colors"
                    >
                      Editar
                    </Link>
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


