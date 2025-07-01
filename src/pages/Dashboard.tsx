
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Sistema de Controle de EPIs
        </h1>
        <p className="text-gray-600">
          Bem-vindo ao sistema de gestão de equipamentos de proteção individual
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Funcionários</h3>
          <p className="text-gray-600">Gerenciar funcionários e suas informações</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">EPIs</h3>
          <p className="text-gray-600">Controlar equipamentos de proteção</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Relatórios</h3>
          <p className="text-gray-600">Visualizar relatórios e estatísticas</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
