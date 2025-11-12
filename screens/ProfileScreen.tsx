
import React, { useContext } from 'react';
import { NavigationContext } from '../App';
import { BackIcon, PencilIcon, ChevronRightIcon, KeyIcon, DeviceIcon, NotificationIcon, MoonIcon, HelpIcon, LogoutIcon } from '../components/icons';

interface EditableFieldProps {
  label: string;
  value: string;
  type?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, value, type = "text" }) => (
  <div className="relative">
    <label className="text-xs text-brand-gray-500 dark:text-brand-gray-400">{label}</label>
    <input 
      type={type} 
      defaultValue={value}
      className="w-full bg-transparent border-0 border-b-2 border-brand-gray-200 dark:border-brand-gray-600 focus:ring-0 focus:border-brand-blue-DEFAULT pt-1 pb-2 text-brand-gray-800 dark:text-white"
    />
    <div className="absolute right-2 top-1/2 -translate-y-1/4 text-brand-gray-500">
      <PencilIcon />
    </div>
  </div>
);

interface MenuRowProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  action?: React.ReactNode;
}

const MenuRow: React.FC<MenuRowProps> = ({ icon, label, onClick, action }) => (
  <div onClick={onClick} className="flex items-center justify-between py-4 cursor-pointer">
    <div className="flex items-center">
      <div className="text-brand-gray-600 dark:text-brand-gray-300">{icon}</div>
      <span className="ml-4 font-medium text-brand-gray-800 dark:text-white">{label}</span>
    </div>
    {action || <ChevronRightIcon className="text-brand-gray-400" />}
  </div>
);


const ProfileScreen: React.FC<{ isDarkMode: boolean; toggleDarkMode: () => void; }> = ({ isDarkMode, toggleDarkMode }) => {
  const { goBack, userProfile, navigate } = useContext(NavigationContext);

  const handleLogout = () => {
    // Em um aplicativo real, você limparia os tokens de autenticação aqui
    navigate('Login');
  }

  return (
    <div className="bg-brand-gray-100 dark:bg-brand-gray-800 min-h-screen">
      <header className="bg-white dark:bg-brand-gray-700 p-4 shadow-sm sticky top-0 z-10 flex items-center">
        <button onClick={goBack} className="text-brand-gray-600 dark:text-brand-gray-300 mr-4"><BackIcon /></button>
        <h1 className="font-semibold text-lg text-brand-gray-800 dark:text-white">Perfil e Configurações</h1>
      </header>

      <main className="p-4 pb-28 space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img src={userProfile.avatar} alt="Avatar do Usuário" className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-brand-gray-700" />
            <button className="absolute bottom-0 right-0 bg-brand-blue-DEFAULT text-white p-2 rounded-full border-2 border-white dark:border-brand-gray-700">
              <PencilIcon className="w-5 h-5"/>
            </button>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-brand-gray-800 dark:text-white">{userProfile.name}</h2>
          <p className="text-brand-gray-500 dark:text-brand-gray-400">ID: {userProfile.id}</p>
        </div>

        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4">
          <h3 className="text-sm font-bold text-brand-gray-500 dark:text-brand-gray-400 uppercase tracking-wider mb-4">Informações do Perfil</h3>
          <div className="space-y-6">
            <EditableField label="Nome Completo" value={userProfile.name} />
            <EditableField label="Email" value={userProfile.email} type="email" />
            <EditableField label="Telefone" value={userProfile.phone} type="tel" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4">
          <h3 className="text-sm font-bold text-brand-gray-500 dark:text-brand-gray-400 uppercase tracking-wider mb-2">Gerenciamento da Conta</h3>
          <div className="divide-y divide-brand-gray-200 dark:divide-brand-gray-600">
            <MenuRow icon={<KeyIcon />} label="Alterar Senha" />
            <MenuRow icon={<DeviceIcon />} label="Verificar Dispositivos Conectados" />
          </div>
        </div>

        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4">
          <h3 className="text-sm font-bold text-brand-gray-500 dark:text-brand-gray-400 uppercase tracking-wider mb-2">Configurações do Aplicativo</h3>
          <div className="divide-y divide-brand-gray-200 dark:divide-brand-gray-600">
            <MenuRow icon={<NotificationIcon />} label="Gerenciar Notificações" />
            <MenuRow 
                icon={<MoonIcon />} 
                label="Modo Escuro" 
                action={
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} className="sr-only peer" />
                        <div className="w-11 h-6 bg-brand-gray-200 peer-focus:outline-none rounded-full peer dark:bg-brand-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-blue-DEFAULT"></div>
                    </label>
                }
            />
            <MenuRow icon={<HelpIcon />} label="Ajuda e Suporte" />
          </div>
        </div>
        
        <div className="space-y-3">
             <button className="w-full py-3 rounded-lg text-sm font-semibold bg-brand-blue-DEFAULT text-white">
                Salvar Alterações
            </button>
            <button onClick={handleLogout} className="w-full py-3 rounded-lg text-sm font-semibold bg-transparent border border-brand-red-DEFAULT text-brand-red-DEFAULT flex items-center justify-center">
                <LogoutIcon className="mr-2"/> Sair
            </button>
        </div>

      </main>
    </div>
  );
};

export default ProfileScreen;