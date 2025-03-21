export const MENU_INFO_SELECT_MENU_DATA_CHANGE_STATE = 'MENU_INFO_SELECT_MENU_DATA_CHANGE_STATE';
export const MENU_INFO_INPUT_MENU_DATA_CHANGE_STATE = 'MENU_INFO_INPUT_MENU_DATA_CHANGE_STATE';
export const MENU_INFO_SELECT_MENU_OPTIONS_STATE = 'MENU_INFO_SELECT_MENU_OPTIONS_STATE';
export const MENU_INFO_DATA_INITIAL_STATE = 'MENU_INFO_DATA_INITIAL_STATE';

const initialState = {
    Select_Menu: {
        menu_code: null,
        menu_name: null,
        menu_parent_code: null,
        menu_parent_name: null,
        menu_range: 0,
    },
    Input_Menu: {
        menu_code: null,
        menu_name: null,
        menu_parent_code: null,
        menu_parent_name: null,
        menu_range: 0,
    },
    Select_Options: {
        value: null,
        label: null,
        menu_code: null,
        menu_name: null,
        menu_parent_code: null,
        menu_parent_name: null,
        menu_range: 0,
    },
};

export const Change_Select_Menu_Info_Func = data => ({
    type: MENU_INFO_SELECT_MENU_DATA_CHANGE_STATE,
    payload: data,
});

export const Change_Input_Menu_Info_Func = data => ({
    type: MENU_INFO_INPUT_MENU_DATA_CHANGE_STATE,
    payload: data,
});

export const Change_Select_Options_Info_Func = data => ({
    type: MENU_INFO_SELECT_MENU_OPTIONS_STATE,
    payload: data,
});

const Menu_Add_Reducer = (State = initialState, action) => {
    switch (action.type) {
        case MENU_INFO_SELECT_MENU_DATA_CHANGE_STATE: {
            return { ...State, Select_Menu: action.payload };
        }
        case MENU_INFO_INPUT_MENU_DATA_CHANGE_STATE: {
            return { ...State, Input_Menu: action.payload };
        }
        case MENU_INFO_SELECT_MENU_OPTIONS_STATE: {
            return { ...State, Select_Options: action.payload };
        }
        case MENU_INFO_DATA_INITIAL_STATE: {
            return { ...State, initialState };
        }
        default:
            return State;
    }
};

export default Menu_Add_Reducer;
