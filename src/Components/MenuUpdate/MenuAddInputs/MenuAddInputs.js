import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import styled from 'styled-components';
import { Request_Get_Axios } from '../../../API';
import { Change_Input_Menu_Info_Func, Change_Select_Options_Info_Func } from '../../../Models/MenuReducers/MenuAddReducer/MenuAddReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { Change_Side_Menu_Select_Actions } from '../../../Models/MenuReducers/MenuModeReducer/MenuModeReducer';

const MenuAddInputsMainDivBox = styled.div`
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    margin-top: 20px;
    border-top: 2px dashed lightgray;
    padding-top: 20px;
    .Input_Container {
        display: flex;
        width: 45%;
        height: 35px;
        align-items: center;
        margin-bottom: 30px;
        .Input_Title {
            width: 35%;
            font-size: 12px;
        }
        .Input_Group_Container {
            width: 65%;
            height: 100%;
            font-size: 14px;
            line-height: 30px;
        }
    }
`;

export const InputType = styled.input`
    cursor: auto;
    padding: 0 30px 0 12px;
    line-height: 28px;
    height: 28px;
    color: rgba(var(--rgb-color), 1);
    border-radius: inherit;
    font-size: 13px;
    font-size: 0.929rem;
    border: 1px solid lightgray;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    font-size: 13px;
    &:focus {
        border: 0.5px solid blue;
        outline: 0.5px solid #368;
    }
`;

const MenuAddInputs = ({ UpdateModes }) => {
    const dispatch = useDispatch();
    const { Mode, Code, Title, parent_code, parent_name } = useParams();
    const Navigation = useNavigate();
    const Side_Select_Menu = useSelector(state => state.Menu_Mode_Reducer.Side_Select_Menu);
    const UpdateMode = useSelector(state => state.Menu_Mode_Reducer.Menu_Update_Mode);
    const Now_Input_Menu = useSelector(state => state.Menu_Add_Reducer.Input_Menu);
    const Now_Select_Options_State = useSelector(state => state.Menu_Add_Reducer.Select_Options);

    const [Select_Options, setSelect_Options] = useState([]);

    useEffect(() => {
        Get_Parent_Code_Select_Options();
    }, []);

    // 모드 변경 시, INPUT VALUE 삭제 처리
    useEffect(() => {
        if (Mode === 'Update') {
            Select_Change_State();
            dispatch(
                Change_Input_Menu_Info_Func({
                    ...Now_Input_Menu,
                    menu_code: Code,
                    menu_name: Title,
                })
            );
        } else if (Mode === 'Insert') {
            dispatch(
                Change_Input_Menu_Info_Func({
                    ...Now_Input_Menu,
                    menu_code: '',
                    menu_name: '',
                })
            );
        }
    }, [Mode]);

    useEffect(() => {
        if (Mode === 'Update') {
            dispatch(
                Change_Input_Menu_Info_Func({
                    ...Now_Input_Menu,
                    menu_name: Title,
                })
            );
            Select_Change_State();
        }
    }, [Code]);

    useEffect(() => {
        if (Mode === 'Update') {
            Select_Change_State();

            dispatch(
                Change_Input_Menu_Info_Func({
                    ...Now_Input_Menu,
                    menu_name: Title,
                })
            );
        } else {
            dispatch(
                Change_Select_Options_Info_Func({
                    value: Side_Select_Menu.menu_code,
                    label: `메뉴명 : ${Side_Select_Menu.menu_name}, 메뉴코드 : ${Side_Select_Menu.menu_code}`,
                    ...Side_Select_Menu,
                })
            );
        }
    }, [Side_Select_Menu.menu_code]);

    // Select_Option 데이터 불러오기
    const Get_Parent_Code_Select_Options = async () => {
        const Get_Menus_Options = await Request_Get_Axios('/Pms_Route/MenuRouter/Getting_Select_Options_Data');
        if (Get_Menus_Options.status) {
            setSelect_Options(Get_Menus_Options.data);
        }
    };

    /// Select_Option 선택 시, State변경
    const handleChangeData = e => {
        console.log(e);
        if (Mode === 'Update') {
            console.log(e, Select_Options);
            dispatch(Change_Select_Options_Info_Func(e));
        } else if (Mode === 'Insert') {
            dispatch(Change_Select_Options_Info_Func(e));
            dispatch(Change_Side_Menu_Select_Actions(e));
            Navigation(`/admin/Menu/${Mode}/${e.menu_code}/${e.menu_name}/${e.menu_parent_code}/${e.menu_parent_name}`);
        }
    };

    // Select Option 변경
    const Select_Change_State = () => {
        dispatch(
            Change_Select_Options_Info_Func({
                value: parent_code,
                label: `메뉴명 : ${parent_name}, 메뉴코드 : ${parent_code}`,
                menu_code: parent_code,
                menu_name: parent_name,
            })
        );
    };

    return (
        <div>
            <h2 style={{ marginTop: '30px' }}> {UpdateMode.map(list => (list.UpdateMode === Mode ? list.Form_Name : ''))}</h2>
            <MenuAddInputsMainDivBox>
                <div className="Input_Container">
                    <div className="Input_Title">부모 메뉴코드*</div>
                    <div className="Input_Group_Container">
                        {/* <InputType type="text" placeholder="부모코드는 선택 해 주세요."></InputType> */}
                        {UpdateModes ? (
                            <Select
                                value={Now_Select_Options_State ? Now_Select_Options_State : null}
                                onChange={e => handleChangeData(e)}
                                name="colors"
                                options={Select_Options}
                                className="basic-multi-select"
                                classNamePrefix="하위 메뉴 등록을 위해 선택 해 주세요."
                                placeholder="하위 메뉴 등록을 위해 선택 해 주세요."
                            />
                        ) : (
                            <div>{parent_code}</div>
                        )}
                    </div>
                </div>
                <div className="Input_Container">
                    <div className="Input_Title">부모 메뉴명*</div>

                    <div className="Input_Group_Container">{Now_Select_Options_State?.menu_name}</div>
                </div>
                <div className="Input_Container">
                    <div className="Input_Title">메뉴코드*</div>
                    {Mode === 'Update' ? (
                        <div className="Input_Group_Container">{Code}</div>
                    ) : UpdateModes ? (
                        <div className="Input_Group_Container">
                            <InputType
                                type="text"
                                placeholder="메뉴코드를 작성 해 주세요."
                                value={Now_Input_Menu?.menu_code}
                                onChange={e => {
                                    dispatch(
                                        Change_Input_Menu_Info_Func({
                                            ...Now_Input_Menu,
                                            menu_code: e.target.value,
                                        })
                                    );
                                }}
                            ></InputType>
                        </div>
                    ) : (
                        <div className="Input_Group_Container">{Code}</div>
                    )}
                </div>
                <div className="Input_Container">
                    <div className="Input_Title">메뉴명*</div>
                    <div className="Input_Group_Container">
                        {UpdateModes ? (
                            <InputType
                                type="text"
                                placeholder="메뉴명을 작성 해 주세요."
                                value={Now_Input_Menu?.menu_name}
                                onChange={e => {
                                    dispatch(
                                        Change_Input_Menu_Info_Func({
                                            ...Now_Input_Menu,
                                            menu_name: e.target.value,
                                        })
                                    );
                                }}
                            ></InputType>
                        ) : (
                            <div>{Title}</div>
                        )}
                    </div>
                </div>
            </MenuAddInputsMainDivBox>
        </div>
    );
};

export default MenuAddInputs;
