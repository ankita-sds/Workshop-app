import { SET_THEME, TOGGLE_THEME } from "../Actions/constants";

const initialState = {
    value: 'light'
};

const themeReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case SET_THEME:
            return {
                ...state,
                value: action.payload.theme
            };
        case TOGGLE_THEME:
            return {
                ...state,
                value: state.value === 'light' ? 'dark' : 'light'
            };
        default:
            return state;
    }
};

export default themeReducer;