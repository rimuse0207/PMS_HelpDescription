export const SIDE_MENU_IS_OPEN = 'SIDE_MENU_IS_OPEN';
export const SIDE_MENU_IS_INITIAL = 'SIDE_MENU_IS_INITIAL';

const initialState = {
    Side_Menu: true,
};

export const Change_Side_Menu_Func = () => ({
    type: SIDE_MENU_IS_OPEN,
});

const Change_Side_Menus_Reducer = (State = initialState, action) => {
    switch (action.type) {
        case SIDE_MENU_IS_OPEN: {
            return { ...State, Side_Menu: !State.Side_Menu };
        }
        case SIDE_MENU_IS_INITIAL: {
            return { ...State, Side_Menu: initialState.Side_Menu };
        }
        default:
            return State;
    }
};

export default Change_Side_Menus_Reducer;
