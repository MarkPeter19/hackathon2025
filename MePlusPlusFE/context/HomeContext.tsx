import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchHome } from "../service/Fetching";
import { HomeData } from "../models/Home";

interface HomeContextType {
  homeData: HomeData | null;
  loading: boolean;
  refreshHomeData: () => void;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadHomeData = async () => {
    setLoading(true);
    try {
      const data = await fetchHome();
      setHomeData(data);
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  return (
    <HomeContext.Provider value={{ homeData, loading, refreshHomeData: loadHomeData }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHome must be used within a HomeProvider");
  }
  return context;
};
