
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Eye,
  HardHat,
  MapPin,
  Calendar
} from "lucide-react";

const Funcionarios = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Dados mock para demonstração
  const funcionarios = [
    {
      id: 1,
      nome: "João Silva",
      cargo: "Soldador",
      setor: "Produção",
      dataAdmissao: "15/03/2022",
      status: "ativo",
      episAtivos: 8,
      episVencendo: 2,
      foto: "JS"
    },
    {
      id: 2,
      nome: "Maria Santos",
      cargo: "Operadora de Máquina",
      setor: "Produção",
      dataAdmissao: "22/07/2021",
      status: "ativo",
      episAtivos: 6,
      episVencendo: 1,
      foto: "MS"
    },
    {
      id: 3,
      nome: "Pedro Oliveira",
      cargo: "Técnico de Manutenção",
      setor: "Manutenção",
      dataAdmissao: "10/01/2023",
      status: "ativo",
      episAtivos: 12,
      episVencendo: 0,
      foto: "PO"
    },
    {
      id: 4,
      nome: "Ana Costa",
      cargo: "Supervisora",
      setor: "Qualidade",
      dataAdmissao: "05/11/2020",
      status: "férias",
      episAtivos: 5,
      episVencendo: 1,
      foto: "AC"
    },
    {
      id: 5,
      nome: "Carlos Ferreira",
      cargo: "Operador de Empilhadeira",
      setor: "Logística",
      dataAdmissao: "18/09/2022",
      status: "ativo",
      episAtivos: 9,
      episVencendo: 3,
      foto: "CF"
    }
  ];

  const filteredFuncionarios = funcionarios.filter(funcionario =>
    funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    funcionario.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    funcionario.setor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800 border-green-200';
      case 'férias': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'afastado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            Funcionários
          </h1>
          <p className="text-gray-600 mt-1">Gerencie funcionários e seus EPIs</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Funcionário
        </Button>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{funcionarios.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {funcionarios.filter(f => f.status === 'ativo').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">EPIs Vencendo</p>
                <p className="text-2xl font-bold text-amber-600">
                  {funcionarios.reduce((acc, f) => acc + f.episVencendo, 0)}
                </p>
              </div>
              <HardHat className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Setores</p>
                <p className="text-2xl font-bold text-purple-600">
                  {[...new Set(funcionarios.map(f => f.setor))].length}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
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
                placeholder="Buscar funcionário, cargo ou setor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filtros</Button>
            <Button variant="outline">Exportar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Funcionários */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFuncionarios.map((funcionario) => (
          <Card key={funcionario.id} className="safety-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {funcionario.foto}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{funcionario.nome}</CardTitle>
                    <p className="text-sm text-gray-600">{funcionario.cargo}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(funcionario.status)}>
                  {funcionario.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {funcionario.setor}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Admissão: {funcionario.dataAdmissao}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{funcionario.episAtivos}</div>
                  <div className="text-xs text-gray-600">EPIs Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-amber-600">{funcionario.episVencendo}</div>
                  <div className="text-xs text-gray-600">Vencendo</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <HardHat className="h-4 w-4 mr-1" />
                  EPIs
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Funcionarios;
