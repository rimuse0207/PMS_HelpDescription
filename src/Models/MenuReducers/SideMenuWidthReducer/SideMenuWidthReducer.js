export const SIDE_MENU_WIDTH_GETTING = 'SIDE_MENU_WIDTH_GETTING';
export const SIDE_MENU_WIDTH_GETTING_INITIAL = 'SIDE_MENU_WIDTH_GETTING_INITIAL';

const initialState = {
    Side_Menu_Width: 300,
};

export const Change_Side_Menu_Width_Func = data => ({
    type: SIDE_MENU_WIDTH_GETTING,
    payload: data,
});

const Change_Side_Menus_Width_Reducer = (State = initialState, action) => {
    switch (action.type) {
        case SIDE_MENU_WIDTH_GETTING: {
            return { ...State, Side_Menu_Width: action.payload };
        }
        case SIDE_MENU_WIDTH_GETTING_INITIAL: {
            return { ...State, Side_Menu_Width: initialState.Side_Menu_Width };
        }
        default:
            return State;
    }
};

export default Change_Side_Menus_Width_Reducer;
