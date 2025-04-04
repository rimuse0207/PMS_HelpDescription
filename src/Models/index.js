import { combineReducers } from 'redux';
import Change_Side_Menus_Reducer from './MenuReducers/SideMenuReducer/SideMenuReducer';
import Menu_Add_Reducer from './MenuReducers/MenuAddReducer/MenuAddReducer';
import Menu_Mode_Reducer from './MenuReducers/MenuModeReducer/MenuModeReducer';
import SideMenuListReducerThunks from './ReduxThunks/MenuReduxThunks/SideMenuListReducerThunks';
import MenuContentsEditorReducer from './MenuReducers/MenuContentsEditorReducer/MenuContentsEditorReducer';
import Login_Info_Reducer_State from './LoginReducers/LoginInfoReduce';
import MenuSearchReducer from './MenuReducers/MenuSearchReducer/MenuSearchReducer';

const rootReducer = combineReducers({
    Change_Side_Menus_Reducer,
    Menu_Add_Reducer,
    Menu_Mode_Reducer,
    SideMenuListReducerThunks,
    MenuContentsEditorReducer,
    Login_Info_Reducer_State,
    MenuSearchReducer,
});

export default rootReducer;
