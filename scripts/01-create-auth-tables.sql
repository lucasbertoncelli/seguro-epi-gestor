-- Habilita a extensão para gerar UUIDs, se ainda não estiver habilitada.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Função para gerenciar o campo updated_at automaticamente.
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tabela de empresas
CREATE TABLE IF NOT EXISTS public.empresas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) UNIQUE,
  endereco TEXT,
  telefone VARCHAR(20),
  email VARCHAR(255),
  responsavel_sst VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger para o updated_at na tabela empresas
CREATE OR REPLACE TRIGGER handle_empresas_updated_at
  BEFORE UPDATE ON public.empresas
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  empresa_id UUID REFERENCES public.empresas(id) ON DELETE SET NULL,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- CORREÇÃO: Função movida do schema 'auth' para 'public'
-- Função auxiliar para obter o empresa_id do usuário logado.
CREATE OR REPLACE FUNCTION public.empresa_id()
RETURNS UUID AS $$
DECLARE
  empresa_uuid UUID;
BEGIN
  SELECT empresa_id INTO empresa_uuid FROM public.profiles WHERE id = auth.uid();
  RETURN empresa_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função que cria uma empresa e um perfil para cada novo usuário registrado.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_empresa_id UUID;
BEGIN
  INSERT INTO public.empresas (nome)
  VALUES ('Minha Empresa') -- Nome padrão
  RETURNING id INTO new_empresa_id;

  INSERT INTO public.profiles (id, empresa_id, full_name, avatar_url)
  VALUES (NEW.id, new_empresa_id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que executa a função handle_new_user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Habilita a Segurança a Nível de Linha (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
CREATE POLICY "Usuários podem gerenciar seu próprio perfil" ON public.profiles
  FOR ALL USING (id = auth.uid());

CREATE POLICY "Usuários podem gerenciar sua própria empresa" ON public.empresas
  FOR ALL USING (id = public.empresa_id());
