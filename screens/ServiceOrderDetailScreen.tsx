
import React, { useContext } from 'react';
import { NavigationContext } from '../App';
import type { ServiceOrder } from '../types';
import { BackIcon, UserIcon, PhoneIcon, MailIcon, MessageIcon, LocationIcon, WrenchIcon, CalendarIcon, SnowflakeIcon, RefrigeratorIcon, ManageEquipmentIcon, CheckCircleIcon, ClockIcon, PlayIcon } from '../components/icons';

const InfoRow: React.FC<{ icon: React.ReactNode, children: React.ReactNode, actions?: React.ReactNode }> = ({ icon, children, actions }) => (
    <div className="flex items-center py-3">
        <div className="text-brand-gray-500 dark:text-brand-gray-400">{icon}</div>
        <div className="ml-4 text-brand-gray-800 dark:text-white flex-grow">{children}</div>
        {actions && <div className="ml-4 flex space-x-3">{actions}</div>}
    </div>
);

const EquipmentItem: React.FC<{ name: string, model: string, onSelect: () => void }> = ({ name, model, onSelect }) => (
    <div onClick={onSelect} className="flex items-center justify-between py-3 cursor-pointer">
        <div className="flex items-center">
            <div className="p-2 bg-brand-gray-200 dark:bg-brand-gray-600 rounded-lg mr-4">
                {name.toLowerCase().includes('ar') ? <SnowflakeIcon className="w-5 h-5 text-brand-gray-600 dark:text-brand-gray-300"/> : <RefrigeratorIcon className="w-5 h-5 text-brand-gray-600 dark:text-brand-gray-300" />}
            </div>
            <div>
                <p className="font-semibold text-brand-gray-800 dark:text-white">{name}</p>
                <p className="text-sm text-brand-gray-600 dark:text-brand-gray-400">{model}</p>
            </div>
        </div>
        <svg className="w-5 h-5 text-brand-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </div>
);

const HistoryItem: React.FC<{ action: string, date: string }> = ({ action, date }) => (
    <div className="flex items-center py-2">
        <div className="p-2 bg-brand-gray-200 dark:bg-brand-gray-600 rounded-full mr-4">
            {action.includes('atribuído') ? <UserIcon className="w-5 h-5 text-brand-gray-600 dark:text-brand-gray-300"/> : <CheckCircleIcon className="w-5 h-5 text-brand-gray-600 dark:text-brand-gray-300" />}
        </div>
        <div>
            <p className="font-semibold text-brand-gray-800 dark:text-white">{action}</p>
            <p className="text-sm text-brand-gray-600 dark:text-brand-gray-400">{date}</p>
        </div>
    </div>
);

