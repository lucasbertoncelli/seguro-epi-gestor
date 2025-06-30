
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  HardHat, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Calendar
} from "lucide-react";

const EPIs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Dados mock para demonstração
  const epis = [
    {
      id: 1,
      nome: "Capacete de Segurança Classe A",
      categoria: "Proteção da Cabeça",
      funcionario: "João Silva",
      dataEntrega: "15/03/2024",
      dataVencimento: "15/03/2025",
      status: "ativo",
      ca: "CA 31469",
      lote: "LT2024001",
      fornecedor: "3M do Brasil"
    },
    {
      id: 2,
      nome: "Óculos de Proteção Ampla Visão",
      categoria: "Proteção dos Olhos",
      funcionario: "Maria Santos",
      dataEntrega: "22/02/2024",
      dataVencimento: "22/02/2025",
      status: "vencendo",
      ca: "CA 35799",
      lote: "LT2024015",
      fornecedor: "Honeywell"
    },
    {
      id: 3,
      nome: "Luvas de Couro Vaqueta",
      categoria: "Proteção das Mãos",
      funcionario: "Pedro Oliveira",
      dataEntrega: "10/01/2024",
      dataVencimento: "10/01/2025",
      status: "vencido",
      ca: "CA 27891",
      lote: "LT2024032",
      fornecedor: "Danny EPI"
    },
    {
      id: 4,
      nome: "Protetor Auricular Tipo Concha",
      categoria: "Proteção Auditiva",
      funcionario: "Ana Costa",
      dataEntrega: "05/04/2024",
      dataVencimento: "05/04/2025",
      status: "ativo",
      ca: "CA 19626",
      lote: "LT2024045",
      fornecedor: "MSA Brasil"
    },
    {
      id: 5,
      nome: "Respirador PFF2",
      categoria: "Proteção Respiratória",
      funcionario: "Carlos Ferreira",
      dataEntrega: "18/05/2024",
      dataVencimento: "18/08/2024",
      status: "vencido",
      ca: "CA 42356",
      lote: "LT2024067",
      fornecedor: "Alltec"
    }
  ];

  const filteredEpis = epis.filter(epi =>
    epi.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    epi.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    epi.funcionario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    epi.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'ativo': 
        return { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          icon: CheckCircle, 
          iconColor: 'text-green-600',
          label: 'Ativo'
        };
      case 'vencendo': 
        return { 
          color: 'bg-amber-100 text-amber-800 border-amber-200', 
          icon: Clock, 
          iconColor: 'text-amber-600',
          label: 'Vencendo'
        };
      case 'vencido': 
        return { 
          color: 'bg-red-100 text-red-800 border-red-200', 
          icon: AlertTriangle, 
          iconColor: 'text-red-600',
          label: 'Vencido'
        };
      default: 
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200', 
          icon: Clock, 
          iconColor: 'text-gray-600',
          label: 'Indefinido'
        };
    }
  };

  const calcularDiasVencimento = (dataVencimento: string) => {
    const hoje = new Date();
    const vencimento = new Date(dataVencimento.split('/').reverse().join('-'));
    const diffTime = vencimento.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <HardHat className="h-8 w-8 text-blue-600" />
            Controle de EPIs
          </h1>
          <p className="text-gray-600 mt-1">Gerencie todos os equipamentos de proteção individual</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo EPI
        </Button>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de EPIs</p>
                <p className="text-2xl font-bold text-gray-900">{epis.length}</p>
              </div>
              <HardHat className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {epis.filter(e => e.status === 'ativo').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vencendo</p>
                <p className="text-2xl font-bold text-amber-600">
                  {epis.filter(e => e.status === 'vencendo').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vencidos</p>
                <p className="text-2xl font-bold text-red-600">
                  {epis.filter(e => e.status === 'vencido').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="safety-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar EPI, funcionário ou fornecedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Por Status</Button>
            <Button variant="outline">Por Categoria</Button>
            <Button variant="outline">Exportar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de EPIs */}
      <div className="space-y-4">
        {filteredEpis.map((epi) => {
          const statusInfo = getStatusInfo(epi.status);
          const diasVencimento = calcularDiasVencimento(epi.dataVencimento);
          
          return (
            <Card key={epi.id} className="safety-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <HardHat className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg text-gray-900">{epi.nome}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{epi.categoria}</span>
                        <span>•</span>
                        <span>{epi.funcionario}</span>
                        <span>•</span>
                        <span>CA: {epi.ca}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Vencimento</div>
                      <div className="font-medium text-gray-900">{epi.dataVencimento}</div>
                      {epi.status !== 'vencido' && (
                        <div className="text-xs text-gray-500">
                          {diasVencimento > 0 ? `${diasVencimento} dias` : 'Vencido'}
                        </div>
                      )}
                    </div>
                    
                    <Badge className={statusInfo.color}>
                      <statusInfo.icon className="h-3 w-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Entrega: {epi.dataEntrega}</span>
                      </div>
                      <div>Lote: {epi.lote}</div>
                      <div>Fornecedor: {epi.fornecedor}</div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Detalhes
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EPIs;
