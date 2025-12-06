import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Estado para Modo Oscuro
    const [darkMode, setDarkMode] = useState(() => {
        const stored = localStorage.getItem('darkMode');
        return stored ? JSON.parse(stored) : false;
    });

    // Estado para Densidad de Tablas (Compacto/Normal)
    const [compactMode, setCompactMode] = useState(() => {
        const stored = localStorage.getItem('compactMode');
        return stored ? JSON.parse(stored) : false;
    });

    // Efecto para aplicar el tema oscuro al body
    useEffect(() => {
        if (darkMode) {
            document.body.setAttribute('data-bs-theme', 'dark');
        } else {
            document.body.setAttribute('data-bs-theme', 'light');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    // Efecto para persistir el modo compacto
    useEffect(() => {
        localStorage.setItem('compactMode', JSON.stringify(compactMode));
    }, [compactMode]);

    const toggleDarkMode = () => setDarkMode(prev => !prev);
    const toggleCompactMode = () => setCompactMode(prev => !prev);

    const value = {
        darkMode,
        setDarkMode,
        toggleDarkMode,
        compactMode,
        setCompactMode,
        toggleCompactMode
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