const ServiceOrderDetailScreen: React.FC<{ serviceOrderId?: string }> = ({ serviceOrderId }) => {
  const { goBack, navigate, serviceOrders } = useContext(NavigationContext);
  const order = serviceOrders.find(o => o.id === serviceOrderId);

  if (!order) {
    return (
      <div className="p-4">
        <h1 className="text-red-500">Ordem de Serviço não encontrada.</h1>
        <button onClick={goBack}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="bg-brand-gray-100 dark:bg-brand-gray-800 min-h-screen">
      <header className="bg-white dark:bg-brand-gray-700 p-4 shadow-sm sticky top-0 z-10 flex items-center">
        <button onClick={goBack} className="text-brand-gray-600 dark:text-brand-gray-300 mr-4"><BackIcon /></button>
        <div>
            <h1 className="font-semibold text-lg text-brand-gray-800 dark:text-white">OS #{order.osNumber}</h1>
        </div>
      </header>

      <main className="p-4 pb-28">
        <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-brand-orange-light text-brand-orange-dark">{order.status}</span>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-brand-gray-200 dark:bg-brand-gray-600 text-brand-gray-700 dark:text-brand-gray-200">{order.serviceType}</span>
        </div>

        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4 mb-4">
            <h2 className="font-bold text-lg mb-2 text-brand-gray-800 dark:text-white">Informações do Cliente</h2>
            <div className="divide-y divide-brand-gray-200 dark:divide-brand-gray-600">
                <InfoRow icon={<UserIcon className="w-5 h-5"/>}>{order.client.name}</InfoRow>
                <InfoRow 
                    icon={<PhoneIcon />}
                    actions={
                        <>
                            <button className="text-brand-blue-DEFAULT"><PhoneIcon/></button>
                            <button className="text-brand-blue-DEFAULT"><MessageIcon/></button>
                        </>
                    }
                >
                    {order.client.phone}
                </InfoRow>
                <InfoRow icon={<MailIcon />}>{order.client.email}</InfoRow>
            </div>
        </div>

        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4 mb-4">
            <h2 className="font-bold text-lg mb-2 text-brand-gray-800 dark:text-white">Localização</h2>
            <InfoRow icon={<LocationIcon />}>{order.client.address}</InfoRow>
            <div className="h-32 bg-brand-gray-200 rounded-lg mt-2 overflow-hidden">
                <img src="https://i.imgur.com/uAYh3cm.png" alt="Mapa" className="w-full h-full object-cover" />
            </div>
        </div>

        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4 mb-4">
            <h2 className="font-bold text-lg mb-2 text-brand-gray-800 dark:text-white">Detalhes do Serviço</h2>
            <div className="divide-y divide-brand-gray-200 dark:divide-brand-gray-600">
                <InfoRow icon={<WrenchIcon />}>{order.description}</InfoRow>
                <InfoRow icon={<CalendarIcon />}>Agendado para {order.scheduled.split(' ')[0]}</InfoRow>
                 <InfoRow icon={<ClockIcon />}>{order.scheduled.includes('(') ? order.scheduled.match(/\(([^)]+)\)/)?.[1] : order.time}</InfoRow>
            </div>
        </div>

        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4 mb-4">
            <h2 className="font-bold text-lg mb-2 text-brand-gray-800 dark:text-white">Equipamentos do Cliente</h2>
            <div className="divide-y divide-brand-gray-200 dark:divide-brand-gray-600">
                {order.equipment.map(eq => 
                    <EquipmentItem key={eq.id} name={eq.name} model={eq.model} onSelect={() => navigate('EquipmentDetail', {equipmentId: eq.id})} />
                )}
            </div>
            <button onClick={() => navigate('EquipmentList')} className="mt-4 w-full flex items-center justify-center py-2.5 px-4 rounded-lg border border-brand-gray-300 dark:border-brand-gray-500 text-sm font-semibold text-brand-gray-700 dark:text-brand-gray-200 hover:bg-brand-gray-50 dark:hover:bg-brand-gray-600">
                <ManageEquipmentIcon className="mr-2" /> Gerenciar Equipamentos
            </button>
        </div>

        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-2 text-brand-gray-800 dark:text-white">Histórico</h2>
            <div className="divide-y divide-brand-gray-200 dark:divide-brand-gray-600">
                {order.history.map(h => 
                    <HistoryItem key={h.id} action={h.action} date={h.date} />
                )}
            </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-brand-gray-700 p-4 border-t border-brand-gray-200 dark:border-brand-gray-600 shadow-lg">
        <div className="flex space-x-4">
            <button className="w-1/2 py-3 rounded-lg text-sm font-semibold bg-brand-gray-200 dark:bg-brand-gray-600 text-brand-gray-800 dark:text-white">Navegar</button>
            <button onClick={() => navigate('ExecuteServiceOrder', {serviceOrderId: order.id})} className="w-1/2 py-3 rounded-lg text-sm font-semibold bg-brand-blue-DEFAULT text-white flex items-center justify-center">
                <PlayIcon className="mr-2"/>
                Iniciar Serviço
            </button>
        </div>
      </footer>
    </div>
  );
};

export default ServiceOrderDetailScreen;