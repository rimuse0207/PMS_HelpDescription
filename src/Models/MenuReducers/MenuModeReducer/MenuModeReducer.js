import MenuUpdateContents from '../../../Components/MenuUpdate/MenuUpdateContents/MenuUpdateContents';
import MenuRangeMainPage from '../../../Components/MenuUpdate/Range/MenuRangeMainPage';

export const CHANGE_MENU_MODE_STATE = 'CHANGE_MENU_MODE_STATE';
export const SET_INITIAL_MENU_MODE_STATE = 'SET_INITIAL_MENU_MODE_STATE';
export const CHANGE_SIDE_MENU_STATE = 'CHANGE_SIDE_MENU_STATE';

const initialState = {
    Side_Select_Menu: {
        menu_code: null,
        menu_name: null,
        menu_parent_code: null,
        menu_parent_name: null,
        menu_range: 0,
    },
    Menu_Update_Mode: [
        {
            UpdateMode: 'Default',
            Component: <div></div>,
        },
        {
            UpdateMode: 'Insert',
            Component: <MenuUpdateContents></MenuUpdateContents>,
            Button_Name: ' 메 뉴 추 가 ',
            Form_Name: '메뉴 추가 양식',
        },

        {
            UpdateMode: 'Update',
            Component: <MenuUpdateContents></MenuUpdateContents>,
            Button_Name: ' 메 뉴 변 경 ',
            Form_Name: '메뉴 변경 양식',
        },
        {
            UpdateMode: 'Switch',
            Component: <MenuRangeMainPage></MenuRangeMainPage>,
            Button_Name: ' 순 서 변 경 ',
            Form_Name: '순서 변경 리스트',
        },
    ],
};

export const Change_Menu_Mode_State_Actions = data => ({
    type: CHANGE_MENU_MODE_STATE,
    payload: data,
});

export const Change_Side_Menu_Select_Actions = data => ({
    type: CHANGE_SIDE_MENU_STATE,
    payload: data,
});

const Menu_Mode_Reducer = (State = initialState, action) => {
    switch (action.type) {
        case CHANGE_MENU_MODE_STATE: {
            return { ...State, Menu_Update_Mode: action.payload };
        }
        case CHANGE_SIDE_MENU_STATE: {
            return {
                ...State,
                Side_Select_Menu: action.payload,
            };
        }
        case SET_INITIAL_MENU_MODE_STATE: {
            return { ...State, initialState };
        }

        default:
            return State;
    }
};

export default Menu_Mode_Reducer;
