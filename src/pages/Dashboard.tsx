
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  HardHat, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  TrendingUp,
  Shield,
  Clock
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Dados mock para demonstração
  const metricsData = [
    { title: "Total de Funcionários", value: "156", icon: Users, color: "bg-blue-500", change: "+12%" },
    { title: "EPIs Ativos", value: "342", icon: HardHat, color: "bg-green-500", change: "+8%" },
    { title: "Alertas Pendentes", value: "23", icon: AlertTriangle, color: "bg-red-500", change: "-15%" },
    { title: "Conformidade", value: "94%", icon: CheckCircle, color: "bg-emerald-500", change: "+3%" },
  ];

  const vencimentosData = [
    { mes: 'Jan', vencimentos: 12 },
    { mes: 'Fev', vencimentos: 8 },
    { mes: 'Mar', vencimentos: 15 },
    { mes: 'Abr', vencimentos: 23 },
    { mes: 'Mai', vencimentos: 18 },
    { mes: 'Jun', vencimentos: 32 },
  ];

  const epiStatusData = [
    { name: 'Em Uso', value: 245, color: '#10b981' },
    { name: 'Vencendo', value: 67, color: '#f59e0b' },
    { name: 'Vencidos', value: 23, color: '#ef4444' },
    { name: 'Em Manutenção', value: 7, color: '#6b7280' },
  ];

  const alertasRecentes = [
    { funcionario: "João Silva", epi: "Capacete de Segurança", vencimento: "15/01/2025", tipo: "vencimento" },
    { funcionario: "Maria Santos", epi: "Óculos de Proteção", vencimento: "18/01/2025", tipo: "vencimento" },
    { funcionario: "Pedro Oliveira", epi: "Luvas de Couro", vencimento: "Vencido", tipo: "vencido" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral da segurança do trabalho</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
            <Shield className="h-4 w-4 mr-1" />
            Sistema Ativo
          </Badge>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Calendar className="h-4 w-4 mr-2" />
            Novo Registro
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <Card key={index} className="safety-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.color}`}>
                <metric.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600 font-medium">{metric.change}</span>
                <span className="text-xs text-gray-500 ml-1">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Vencimentos */}
        <Card className="safety-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Vencimentos por Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vencimentosData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vencimentos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Status dos EPIs */}
        <Card className="safety-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardHat className="h-5 w-5 text-green-600" />
              Status dos EPIs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={epiStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {epiStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Recentes */}
      <Card className="safety-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Alertas Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertasRecentes.map((alerta, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${alerta.tipo === 'vencido' ? 'bg-red-100' : 'bg-amber-100'}`}>
                    <Clock className={`h-4 w-4 ${alerta.tipo === 'vencido' ? 'text-red-600' : 'text-amber-600'}`} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{alerta.funcionario}</div>
                    <div className="text-sm text-gray-600">{alerta.epi}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={alerta.tipo === 'vencido' ? 'destructive' : 'secondary'}>
                    {alerta.tipo === 'vencido' ? 'Vencido' : 'Vence em breve'}
                  </Badge>
                  <div className="text-sm text-gray-500 mt-1">{alerta.vencimento}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
