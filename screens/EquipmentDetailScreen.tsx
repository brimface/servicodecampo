
import React, { useContext } from 'react';
import { NavigationContext } from '../App';
import type { Equipment } from '../types';
import { BackIcon, MoreIcon, SnowflakeIcon, DocumentIcon, PdfIcon, OpenIcon, DownloadIcon, PlusIcon, InfoIcon } from '../components/icons';

const AttachmentCard: React.FC<{ attachment: Equipment['attachments'][0] }> = ({ attachment }) => (
    <div className="bg-brand-gray-100 dark:bg-brand-gray-800 rounded-lg p-4 mb-3">
        <div className="flex justify-between items-start">
            <div className="flex items-start">
                <DocumentIcon className="w-10 h-10 text-brand-gray-500 mr-3" />
                <div>
                    <p className="font-semibold text-brand-gray-800 dark:text-white">{attachment.name}</p>
                    <p className="text-sm text-brand-gray-500 dark:text-brand-gray-400">{attachment.size} - {attachment.date}</p>
                </div>
            </div>
            <button className="text-brand-gray-500"><MoreIcon /></button>
        </div>
        <div className="flex items-center justify-center h-24 my-3 bg-white dark:bg-brand-gray-700 rounded">
            <div className="text-center text-brand-gray-400">
                <PdfIcon className="w-10 h-10 mx-auto" />
                <p className="text-xs mt-1">Pré-visualização do PDF</p>
            </div>
        </div>
        <div className="flex space-x-2">
            <button className="w-1/2 flex items-center justify-center py-2 text-sm font-medium rounded-lg border border-brand-gray-300 dark:border-brand-gray-600 text-brand-gray-700 dark:text-brand-gray-200 hover:bg-brand-gray-200 dark:hover:bg-brand-gray-600">
                <OpenIcon className="mr-2" /> Abrir
            </button>
            <button className="w-1/2 flex items-center justify-center py-2 text-sm font-medium rounded-lg bg-brand-blue-DEFAULT text-white hover:bg-brand-blue-dark">
                <DownloadIcon className="mr-2" /> Baixar
            </button>
        </div>
    </div>
);

const ServiceHistoryCard: React.FC<{ record: Equipment['serviceHistory'][0] }> = ({ record }) => (
    <div className="py-3">
        <div className="flex justify-between items-center text-sm">
            <p className="font-bold text-brand-gray-800 dark:text-white">{record.title}</p>
            <p className="text-brand-gray-500 dark:text-brand-gray-400">{record.date}</p>
        </div>
        <p className="text-sm text-brand-gray-600 dark:text-brand-gray-300 mt-1">Técnico: {record.technician}</p>
        <p className="text-sm text-brand-gray-600 dark:text-brand-gray-300 mt-1">Observações: {record.observations}</p>
    </div>
);

const EquipmentDetailScreen: React.FC<{ equipmentId?: string }> = ({ equipmentId }) => {
  const { goBack, equipments } = useContext(NavigationContext);
  const equipment = equipments.find(e => e.id === equipmentId);

  if (!equipment) return null;

  return (
    <div className="bg-brand-gray-100 dark:bg-brand-gray-800 min-h-screen">
      <header className="bg-white dark:bg-brand-gray-700 p-4 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center">
            <button onClick={goBack} className="text-brand-gray-600 dark:text-brand-gray-300 mr-4"><BackIcon /></button>
            <h1 className="font-semibold text-lg text-brand-gray-800 dark:text-white">Detalhes do Equipamento</h1>
        </div>
        <button className="text-brand-gray-600 dark:text-brand-gray-300"><MoreIcon /></button>
      </header>

      <main className="p-4 pb-28">
        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4 mb-4">
            <div className="flex items-start justify-between">
                <div className="flex items-start">
                    <div className="p-3 bg-brand-gray-100 dark:bg-brand-gray-600 rounded-lg mr-4">
                        <SnowflakeIcon className="w-8 h-8 text-brand-gray-600 dark:text-brand-gray-300"/>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-brand-gray-800 dark:text-white">{equipment.name}</h2>
                        <p className="text-sm text-brand-gray-500 dark:text-brand-gray-400">Série: {equipment.serial} | Modelo: {equipment.model}</p>
                    </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${equipment.status === 'Ativo' ? 'bg-brand-green-light text-brand-green-dark' : 'bg-brand-red-light text-brand-red-dark'}`}>
                    {equipment.status}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                    <p className="text-brand-gray-500 dark:text-brand-gray-400">Localização</p>
                    <p className="font-medium text-brand-gray-800 dark:text-white">{equipment.location}</p>
                </div>
                <div>
                    <p className="text-brand-gray-500 dark:text-brand-gray-400">Instalação</p>
                    <p className="font-medium text-brand-gray-800 dark:text-white">{equipment.installDate}</p>
                </div>
                <div>
                    <p className="text-brand-gray-500 dark:text-brand-gray-400">Última Manutenção</p>
                    <p className="font-medium text-brand-gray-800 dark:text-white">{equipment.lastMaintenance}</p>
                </div>
                <div>
                    <p className="text-brand-gray-500 dark:text-brand-gray-400">Próxima Manutenção</p>
                    <p className="font-medium text-brand-gray-800 dark:text-white">{equipment.nextMaintenance}</p>
                </div>
            </div>
        </div>

        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-brand-gray-800 dark:text-white">Anexos</h3>
                <button className="text-sm font-medium text-brand-blue-DEFAULT">Adicionar</button>
            </div>
            {equipment.attachments.map(att => <AttachmentCard key={att.id} attachment={att} />)}
        </div>

        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4">
            <h3 className="text-lg font-bold text-brand-gray-800 dark:text-white mb-2">Histórico de Serviços</h3>
            <div className="divide-y divide-brand-gray-200 dark:divide-brand-gray-600">
                {equipment.serviceHistory.map(rec => <ServiceHistoryCard key={rec.id} record={rec} />)}
            </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-brand-gray-700 p-4 border-t border-brand-gray-200 dark:border-brand-gray-600 shadow-lg">
        <button className="w-full py-3 rounded-lg text-sm font-semibold bg-brand-blue-DEFAULT text-white flex items-center justify-center">
            <InfoIcon className="mr-2"/>
            Nova Ordem de Serviço
        </button>
      </footer>
    </div>
  );
};

export default EquipmentDetailScreen;
