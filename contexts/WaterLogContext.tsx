import React, { createContext, useContext, useState, ReactNode } from 'react';

type WaterLogContextType = {
  refreshKey: number;
  triggerRefresh: () => void;
};

const WaterLogContext = createContext<WaterLogContextType | undefined>(undefined);

export const WaterLogProvider = ({ children }: { children: ReactNode }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <WaterLogContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </WaterLogContext.Provider>
  );
};

// Custom hook for easy access
export const useWaterLog = (): WaterLogContextType => {
  const context = useContext(WaterLogContext);
  if (!context) {
    throw new Error('useWaterLog must be used within a WaterLogProvider');
  }
  return context;
};
