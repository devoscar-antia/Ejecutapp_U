import React, {createContext, useEffect, useState} from 'react';
import {TABLET, WINDOW_HEIGHT, WINDOW_WIDTH} from '../assets/styles';
import useOrientation from '../hooks/useOrientation';

export const LayoutContext = createContext();

export const LayoutProvider = ({children}) => {
  const orientation = useOrientation();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    orientation.width = WINDOW_WIDTH;
    orientation.height = WINDOW_HEIGHT;
  }, []);

  useEffect(() => {
    setIsMobile(orientation.width <= TABLET);
  }, [orientation]);

  const state = {
    orientation,
    isMobile,
    isLoading,
    setIsLoading,
  };
  return (
    <LayoutContext.Provider value={state}>{children}</LayoutContext.Provider>
  );
};
