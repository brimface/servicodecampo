import React, { useContext, useState, useRef } from 'react';
import { NavigationContext } from '../App';
import { BackIcon, CameraIcon, XCircleIcon, TrashIcon } from '../components/icons';

const ExecuteServiceOrderScreen: React.FC<{ serviceOrderId?: string }> = ({ serviceOrderId }) => {
  const { goBack, navigate, serviceOrders } = useContext(NavigationContext);
  const order = serviceOrders.find(o => o.id === serviceOrderId);
  const [images, setImages] = useState<string[]>([
    'https://picsum.photos/id/1062/200/200',
    'https://picsum.photos/id/1070/200/200'
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      // CORREÇÃO: Converte o arquivo para Blob, pois seu tipo não é inferido corretamente.
      const newImageUrls = files.map(file => URL.createObjectURL(file as Blob));
      setImages(prev => [...prev, ...newImageUrls]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };
  
  const handleFinalize = () => {
    alert("Ordem de Serviço Finalizada!");
    navigate('ServiceOrderList');
  }

  if (!order) return null;

  return (
    <div className="flex flex-col h-screen bg-brand-gray-100 dark:bg-brand-gray-800">
      <header className="bg-white dark:bg-brand-gray-700 p-4 shadow-sm sticky top-0 z-10 flex items-center">
        <button onClick={goBack} className="text-brand-gray-600 dark:text-brand-gray-300 mr-4"><BackIcon /></button>
        <div>
          <h1 className="font-semibold text-lg text-brand-gray-800 dark:text-white">OS #{order.osNumber}</h1>
          <p className="text-sm text-brand-gray-500 dark:text-brand-gray-400">{order.client.name}</p>
        </div>
      </header>
      
      <main className="flex-grow overflow-y-auto p-4 space-y-6 pb-24">
        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-2 text-brand-gray-800 dark:text-white">Execução da Ordem de Serviço</h2>
        </div>

        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4">
          <label htmlFor="service-report" className="font-semibold text-brand-gray-800 dark:text-white">Relatório do Serviço</label>
          <textarea
            id="service-report"
            rows={4}
            className="mt-2 w-full p-2 border border-brand-gray-300 dark:border-brand-gray-600 rounded-md focus:ring-brand-blue-DEFAULT focus:border-brand-blue-DEFAULT bg-transparent dark:text-white"
            placeholder="Descreva o trabalho realizado, peças utilizadas e observações..."
          ></textarea>
        </div>

        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4">
          <h3 className="font-semibold text-brand-gray-800 dark:text-white mb-2">Evidências (Fotos)</h3>
          <div className="grid grid-cols-3 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative aspect-square">
                <img src={img} alt={`Evidência ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                <button onClick={() => removeImage(index)} className="absolute -top-1 -right-1 bg-brand-red-DEFAULT text-white rounded-full">
                  <XCircleIcon className="w-6 h-6"/>
                </button>
              </div>
            ))}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-brand-gray-300 dark:border-brand-gray-500 rounded-md text-brand-gray-500 dark:text-brand-gray-400"
            >
              <CameraIcon className="w-8 h-8"/>
              <span className="text-xs mt-1">Adicionar</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4">
            <label htmlFor="status-update" className="font-semibold text-brand-gray-800 dark:text-white">Atualizar Status</label>
            <select id="status-update" defaultValue="CONCLUÍDA" className="mt-2 w-full p-3 border border-brand-gray-300 dark:border-brand-gray-600 rounded-md focus:ring-brand-blue-DEFAULT focus:border-brand-blue-DEFAULT bg-transparent dark:bg-brand-gray-700 dark:text-white">
                <option>CONCLUÍDA</option>
                <option>AGUARDANDO PEÇAS</option>
                <option>PENDENTE</option>
            </select>
        </div>

        <div className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-brand-gray-800 dark:text-white">Aprovação do Cliente</h3>
                <button className="flex items-center text-sm text-brand-blue-DEFAULT font-medium">
                    <TrashIcon className="mr-1"/> Limpar
                </button>
            </div>
            <div className="w-full h-32 bg-brand-gray-50 dark:bg-brand-gray-600 rounded-md flex items-center justify-center text-brand-gray-400 border border-dashed dark:border-brand-gray-500">
                Área de assinatura do cliente
            </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-brand-gray-700 p-4 border-t border-brand-gray-200 dark:border-brand-gray-600 shadow-lg">
        <button onClick={handleFinalize} className="w-full py-3 rounded-lg text-sm font-semibold bg-brand-green-DEFAULT text-white">
            Finalizar Ordem de Serviço
        </button>
      </footer>
    </div>
  );
};

export default ExecuteServiceOrderScreen;