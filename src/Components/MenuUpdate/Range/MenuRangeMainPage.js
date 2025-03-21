import React, { useEffect, useState } from 'react';
import { MenuUpdateContentsMainDivBox } from '../MenuUpdateContents/MenuUpdateContents';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { FuncButton } from '../../Navigations/SideNavigation/SideNavigationMainPage';
import { useParams } from 'react-router-dom';
import { Request_Get_Axios, Request_Post_Axios } from '../../../API';
import styled from 'styled-components';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BiSolidUpArrow } from 'react-icons/bi';
import { toast } from '../../../ToastMessage/ToastManager';
import { useDispatch } from 'react-redux';
import { MenuSidefetchData } from '../../../Models/ReduxThunks/MenuReduxThunks/SideMenuListReducerThunks';

const MenuRangeMainPageMainDivBox = styled.div`
    .Move_Button_Group {
        margin-top: 10px;
        margin-bottom: 10px;
        .Move_Button {
            display: inline-block;
            button {
                border: 1px solid lightgray;
                outline: 1px solid lightgray;
                padding: 5px;
                background-color: #fff;
                width: 30px;
                font-size: 11px;
                &:hover {
                    cursor: pointer;
                }
            }
            margin-right: 10px;
        }
    }
`;

const MenuRangeMainPage = () => {
    const dispatch = useDispatch();
    const { Code, Title, parent_code, parent_name } = useParams();
    const [Menu_Lists, setMenu_Lists] = useState([]);
    const [Select_Menu, setSelect_Menu] = useState(null);

    useEffect(() => {
        Send_To_Server_For_Menu_Lists_Func();
    }, [Code]);

    const Send_To_Server_For_Menu_Lists_Func = async () => {
        const Send_To_Server_For_Menu_Lists = await Request_Get_Axios('/Pms_Route/MenuRouter/Send_To_Server_For_Menu_Lists', { Code });
        console.log(Send_To_Server_For_Menu_Lists);
        if (Send_To_Server_For_Menu_Lists.status) {
            setMenu_Lists(Send_To_Server_For_Menu_Lists.data);
        }
    };

    const Send_To_Save_Switch_Menu = async () => {
        const Send_To_Server_For_Save_Menu_Switching = await Request_Post_Axios(
            '/Pms_Route/MenuRouter/Send_To_Server_For_Save_Menu_Switching',
            {
                Menu_Lists,
            }
        );
        if (Send_To_Server_For_Save_Menu_Switching.status) {
            dispatch(MenuSidefetchData());
            toast.show({
                title: `정상적으로 메뉴 순서가 변경되었습니다.`,
                successCheck: true,
                duration: 6000,
            });
        }
    };

    //메뉴 위로 이동
    const Switch_From_Pre_Menu = async () => {
        if (Menu_Lists) {
            moveUpById(Select_Menu.menu_code);
        } else {
            toast.show({
                title: `메뉴를 선택 후 진행 해 주세요.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };
    //메뉴 아래로 이동
    const Switch_From_After_Menu = async () => {
        if (Menu_Lists) {
            moveDownById(Select_Menu.menu_code);
        } else {
            toast.show({
                title: `메뉴를 선택 후 진행 해 주세요.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    // // 전의 객체와 순서 바꾸기

    // 특정 인덱스의 객체를 이전 객체와 교환 (위로 이동)
    const moveUp = index => {
        if (index <= 0) return; // 첫 번째 요소는 이동 불가

        setMenu_Lists(prevArr => {
            const newArr = [...prevArr]; // 새로운 배열 생성 (불변성 유지)
            [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
            return newArr; // 변경된 배열 반환
        });
    };

    // 특정 인덱스의 객체를 다음 객체와 교환 (아래로 이동)
    const moveDown = index => {
        if (index >= Menu_Lists.length - 1) return; // 마지막 요소는 이동 불가

        setMenu_Lists(prevArr => {
            const newArr = [...prevArr]; // 새로운 배열 생성 (불변성 유지)
            [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
            return newArr; // 변경된 배열 반환
        });
    };

    // 특정 id를 가진 객체를 이전 객체와 교환 (위로 이동)
    const moveUpById = id => {
        const index = Menu_Lists.findIndex(item => item.menu_code === id);
        if (index !== -1) {
            moveUp(index);
        }
    };

    // 특정 id를 가진 객체를 다음 객체와 교환 (아래로 이동)
    const moveDownById = id => {
        const index = Menu_Lists.findIndex(item => item.menu_code === id);
        if (index !== -1) {
            moveDown(index);
        }
    };

    return (
        <MenuUpdateContentsMainDivBox>
            <MenuRangeMainPageMainDivBox>
                <div>
                    <h3>메뉴 리스트</h3>
                </div>
                <div>
                    <ul className="Move_Button_Group">
                        <li onClick={() => Switch_From_Pre_Menu()} className="Move_Button">
                            <button>
                                <BiSolidUpArrow />
                            </button>
                        </li>
                        <li onClick={() => Switch_From_After_Menu()} className="Move_Button">
                            <button>
                                <BiSolidDownArrow />
                            </button>
                        </li>
                    </ul>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className="type-check"></th>
                                <th>메뉴코드</th>
                                <th>메뉴명</th>
                                <th>부모 메뉴코드</th>
                                <th>부모 메뉴명</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="TableBody">
                    <table>
                        <tbody>
                            {Menu_Lists.map((list, indexs) => {
                                return (
                                    <tr
                                        key={indexs}
                                        onClick={() => {
                                            setSelect_Menu(list);
                                        }}
                                        style={Select_Menu?.menu_code === list.menu_code ? { background: 'lightgray' } : {}}
                                    >
                                        {Select_Menu?.menu_code === list.menu_code ? (
                                            <td className="type-check">
                                                <MdCheckBox />
                                            </td>
                                        ) : (
                                            <td className="type-check" style={{ color: 'gray' }}>
                                                <MdCheckBoxOutlineBlank />
                                            </td>
                                        )}

                                        <td>{list.menu_code}</td>
                                        <td>{list.menu_name}</td>
                                        <td>{list.menu_parent_code}</td>
                                        <td>{list.menu_parent_name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <ul>
                    <li style={{ textAlign: 'end', marginTop: '20px' }}>
                        <FuncButton onClick={() => Send_To_Save_Switch_Menu()}> 저 장 </FuncButton>
                    </li>
                </ul>
            </MenuRangeMainPageMainDivBox>
        </MenuUpdateContentsMainDivBox>
    );
};

export default MenuRangeMainPage;
