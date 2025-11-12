
import React, { useContext, useState, useMemo } from 'react';
import type { Equipment } from '../types';
import { NavigationContext } from '../App';
import { BackIcon, SearchIcon, FilterIcon, PlusIcon, SnowflakeIcon, PumpIcon, BoltIcon } from '../components/icons';

type Filters = {
    type: string[];
    status: string[];
};

const FilterModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    applyFilters: (filters: Filters) => void;
    currentFilters: Filters;
    equipment: Equipment[];
}> = ({ isOpen, onClose, applyFilters, currentFilters, equipment }) => {
    const [localFilters, setLocalFilters] = useState(currentFilters);

    const equipmentTypes = useMemo(() => [...new Set(equipment.map(e => e.type))], [equipment]);
    const equipmentStatuses = useMemo(() => [...new Set(equipment.map(e => e.status))], [equipment]);

    if (!isOpen) return null;
    
    const handleCheckboxChange = (category: 'type' | 'status', value: string) => {
        setLocalFilters(prev => {
            const currentValues = prev[category];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [category]: newValues };
        });
    };

    const handleApply = () => {
        applyFilters(localFilters);
        onClose();
    };

    const handleClear = () => {
        const clearedFilters = { type: [], status: [] };
        setLocalFilters(clearedFilters);
        applyFilters(clearedFilters);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-end" onClick={onClose}>
            <div className="bg-white dark:bg-brand-gray-700 w-full max-w-md rounded-t-2xl p-4" onClick={e => e.stopPropagation()}>
                <h2 className="text-lg font-bold text-center mb-4 dark:text-white">Filtros</h2>
                
                <div className="mb-4">
                    <h3 className="font-semibold mb-2 dark:text-white">Tipo de Equipamento</h3>
                    <div className="flex flex-wrap gap-2">
                        {equipmentTypes.map(type => (
                            <label key={type} className="flex items-center space-x-2">
                                <input type="checkbox" checked={localFilters.type.includes(type)} onChange={() => handleCheckboxChange('type', type)} className="rounded text-brand-blue-DEFAULT focus:ring-brand-blue-DEFAULT" />
                                <span className="dark:text-gray-300">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2 dark:text-white">Status</h3>
                    <div className="flex flex-wrap gap-2">
                         {equipmentStatuses.map(status => (
                            <label key={status} className="flex items-center space-x-2">
                                <input type="checkbox" checked={localFilters.status.includes(status)} onChange={() => handleCheckboxChange('status', status)} className="rounded text-brand-blue-DEFAULT focus:ring-brand-blue-DEFAULT" />
                                <span className="dark:text-gray-300">{status}</span>
                            </label>
                        ))}
                    </div>
                </div>
                
                <div className="flex space-x-2">
                    <button onClick={handleClear} className="w-1/2 py-3 rounded-lg text-sm font-semibold bg-brand-gray-200 dark:bg-brand-gray-600 text-brand-gray-800 dark:text-white">Limpar</button>
                    <button onClick={handleApply} className="w-1/2 py-3 rounded-lg text-sm font-semibold bg-brand-blue-DEFAULT text-white">Aplicar</button>
                </div>
            </div>
        </div>
    );
};


const EquipmentCard: React.FC<{ equipment: Equipment }> = ({ equipment }) => {
    const { navigate } = useContext(NavigationContext);

    const getIcon = (type: string) => {
        const lowerType = type.toLowerCase();
        if (lowerType.includes('ar condicionado')) return <SnowflakeIcon />;
        if (lowerType.includes('bomba')) return <PumpIcon />;
        if (lowerType.includes('gerador')) return <BoltIcon />;
        return <SnowflakeIcon />;
    };

    return (
        <div onClick={() => navigate('EquipmentDetail', {equipmentId: equipment.id})} className="bg-white dark:bg-brand-gray-700 rounded-lg shadow p-4 flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
                <div className="p-3 bg-brand-gray-100 dark:bg-brand-gray-600 rounded-lg mr-4">
                    <div className="text-brand-gray-600 dark:text-brand-gray-300">{getIcon(equipment.type)}</div>
                </div>
                <div>
                    <h3 className="font-bold text-brand-gray-800 dark:text-white">{equipment.name}</h3>
                    <p className="text-sm text-brand-gray-600 dark:text-brand-gray-400">
                        Série: {equipment.serial} | Modelo: {equipment.model}
                    </p>
                </div>
            </div>
            <svg className="w-5 h-5 text-brand-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </div>
    );
};

const EquipmentListScreen: React.FC = () => {
  const { goBack, equipments } = useContext(NavigationContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filters>({ type: [], status: [] });

  const filteredEquipments = useMemo(() => {
    return equipments.filter(eq => {
      const searchMatch =
        searchQuery.trim() === '' ||
        eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.serial.toLowerCase().includes(searchQuery.toLowerCase());

      const typeMatch = activeFilters.type.length === 0 || activeFilters.type.includes(eq.type);
      const statusMatch = activeFilters.status.length === 0 || activeFilters.status.includes(eq.status);
      
      return searchMatch && typeMatch && statusMatch;
    });
  }, [equipments, searchQuery, activeFilters]);

  const removeFilter = (category: keyof Filters, value: string) => {
    setActiveFilters(prev => ({
        ...prev,
        [category]: prev[category].filter(v => v !== value)
    }));
  };
  
  const activeFilterCount = activeFilters.type.length + activeFilters.status.length;
  
  return (
    <div className="flex flex-col h-screen bg-brand-gray-100 dark:bg-brand-gray-800">
      <header className="bg-white dark:bg-brand-gray-700 p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center mb-4">
          <button onClick={goBack} className="text-brand-gray-600 dark:text-brand-gray-300 mr-4"><BackIcon /></button>
          <h1 className="font-semibold text-lg text-brand-gray-800 dark:text-white">Equipamentos do Cliente</h1>
        </div>
        <div className="flex space-x-2">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Buscar por nome, modelo ou série..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-gray-300 dark:border-brand-gray-600 bg-brand-gray-100 dark:bg-brand-gray-800 focus:ring-1 focus:ring-brand-blue-DEFAULT focus:border-brand-blue-DEFAULT dark:text-white"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400">
              <SearchIcon />
            </div>
          </div>
          <button onClick={() => setFilterModalOpen(true)} className="relative p-2.5 border border-brand-gray-300 dark:border-brand-gray-600 rounded-lg text-brand-gray-600 dark:text-brand-gray-300">
            <FilterIcon />
            {activeFilterCount > 0 && <span className="absolute -top-1 -right-1 bg-brand-red-DEFAULT text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{activeFilterCount}</span>}
          </button>
        </div>
      </header>

      {(activeFilters.type.length > 0 || activeFilters.status.length > 0) && (
        <div className="p-4 flex flex-wrap gap-2 items-center">
            {activeFilters.type.map(f => (
                <span key={f} className="flex items-center bg-brand-blue-light text-brand-blue-dark text-sm font-medium pl-3 pr-2 py-1 rounded-full">
                    Tipo: {f}
                    <button onClick={() => removeFilter('type', f)} className="ml-2 text-brand-blue-dark font-bold">×</button>
                </span>
            ))}
            {activeFilters.status.map(f => (
                <span key={f} className="flex items-center bg-brand-blue-light text-brand-blue-dark text-sm font-medium pl-3 pr-2 py-1 rounded-full">
                    Status: {f}
                    <button onClick={() => removeFilter('status', f)} className="ml-2 text-brand-blue-dark font-bold">×</button>
                </span>
            ))}
        </div>
      )}


      <main className="flex-grow overflow-y-auto px-4 pb-24 space-y-4">
        {filteredEquipments.length > 0 ? (
            filteredEquipments.map(eq => (
                <EquipmentCard key={eq.id} equipment={eq} />
            ))
        ) : (
            <div className="text-center py-10">
                <p className="text-brand-gray-600 dark:text-brand-gray-400">Nenhum equipamento encontrado.</p>
            </div>
        )}
      </main>

      <div className="absolute bottom-6 right-6">
        <button className="bg-brand-blue-DEFAULT text-white rounded-full p-4 shadow-lg hover:bg-brand-blue-dark transition-colors">
          <PlusIcon className="w-8 h-8"/>
        </button>
      </div>
      
      <FilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        applyFilters={setActiveFilters}
        currentFilters={activeFilters}
        equipment={equipments}
      />
    </div>
  );
};

export default EquipmentListScreen;
