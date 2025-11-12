
import React, { useState, useContext } from 'react';
import { NavigationContext } from '../App';
import { WrenchIcon, EyeIcon, EyeOffIcon } from '../components/icons';

const LoginScreen: React.FC = () => {
  const { navigate } = useContext(NavigationContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('ServiceOrderList');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-gray-100 dark:bg-brand-gray-900 px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="bg-brand-blue-DEFAULT text-white p-4 rounded-lg">
            <WrenchIcon className="w-10 h-10" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-brand-gray-800 dark:text-white">
          Acesso do Técnico
        </h1>
        <p className="text-center text-brand-gray-600 dark:text-brand-gray-400 mt-2 mb-8">
          Bem-vindo. Faça o login para continuar.
        </p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300" htmlFor="email">
              Email / ID do Técnico
            </label>
            <input
              id="email"
              type="text"
              placeholder="Digite seu email ou ID"
              className="mt-1 w-full px-4 py-3 rounded-md border border-brand-gray-300 dark:border-brand-gray-600 focus:ring-brand-blue-DEFAULT focus:border-brand-blue-DEFAULT bg-white dark:bg-brand-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300" htmlFor="password">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                className="mt-1 w-full px-4 py-3 rounded-md border border-brand-gray-300 dark:border-brand-gray-600 focus:ring-brand-blue-DEFAULT focus:border-brand-blue-DEFAULT bg-white dark:bg-brand-gray-700 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-brand-gray-500"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-blue-DEFAULT focus:ring-brand-blue-dark border-brand-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-brand-gray-900 dark:text-brand-gray-200">
                Lembrar-me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-brand-blue-DEFAULT hover:text-brand-blue-dark">
                Esqueceu a senha?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue-DEFAULT hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-DEFAULT"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
      <div className="mt-12 text-center text-sm text-brand-gray-500">
        <p>Versão 1.0.2</p>
      </div>
    </div>
  );
};

export default LoginScreen;
