export const GETTING_MENU_CONTENTS_EDITOR_STATE = 'GETTING_MENU_CONTENTS_EDITOR_STATE';
export const INITIAL_MENU_CONTENTS_EDITOR_STATE = 'INITIAL_MENU_CONTENTS_EDITOR_STATE';

const initialState = {
    Editor_State: '',
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
            return { ...State, Editor_State: '' };
        }

        default:
            return State;
    }
};

export default MenuContentsEditorReducer;
