import { createContext, useContext } from 'react';

// ThemeContext.Provider (required by provider of the context value)
// ThemeContext.Consumer (required for class components consuming the context value)
const ThemeContext = createContext({
    theme: 'dark',
    setTheme: () => {}
});

const useTheme = () => useContext (ThemeContext);

export {
    ThemeContext as default,
    useTheme
};