 "use client"
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the shape of the context state
interface AppState {
    user: string | null;
    theme: 'light' | 'dark';
    email: string | null;
}

// Define the shape of the context value
interface AppContextType {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
}

// Create the context with an initial value of undefined
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AppState>({
        user: null,
        theme: 'light',
        email: null
    });

    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
