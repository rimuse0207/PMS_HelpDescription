import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Request_Get_Axios } from '../../../../API';
import { SearchContentsMainDivBox } from '../../SearchContents/SearchContents';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

export const RecentContentsMainDivBox = styled.div`
    padding-bottom: 50px;
    border-top: 1px dashed #5bb73b;
    padding-top: 50px;
    .Contents_Group {
        height: 130px;
        overflow: hidden;
        font-weight: 100;
        position: relative;
    }
`;

const RecentContents = () => {
    const Navigation = useNavigate();
    const [Most_Select_Data, setMost_Select_Data] = useState([]);
    useEffect(() => {
        Getting_PMS_Description_For_Most_Select_Data();
    }, []);

    const Getting_PMS_Description_For_Most_Select_Data = async () => {
        const Getting_PMS_Description_For_Most_Select_Data_Axios = await Request_Get_Axios(
            '/Pms_Route/MenuRouter/Getting_PMS_Description_For_Most_Select_Data'
        );

        if (Getting_PMS_Description_For_Most_Select_Data_Axios.status) {
            setMost_Select_Data(Getting_PMS_Description_For_Most_Select_Data_Axios.data);
        }
    };
    const HandleClicKMoveToDescript = (e, list) => {
        Navigation(`/Home/Helps/${list.menu_code}/${list.menu_name}/${list.menu_parent_code}/${list.menu_parent_name}`);
    };

    return (
        <RecentContentsMainDivBox>
            <div>
                <h2>가장 많이 조회 한 도움말</h2>
                <div style={{ border: '1px solid lightgray', borderRadius: '5px', marginTop: '10px' }}>
                    <SearchContentsMainDivBox>
                        {Most_Select_Data.map((list, j) => {
                            return (
                                <div key={list.menu_code} className="Contents_Group" onClick={e => HandleClicKMoveToDescript(e, list)}>
                                    <h3>
                                        {j + 1}. {list.menu_name}
                                    </h3>
                                    {list.pms_content_info_content ? (
                                        <div className="Content_Container" style={{ fontSize: '10px !important', paddingLeft: '20px' }}>
                                            {parse(list?.pms_content_info_content)}
                                        </div>
                                    ) : (
                                        '컨텐츠가 없습니다.'
                                    )}
                                    <div
                                        style={{
                                            background: '#fff',
                                            height: '15px',
                                            position: 'absolute',
                                            width: '100%',
                                            bottom: '0px',
                                            left: '0px',
                                        }}
                                    ></div>
                                </div>
                            );
                        })}
                    </SearchContentsMainDivBox>
                </div>
            </div>
        </RecentContentsMainDivBox>
    );
};

export default RecentContents;
