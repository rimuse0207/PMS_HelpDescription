import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import FindParent from './FindParent';
import { Request_Get_Axios } from '../../../API';
import parse from 'html-react-parser';
import { useDispatch } from 'react-redux';
import {
    Change_Menu_Contents_Editor_State,
    Initial_Menu_Contents_Editor_State,
} from '../../../Models/MenuReducers/MenuContentsEditorReducer/MenuContentsEditorReducer';
const HelpsContentsMainDivBox = styled.div`
    width: 100%;
    max-height: calc(100vh - 70px);
    overflow-y: auto;
    padding: 10px;
    .Lines {
        padding-right: 30px;
        padding-top: 40px;
        border-top: 1px dashed #5bb73b;
    }
`;
const MenuContentsContainerDivBox = styled.div`
    padding: 10px;
    padding-right: 20px;
    .Title_Group {
        font-size: 2em;
        font-weight: 500;
        margin-bottom: 20px;
    }
    li {
        list-style: decimal !important;
        margin-left: 50px;
        padding-bottom: 5px;
        padding-top: 5px;
    }
    .ql-align-center {
        text-align: center !important;
    }
    .ql-align-right {
        text-align: right !important;
    }
    .ql-indent-1 {
        padding-left: 40px;
    }
    .ql-indent-2 {
        padding-left: 80px;
    }
    .ql-indent-3 {
        padding-left: 120px;
    }
    .ql-indent-4 {
        padding-left: 160px;
    }
    .ql-indent-5 {
        padding-left: 200px;
    }
`;

const HelpsContents = () => {
    const dispatch = useDispatch();
    const { Code, Title } = useParams();
    const [Content_State, setContent_State] = useState([]);
    useEffect(() => {
        Get_Content_Info();
    }, [Code]);

    const Get_Content_Info = async () => {
        if (Code && Code !== 'TOP') {
            const Get_Content_Info_Axios = await Request_Get_Axios('/Pms_Route/MenuRouter/Get_Content_Info', { Code });
            if (Get_Content_Info_Axios.status && Get_Content_Info_Axios?.data?.length > 0) {
                setContent_State(Get_Content_Info_Axios.data);
                dispatch(Change_Menu_Contents_Editor_State(Get_Content_Info_Axios.data[0]?.pms_content_info_content));
            } else {
                setContent_State([]);
                dispatch(Initial_Menu_Contents_Editor_State());
            }
        }
    };

    return (
        <HelpsContentsMainDivBox>
            <FindParent></FindParent>
            <MenuContentsContainerDivBox>
                <h2 className="Title_Group">{Title === 'TOP' ? 'PMS 도움말' : Title}</h2>
                {Code === 'TOP' ? (
                    <p>PMS 도움말 입니다.</p>
                ) : (
                    Content_State.map(list => {
                        return <div style={{ padding: '30px' }}>{parse(list?.pms_content_info_content.replaceAll('_blank', '_self'))}</div>;
                    })
                )}
                <div className="Lines"></div>
            </MenuContentsContainerDivBox>
        </HelpsContentsMainDivBox>
    );
};

export default HelpsContents;
