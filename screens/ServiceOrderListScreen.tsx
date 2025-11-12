
import React, { useContext, useState, useMemo } from 'react';
import type { ServiceOrder } from '../types';
import { ServiceOrderStatus } from '../types';
import { NavigationContext } from '../App';
import { SearchIcon, HamburgerMenuIcon, UserIcon, ClockIcon, LocationIcon, WrenchIcon, PlusIcon } from '../components/icons';

const statusStyles: { [key in ServiceOrderStatus]: { bg: string; text: string; border?: string } } = {
  [ServiceOrderStatus.ForStart]: { bg: 'bg-brand-yellow-light', text: 'text-brand-yellow-dark' },
  [ServiceOrderStatus.Started]: { bg: 'bg-brand-blue-light', text: 'text-brand-blue-dark' },
  [ServiceOrderStatus.ForQuote]: { bg: 'bg-brand-red-light', text: 'text-brand-red-dark' },
  [ServiceOrderStatus.QuoteSent]: { bg: 'bg-brand-orange-light', text: 'text-brand-orange-dark' },
  [ServiceOrderStatus.AwaitingParts]: { bg: 'bg-brand-purple-light', text: 'text-brand-purple-dark' },
  [ServiceOrderStatus.Completed]: { bg: 'bg-brand-green-light', text: 'text-brand-green-dark' },
  [ServiceOrderStatus.Pending]: { bg: 'bg-brand-gray-200', text: 'text-brand-gray-700' },
};

const ServiceOrderCard: React.FC<{ order: ServiceOrder }> = ({ order }) => {
  const { navigate } = useContext(NavigationContext);
  const statusStyle = statusStyles[order.status] || statusStyles[ServiceOrderStatus.Pending];

  const getAction = () => {
    switch (order.status) {
      case ServiceOrderStatus.ForStart:
        return { text: "Iniciar Serviço", action: () => navigate('ServiceOrderDetail', { serviceOrderId: order.id }), color: 'bg-brand-blue-DEFAULT hover:bg-brand-blue-dark' };
      case ServiceOrderStatus.Started:
        return { text: "Continuar", action: () => navigate('ExecuteServiceOrder', { serviceOrderId: order.id }), color: 'bg-brand-blue-DEFAULT hover:bg-brand-blue-dark' };
      case ServiceOrderStatus.ForQuote:
        return { text: "Gerar Orçamento", action: () => {}, color: 'bg-brand-red-DEFAULT hover:bg-red-700' };
      case ServiceOrderStatus.QuoteSent:
        return { text: "Ver Orçamento", action: () => {}, color: 'bg-brand-gray-200 text-brand-gray-800 hover:bg-brand-gray-300' };
      case ServiceOrderStatus.AwaitingParts:
        return { text: "Ver Detalhes", action: () => navigate('ServiceOrderDetail', { serviceOrderId: order.id }), color: 'bg-brand-gray-200 text-brand-gray-800 hover:bg-brand-gray-300' };
      case ServiceOrderStatus.Completed:
        return { text: "Ver Relatório", action: () => {}, color: 'bg-brand-gray-200 text-brand-gray-800 hover:bg-brand-gray-300' };
      default:
        return { text: "Ver Detalhes", action: () => navigate('ServiceOrderDetail', { serviceOrderId: order.id }), color: 'bg-brand-gray-200 text-brand-gray-800 hover:bg-brand-gray-300' };
    }
  };
  const action = getAction();

  return (
    <div className={`bg-white dark:bg-brand-gray-700 rounded-lg shadow-md p-4 space-y-3 ${order.status === ServiceOrderStatus.ForQuote ? 'border-l-4 border-brand-red-DEFAULT': ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-brand-gray-800 dark:text-white">OS #{order.osNumber} - {order.client.name}</h3>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyle.bg} ${statusStyle.text}`}>{order.status}</span>
      </div>
      <div className="text-sm text-brand-gray-600 dark:text-brand-gray-300 space-y-2">
        <div className="flex items-center">
            <LocationIcon className="w-4 h-4 mr-2" />
            <span>{order.client.address}</span>
        </div>
        <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-2" />
            <span>{order.date}, {order.time}</span>
        </div>
        <div className="flex items-center">
            <WrenchIcon className="w-4 h-4 mr-2" />
            <span>{order.serviceType}</span>
        </div>
      </div>
      <button onClick={action.action} className={`w-full text-center py-2 rounded-lg font-semibold text-sm transition-colors ${action.color} ${action.color.includes('bg-brand-gray-200') ? '' : 'text-white'}`}>
        {action.text}
      </button>
    </div>
  );
};

const ServiceOrderListScreen: React.FC = () => {
  const { navigate, serviceOrders } = useContext(NavigationContext);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const filters = ['Todos', 'Por Iniciar', 'Iniciada', 'Para Orçamento'];

  const filteredServiceOrders = useMemo(() => {
    let orders = serviceOrders;

    // Apply status filter
    if (activeFilter !== 'Todos') {
      orders = orders.filter(order => order.status === activeFilter);
    }

    // Apply search query
    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      orders = orders.filter(order =>
        order.client.name.toLowerCase().includes(lowercasedQuery) ||
        order.client.address.toLowerCase().includes(lowercasedQuery) ||
        order.osNumber.toLowerCase().includes(lowercasedQuery)
      );
    }

    return orders;
  }, [serviceOrders, activeFilter, searchQuery]);


  return (
    <div className="flex flex-col h-screen bg-brand-gray-100 dark:bg-brand-gray-800">
      <header className="bg-white dark:bg-brand-gray-700 p-4 shadow-sm sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <button className="text-brand-gray-600 dark:text-brand-gray-300">
            <HamburgerMenuIcon />
          </button>
          <h1 className="font-semibold text-lg text-brand-gray-800 dark:text-white">Minhas Ordens de Serviço</h1>
          <button onClick={() => navigate('Profile')} className="text-brand-gray-600 dark:text-brand-gray-300">
            <UserIcon />
          </button>
        </div>
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Buscar por cliente, endereço ou nº da OS"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-brand-gray-300 dark:border-brand-gray-600 bg-brand-gray-100 dark:bg-brand-gray-800 dark:text-white focus:ring-1 focus:ring-brand-blue-DEFAULT focus:border-brand-blue-DEFAULT"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400">
            <SearchIcon />
          </div>
        </div>
      </header>
      
      <div className="p-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === filter ? 'bg-brand-blue-DEFAULT text-white' : 'bg-white dark:bg-brand-gray-700 text-brand-gray-700 dark:text-brand-gray-200'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-grow overflow-y-auto px-4 pb-24 space-y-4">
        {filteredServiceOrders.length > 0 ? (
            filteredServiceOrders.map(order => (
                <ServiceOrderCard key={order.id} order={order} />
            ))
        ) : (
            <div className="text-center py-10">
                <p className="text-brand-gray-600 dark:text-brand-gray-400">Nenhuma ordem de serviço encontrada.</p>
            </div>
        )}
      </main>

      <div className="absolute bottom-6 right-6">
        <button onClick={() => navigate('NewServiceOrder')} className="bg-brand-blue-DEFAULT text-white rounded-full p-4 shadow-lg hover:bg-brand-blue-dark transition-colors">
          <PlusIcon className="w-8 h-8"/>
        </button>
      </div>
    </div>
  );
};

export default ServiceOrderListScreen;
