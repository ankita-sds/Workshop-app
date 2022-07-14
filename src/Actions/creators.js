import { SET_THEME, TOGGLE_THEME } from "./constants";

const setTheme = ( theme ) => {
    return {
        type: SET_THEME,
        payload: {
            theme
        }
    };
};

const toggleTheme = () => {
    return {
        type: TOGGLE_THEME
    };
};

export {
    setTheme,
    toggleTheme
}; 