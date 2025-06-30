
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Download, 
  Calendar,
  FileText,
  PieChart,
  TrendingUp,
  Users,
  HardHat,
  AlertTriangle,
  Shield
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const Relatorios = () => {
  // Dados mock para relatórios
  const conformidadeData = [
    { mes: 'Jan', conformidade: 92, meta: 95 },
    { mes: 'Fev', conformidade: 88, meta: 95 },
    { mes: 'Mar', conformidade: 94, meta: 95 },
    { mes: 'Abr', conformidade: 96, meta: 95 },
    { mes: 'Mai', conformidade: 93, meta: 95 },
    { mes: 'Jun', conformidade: 97, meta: 95 },
  ];

  const episPorSetorData = [
    { setor: 'Produção', quantidade: 145 },
    { setor: 'Manutenção', quantidade: 89 },
    { setor: 'Logística', quantidade: 67 },
    { setor: 'Qualidade', quantidade: 34 },
    { setor: 'Administração', quantidade: 12 },
  ];

  const custosPorCategoriaData = [
    { categoria: 'Proteção da Cabeça', valor: 15420, cor: '#3b82f6' },
    { categoria: 'Proteção das Mãos', valor: 8930, cor: '#10b981' },
    { categoria: 'Proteção dos Olhos', valor: 6750, cor: '#f59e0b' },
    { categoria: 'Proteção Respiratória', valor: 12340, cor: '#ef4444' },
    { categoria: 'Proteção Auditiva', valor: 4560, cor: '#8b5cf6' },
  ];

  const relatoriosDisponiveis = [
    {
      titulo: "Relatório de Conformidade Mensal",
      descricao: "Análise completa da conformidade dos EPIs por funcionário e setor",
      dataGeracao: "Hoje, 14:30",
      status: "disponível",
      icon: Shield,
      cor: "bg-green-100 text-green-700"
    },
    {
      titulo: "Relatório de Vencimentos",
      descricao: "Lista de EPIs com vencimento nos próximos 30 dias",
      dataGeracao: "Ontem, 16:45",
      status: "disponível",
      icon: Calendar,
      cor: "bg-amber-100 text-amber-700"
    },
    {
      titulo: "Análise de Custos por Período",
      descricao: "Relatório financeiro detalhado dos investimentos em EPIs",
      dataGeracao: "2 dias atrás",
      status: "disponível",
      icon: TrendingUp,
      cor: "bg-blue-100 text-blue-700"
    },
    {
      titulo: "Relatório de Não Conformidades",
      descricao: "Listagem de ocorrências e não conformidades identificadas",
      dataGeracao: "Processando...",
      status: "processando",
      icon: AlertTriangle,
      cor: "bg-red-100 text-red-700"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            Relatórios e Analytics
          </h1>
          <p className="text-gray-600 mt-1">Análises detalhadas e relatórios de segurança do trabalho</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Período
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Exportar Tudo
          </Button>
        </div>
      </div>

      {/* Métricas Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conformidade Atual</p>
                <p className="text-2xl font-bold text-green-600">97%</p>
                <p className="text-xs text-green-600">+3% vs mês anterior</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">EPIs Distribuídos</p>
                <p className="text-2xl font-bold text-blue-600">347</p>
                <p className="text-xs text-blue-600">Este mês</p>
              </div>
              <HardHat className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Custo Total</p>
                <p className="text-2xl font-bold text-purple-600">R$ 48.000</p>
                <p className="text-xs text-purple-600">Últimos 6 meses</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Reposição</p>
                <p className="text-2xl font-bold text-amber-600">12%</p>
                <p className="text-xs text-amber-600">Mensal</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Conformidade */}
        <Card className="safety-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Evolução da Conformidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conformidadeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="conformidade" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Conformidade (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="meta" 
                  stroke="#ef4444" 
                  strokeDasharray="5 5"
                  name="Meta (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico EPIs por Setor */}
        <Card className="safety-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              EPIs por Setor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={episPorSetorData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="setor" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Custos */}
      <Card className="safety-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-purple-600" />
            Distribuição de Custos por Categoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={custosPorCategoriaData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="valor"
                  label={({ categoria, percent }) => `${categoria} ${(percent * 100).toFixed(0)}%`}
                >
                  {custosPorCategoriaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
              </RechartsPieChart>
            </ResponsiveContainer>
            
            <div className="space-y-4">
              {custosPorCategoriaData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.cor }}
                    ></div>
                    <span className="font-medium text-gray-900">{item.categoria}</span>
                  </div>
                  <span className="font-bold text-gray-900">R$ {item.valor.toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>R$ {custosPorCategoriaData.reduce((acc, item) => acc + item.valor, 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Relatórios Disponíveis */}
      <Card className="safety-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-700" />
            Relatórios Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {relatoriosDisponiveis.map((relatorio, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${relatorio.cor}`}>
                      <relatorio.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{relatorio.titulo}</h4>
                      <p className="text-sm text-gray-600 mt-1">{relatorio.descricao}</p>
                      <p className="text-xs text-gray-500 mt-2">{relatorio.dataGeracao}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant={relatorio.status === 'disponível' ? 'default' : 'secondary'}>
                      {relatorio.status === 'disponível' ? 'Disponível' : 'Processando'}
                    </Badge>
                    {relatorio.status === 'disponível' && (
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Baixar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;
