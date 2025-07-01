-- Tabela de Setores
CREATE TABLE IF NOT EXISTS public.setores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.setores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários podem gerenciar setores da sua empresa" ON public.setores
  FOR ALL USING (empresa_id = public.empresa_id());
CREATE TRIGGER handle_setores_updated_at BEFORE UPDATE ON public.setores FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Tabela de Turnos
CREATE TABLE IF NOT EXISTS public.turnos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  hora_inicio TIME,
  hora_fim TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.turnos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários podem gerenciar turnos da sua empresa" ON public.turnos
  FOR ALL USING (empresa_id = public.empresa_id());
CREATE TRIGGER handle_turnos_updated_at BEFORE UPDATE ON public.turnos FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Tabela de Funcionários
CREATE TABLE IF NOT EXISTS public.funcionarios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  nome_completo VARCHAR(255) NOT NULL,
  data_nascimento DATE,
  cpf VARCHAR(14) UNIQUE,
  rg VARCHAR(20),
  genero VARCHAR(50),
  endereco TEXT,
  telefone VARCHAR(20),
  email VARCHAR(255) UNIQUE,
  cargo VARCHAR(255),
  setor_id UUID REFERENCES public.setores(id),
  turno_id UUID REFERENCES public.turnos(id),
  data_admissao DATE,
  data_demissao DATE,
  matricula VARCHAR(50) UNIQUE,
  status VARCHAR(50) DEFAULT 'ativo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.funcionarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários podem gerenciar funcionários da sua empresa" ON public.funcionarios
  FOR ALL USING (empresa_id = public.empresa_id());
CREATE TRIGGER handle_funcionarios_updated_at BEFORE UPDATE ON public.funcionarios FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
