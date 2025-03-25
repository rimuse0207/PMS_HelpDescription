import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Request_Get_Axios, Request_Post_Axios } from '../../../API';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { MdCheckBox } from 'react-icons/md';
import MenuAddInputs from '../MenuAddInputs/MenuAddInputs';
import { useDispatch, useSelector } from 'react-redux';
import { Change_Select_Menu_Info_Func } from '../../../Models/MenuReducers/MenuAddReducer/MenuAddReducer';
import { FuncButton } from '../../Navigations/SideNavigation/SideNavigationMainPage';
import { toast } from '../../../ToastMessage/ToastManager';
import { MenuSidefetchData } from '../../../Models/ReduxThunks/MenuReduxThunks/SideMenuListReducerThunks';

export const MenuUpdateContentsMainDivBox = styled.div`
    border: 1px solid black;
    padding: 10px;
    width: 100%;
    table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        border-top: 1px solid lightgray;
        border-bottom: 1px solid lightgray;
        font-size: 14px;
        .type-check {
            width: 50px;
            color: blue;
            font-size: 18px;
        }
        th {
            font-weight: normal;
            color: rgba(var(--rgb-color), 0.9);
            text-align: start;
            padding-left: 5px;
            border-right: 1px solid lightgray;
            padding-top: 5px;
            padding-bottom: 5px;
        }
        td {
            text-align: start;
            padding: 5px;
        }
        tbody {
            tr {
                border-top: 1px solid lightgray;
                border-bottom: 1px solid lightgray;
                &:hover {
                    cursor: pointer;
                    background-color: lightgray;
                }
            }
        }
        .TableBody {
            max-height: 50vh;
            overflow: auto;
        }
    }
`;

const MenuUpdateContents = () => {
    const Navigation = useNavigate();
    const dispatch = useDispatch();
    const { Mode, Code, parent_code, parent_name } = useParams();
    const UpdateMode = useSelector(state => state.Menu_Mode_Reducer.Menu_Update_Mode);
    const Now_Select_Menu = useSelector(state => state.Menu_Add_Reducer.Select_Menu);
    const Side_Select_Menu_State = useSelector(state => state.Menu_Mode_Reducer.Side_Select_Menu);
    const Select_Options_State = useSelector(state => state.Menu_Add_Reducer.Select_Options);
    const Menu_Input_Menu_State = useSelector(state => state.Menu_Add_Reducer.Input_Menu);
    const [Select_Menu_List, setSelect_Menu_List] = useState([]);
    const [UpdateModes, setUpdateModes] = useState(false);
    const Handle_Menu_Add_Func = async () => {
        const Send_Server_For_Add_Menu_List = await Request_Post_Axios('/Pms_Route/MenuRouter/Add_Menu_List', {
            Now_Select_Menu,
            Select_Options_State,
            Menu_Input_Menu_State,
        });
        if (Send_Server_For_Add_Menu_List.status) {
            if (Send_Server_For_Add_Menu_List.data.dupleChecking) {
                // 메뉴코드 중복!
                toast.show({
                    title: `메뉴코드가 중복됩니다. 메뉴코드를 수정 해 주세요.`,
                    successCheck: false,
                    duration: 6000,
                });
                return;
            } else {
                // 정상 등록 완료
                dispatch(MenuSidefetchData());
                setUpdateModes(false);

                toast.show({
                    title: `정상적으로 메뉴 등록이 완료되었습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
                Navigation(
                    `/admin/Menu/${Mode}/${Menu_Input_Menu_State.menu_code}/${Menu_Input_Menu_State.menu_name}/${Select_Options_State.menu_code}/${Select_Options_State.menu_name}`
                );
            }
        } else {
            toast.show({
                title: `메뉴 등록에 실패하였습니다. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const Handle_Change_Menu_Info = async () => {
        const Send_Server_For_Change_Menu_Info = await Request_Post_Axios('/Pms_Route/MenuRouter/Change_Menu_Info', {
            Now_Select_Menu,
            Select_Options_State,
            Menu_Input_Menu_State,
            Code,
        });
        if (Send_Server_For_Change_Menu_Info.status) {
            // 정상 등록 완료
            dispatch(MenuSidefetchData());
            setUpdateModes(false);
            toast.show({
                title: `정상적으로 메뉴 변경이 완료되었습니다.`,
                successCheck: true,
                duration: 6000,
            });
        } else {
            toast.show({
                title: `메뉴 등록에 실패하였습니다. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const Change_Form_Event_Open = () => {
        if (Mode === 'Update') {
            Handle_Change_Menu_Info();
        } else if (Mode === 'Insert') {
            Handle_Menu_Add_Func();
        }
    };

    return (
        <MenuUpdateContentsMainDivBox>
            <div>
                <h3>선택 메뉴</h3>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th className="type-check"></th>
                            {/* <th className="type-check" style={AllChecked ? {} : { color: 'gray' }}>
                                {AllChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                            </th> */}
                            <th>메뉴코드</th>
                            <th>메뉴명</th>
                            <th>부모 메뉴코드</th>
                            <th>부모 메뉴명</th>
                            <th>순서</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="TableBody">
                <table>
                    <tbody>
                        <tr key={Side_Select_Menu_State?.menu_code}>
                            <td className="type-check"></td>
                            {/* <td className="type-check"></td> */}
                            <td>{Side_Select_Menu_State?.menu_code}</td>
                            <td>{Side_Select_Menu_State?.menu_name}</td>
                            <td>{Side_Select_Menu_State?.menu_parent_code}</td>
                            <td>{Side_Select_Menu_State?.menu_parent_name}</td>
                            <td>{Side_Select_Menu_State?.menu_range}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <MenuAddInputs UpdateModes={UpdateModes}></MenuAddInputs>

            <ul>
                {UpdateModes ? (
                    <li style={{ textAlign: 'end', marginTop: '20px' }}>
                        <FuncButton onClick={() => setUpdateModes(false)}> 취 소 </FuncButton>
                        <FuncButton onClick={() => Change_Form_Event_Open()}>
                            {UpdateMode.map(list => (list.UpdateMode === Mode ? list.Button_Name : ''))}
                        </FuncButton>
                    </li>
                ) : (
                    <li style={{ textAlign: 'end', marginTop: '20px' }}>
                        <FuncButton onClick={() => setUpdateModes(true)}>수 정 모 드 변 경</FuncButton>
                    </li>
                )}
            </ul>
        </MenuUpdateContentsMainDivBox>
    );
};

export default MenuUpdateContents;
