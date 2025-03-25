export const GETTING_MENU_SEARCH_STATE = 'GETTING_MENU_SEARCH_STATE';
export const INITIAL_MENU_SEARCH_STATE = 'INITIAL_MENU_SEARCH_STATE';

const initialState = {
    Search_State: [],
};

export const Change_Search_Menu_Contents_State = data => ({
    type: GETTING_MENU_SEARCH_STATE,
    payload: data,
});
export const Initial_Search_Menu_Contents_State = data => ({
    type: INITIAL_MENU_SEARCH_STATE,
    payload: data,
});

const MenuSearchReducer = (State = initialState, action) => {
    switch (action.type) {
        case GETTING_MENU_SEARCH_STATE: {
            return { ...State, Search_State: action.payload };
        }
        case INITIAL_MENU_SEARCH_STATE: {
            return { ...State, initialState };
        }
        default:
            return State;
    }
};

export default MenuSearchReducer;
