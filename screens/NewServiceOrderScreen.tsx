
import React, { useContext, useState } from 'react';
import { NavigationContext } from '../App';
import { serviceOrders } from '../constants';
import { BackIcon } from '../components/icons';

const NewServiceOrderScreen: React.FC = () => {
    const { goBack, equipments } = useContext(NavigationContext);
    const [client, setClient] = useState('');
    const [equipment, setEquipment] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [description, setDescription] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');

    const clients = [...new Set(serviceOrders.map(so => so.client.name))];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Em um aplicativo real, você enviaria esses dados para um servidor
        console.log({
            client,
            equipment,
            serviceType,
            description,
            scheduleDate,
        });
        alert('Nova Ordem de Serviço criada com sucesso!');
        goBack();
    };

    return (
        <div className="flex flex-col h-screen bg-brand-gray-100 dark:bg-brand-gray-800">
            <header className="bg-white dark:bg-brand-gray-700 p-4 shadow-sm sticky top-0 z-10 flex items-center">
                <button onClick={goBack} className="text-brand-gray-600 dark:text-brand-gray-300 mr-4"><BackIcon /></button>
                <h1 className="font-semibold text-lg text-brand-gray-800 dark:text-white">Nova Ordem de Serviço</h1>
            </header>

            <main className="flex-grow overflow-y-auto p-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4 space-y-4">
                        <div>
                            <label htmlFor="client" className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300">Cliente</label>
                            <select
                                id="client"
                                value={client}
                                onChange={(e) => setClient(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-brand-gray-300 dark:border-brand-gray-600 focus:outline-none focus:ring-brand-blue-DEFAULT focus:border-brand-blue-DEFAULT sm:text-sm rounded-md bg-transparent dark:bg-brand-gray-700 dark:text-white"
                                required
                            >
                                <option value="">Selecione um cliente</option>
                                {clients.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="equipment" className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300">Equipamento</label>
                            <select
                                id="equipment"
                                value={equipment}
                                onChange={(e) => setEquipment(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-brand-gray-300 dark:border-brand-gray-600 focus:outline-none focus:ring-brand-blue-DEFAULT focus:border-brand-blue-DEFAULT sm:text-sm rounded-md bg-transparent dark:bg-brand-gray-700 dark:text-white"
                                required
                            >
                                <option value="">Selecione um equipamento</option>
                                {equipments.map(e => <option key={e.id} value={e.id}>{e.name} ({e.serial})</option>)}
                            </select>
                             <p className="mt-1 text-xs text-brand-gray-500 dark:text-brand-gray-400">Em um app real, esta lista seria filtrada pelo cliente selecionado.</p>
                        </div>
                    </div>
                    
                     <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4 space-y-4">
                        <div>
                            <label htmlFor="serviceType" className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300">Tipo de Serviço</label>
                            <input
                                type="text"
                                id="serviceType"
                                value={serviceType}
                                onChange={(e) => setServiceType(e.target.value)}
                                placeholder="Ex: Manutenção Preventiva"
                                className="mt-1 w-full px-3 py-2 rounded-md border border-brand-gray-300 dark:border-brand-gray-600 focus:ring-brand-blue-DEFAULT focus:border-brand-blue-DEFAULT bg-transparent dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300">Descrição do Problema</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                placeholder="Descreva o problema ou o serviço a ser realizado..."
                                className="mt-1 w-full p-2 border border-brand-gray-300 dark:border-brand-gray-600 rounded-md focus:ring-brand-blue-DEFAULT focus:border-brand-blue-DEFAULT bg-transparent dark:text-white"
                                required
                            ></textarea>
                        </div>
                         <div>
                            <label htmlFor="scheduleDate" className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300">Data de Agendamento</label>
                            <input
                                type="date"
                                id="scheduleDate"
                                value={scheduleDate}
                                onChange={(e) => setScheduleDate(e.target.value)}
                                className="mt-1 w-full px-3 py-2 rounded-md border border-brand-gray-300 dark:border-brand-gray-600 focus:ring-brand-blue-DEFAULT focus:border-brand-blue-DEFAULT bg-transparent dark:text-white"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="pt-4">
                       <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue-DEFAULT hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-DEFAULT"
                        >
                            Criar Ordem de Serviço
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default NewServiceOrderScreen;