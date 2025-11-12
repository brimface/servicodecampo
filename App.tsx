
import React, { useState, useCallback, useMemo } from 'react';
import LoginScreen from './screens/LoginScreen';
import ServiceOrderListScreen from './screens/ServiceOrderListScreen';
import ServiceOrderDetailScreen from './screens/ServiceOrderDetailScreen';
import ExecuteServiceOrderScreen from './screens/ExecuteServiceOrderScreen';
import EquipmentListScreen from './screens/EquipmentListScreen';
import EquipmentDetailScreen from './screens/EquipmentDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import NewServiceOrderScreen from './screens/NewServiceOrderScreen';
import { serviceOrders, equipments, userProfile } from './constants';
import type { ServiceOrder, Equipment, User } from './types';

export type Screen = 
  | 'Login' 
  | 'ServiceOrderList' 
  | 'ServiceOrderDetail' 
  | 'ExecuteServiceOrder' 
  | 'EquipmentList' 
  | 'EquipmentDetail' 
  | 'Profile'
  | 'NewServiceOrder';

export interface NavigationParams {
  serviceOrderId?: string;
  equipmentId?: string;
}

export const NavigationContext = React.createContext<{
  navigate: (screen: Screen, params?: NavigationParams) => void;
  goBack: () => void;
  serviceOrders: ServiceOrder[];
  equipments: Equipment[];
  userProfile: User;
}>({
  navigate: () => {},
  goBack: () => {},
  serviceOrders: [],
  equipments: [],
  userProfile: {} as User,
});

const App: React.FC = () => {
  const [navigationStack, setNavigationStack] = useState<{ screen: Screen; params?: NavigationParams }[]>([{ screen: 'Login' }]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useCallback((screen: Screen, params?: NavigationParams) => {
    setNavigationStack(stack => [...stack, { screen, params }]);
  }, []);

  const goBack = useCallback(() => {
    setNavigationStack(stack => stack.length > 1 ? stack.slice(0, -1) : stack);
  }, []);
  
  const currentScreen = navigationStack[navigationStack.length - 1];

  const contextValue = useMemo(() => ({
    navigate,
    goBack,
    serviceOrders,
    equipments,
    userProfile
  }), [navigate, goBack]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  
  const renderScreen = () => {
    switch (currentScreen.screen) {
      case 'Login':
        return <LoginScreen />;
      case 'ServiceOrderList':
        return <ServiceOrderListScreen />;
      case 'ServiceOrderDetail':
        return <ServiceOrderDetailScreen serviceOrderId={currentScreen.params?.serviceOrderId} />;
      case 'ExecuteServiceOrder':
        return <ExecuteServiceOrderScreen serviceOrderId={currentScreen.params?.serviceOrderId} />;
      case 'EquipmentList':
        return <EquipmentListScreen />;
      case 'EquipmentDetail':
        return <EquipmentDetailScreen equipmentId={currentScreen.params?.equipmentId} />;
      case 'Profile':
        return <ProfileScreen isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
      case 'NewServiceOrder':
        return <NewServiceOrderScreen />;
      default:
        return <LoginScreen />;
    }
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      <div className={`${isDarkMode ? 'dark' : ''}`}>
        <div className="bg-white dark:bg-brand-gray-900 min-h-screen font-sans">
          <div className="max-w-md mx-auto bg-brand-gray-100 dark:bg-brand-gray-800 shadow-lg min-h-screen">
            {renderScreen()}
          </div>
        </div>
      </div>
    </NavigationContext.Provider>
  );
};

export default App;
