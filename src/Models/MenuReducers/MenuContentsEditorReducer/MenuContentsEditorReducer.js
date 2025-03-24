export const GETTING_MENU_CONTENTS_EDITOR_STATE = 'GETTING_MENU_CONTENTS_EDITOR_STATE';
export const INITIAL_MENU_CONTENTS_EDITOR_STATE = 'INITIAL_MENU_CONTENTS_EDITOR_STATE';

const initialState = {
    Editor_State:
        '<p><br></p><p><br></p><p><span style="font-size: 42px;">간감나담ㄴㅇ</span></p><p><span style="font-size: 42px;">마ㅓㅡㅌ치파ㅟㅏㅌ추핕ㅊㅍ</span></p><p><br></p><p><span style="font-size: 42px;">ㅇㅁㄴ</span></p><p><span style="font-size: 42px;">ㅇ</span></p><p><span style="font-size: 42px;">ㅁㄴ</span></p><p><span style="font-size: 42px;">ㅇ</span></p><p><span style="font-size: 42px;">ㅁㅇ</span></p><p><br></p><p><br></p><p>ㅁㅇㅁㅇ</p><p><br></p><p><img src="http://192.168.2.225:3001/public/pms/20250324_054608__삼성 멀티 허브 EE-P5400.jpg" width="323"></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p>',
};

export const Change_Menu_Contents_Editor_State = data => ({
    type: GETTING_MENU_CONTENTS_EDITOR_STATE,
    payload: data,
});

export const Initial_Menu_Contents_Editor_State = data => ({
    type: INITIAL_MENU_CONTENTS_EDITOR_STATE,
    payload: data,
});

const MenuContentsEditorReducer = (State = initialState, action) => {
    switch (action.type) {
        case GETTING_MENU_CONTENTS_EDITOR_STATE: {
            return { ...State, Editor_State: action.payload };
        }
        case INITIAL_MENU_CONTENTS_EDITOR_STATE: {
            return { ...State, initialState };
        }

        default:
            return State;
    }
};

export default MenuContentsEditorReducer;
