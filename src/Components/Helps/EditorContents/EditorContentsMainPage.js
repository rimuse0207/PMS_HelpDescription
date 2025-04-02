import React, { useEffect } from 'react';
import ReactQuills from './ReactQuills/ReactQuills';
import styled from 'styled-components';
import { FuncButton } from '../../Navigations/SideNavigation/SideNavigationMainPage';
import { Request_Get_Axios, Request_Post_Axios } from '../../../API';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from '../../../ToastMessage/ToastManager';
import { Change_Menu_Contents_Editor_State } from '../../../Models/MenuReducers/MenuContentsEditorReducer/MenuContentsEditorReducer';

const EditorContentsMainPageMainDivBox = styled.div`
    height: calc(-70px + 100vh);
    width: 100%;
    .Button_Move_To_TOP {
        position: fixed;
        top: 70px;
        right: 50px;
        width: 200px;
        background-color: green;
        font-weight: bolder;
        color: white;
    }
`;
const EditorContentsMainPage = () => {
    const Login_Info_State = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const dispatch = useDispatch();
    const { Code, Title, parent_code, parent_name } = useParams();
    const Navigation = useNavigate();
    const Editor_State = useSelector(state => state.MenuContentsEditorReducer.Editor_State);

    useEffect(() => {
        Get_Content_Info();
    }, [Code]);

    const Get_Content_Info = async () => {
        if (Code) {
            const Get_Content_Info_Axios = await Request_Get_Axios('/Pms_Route/MenuRouter/Get_Content_Info', { Code });
            if (Get_Content_Info_Axios.status || Get_Content_Info_Axios?.data?.length > 0) {
                dispatch(Change_Menu_Contents_Editor_State(Get_Content_Info_Axios.data[0]?.pms_content_info_content));
            }
        }
    };

    const HandleSaveEditor = async () => {
        const Send_To_Editor_State_For_Save_Axios = await Request_Post_Axios('/Pms_Route/MenuRouter/Send_To_Editor_State_For_Saving', {
            Editor_State,
            Code,
            Login_Info_State,
        });
        if (Send_To_Editor_State_For_Save_Axios.status) {
            toast.show({
                title: `컨텐츠정보가 저장되었습니다.`,
                successCheck: true,
                duration: 6000,
            });
            Navigation(`/Home/Helps/${Code}/${Title}/${parent_code}/${parent_name}`);
        }
    };

    return (
        <EditorContentsMainPageMainDivBox>
            <ReactQuills setHeight={'calc(100vh - 200px)'}></ReactQuills>
            <div style={{ marginRight: '50px', marginTop: '30px', paddingBottom: '30px', textAlign: 'end' }}>
                <FuncButton className="Button_Move_To_TOP" onClick={() => HandleSaveEditor()}>
                    {' '}
                    저 장{' '}
                </FuncButton>
            </div>
        </EditorContentsMainPageMainDivBox>
    );
};

export default EditorContentsMainPage;
