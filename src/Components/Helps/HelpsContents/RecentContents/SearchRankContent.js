import React, { useEffect, useState } from 'react';
import { RecentContentsMainDivBox } from './RecentContents';
import { Request_Get_Axios } from '../../../../API';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Change_Search_Menu_Contents_State } from '../../../../Models/MenuReducers/MenuSearchReducer/MenuSearchReducer';

const SearchRankContentMainDivBox = styled.div`
    display: flex;
    margin-top: 10px;
    .Left_Container {
        width: 50%;
    }
    .Right_Container {
        width: 50%;
    }
    .Contens_Container {
        padding: 15px;
        border: 1px solid lightgray;
        &:hover {
            cursor: pointer;
            background-color: #efefef;
        }
    }
`;

const SearchRankContent = () => {
    const Navigation = useNavigate();
    const dispatch = useDispatch();
    const [Select_Ranks, setSelect_Ranks] = useState([]);
    useEffect(() => {
        Getting_PMS_Description_For_Most_Select_Search_Data();
    }, []);
    const Getting_PMS_Description_For_Most_Select_Search_Data = async () => {
        const Getting_PMS_Description_For_Most_Select_Search_Data_Axios = await Request_Get_Axios(
            '/Pms_Route/MenuRouter//Getting_PMS_Description_For_Most_Select_Search_Data'
        );
        if (Getting_PMS_Description_For_Most_Select_Search_Data_Axios.status)
            setSelect_Ranks(Getting_PMS_Description_For_Most_Select_Search_Data_Axios.data);
    };

    const HandleSubmitForSearch = async Select_Data => {
        const Send_To_Server_For_Search_Datas_Axios = await Request_Get_Axios('/Pms_Route/MenuRouter/Send_To_Server_For_Search_Datas', {
            Select_Data,
        });
        if (Send_To_Server_For_Search_Datas_Axios.status) {
            const Change_Data = Send_To_Server_For_Search_Datas_Axios.data.map(list => {
                return {
                    ...list,
                    pms_content_info_content: list.pms_content_info_content
                        ?.replaceAll(Select_Data.toLowerCase(), `<span class="highlight">${Select_Data}</span>`)
                        ?.replaceAll(Select_Data.toUpperCase(), `<span class="highlight">${Select_Data}</span>`)
                        .replaceAll('<br>', ''),
                };
            });
            dispatch(Change_Search_Menu_Contents_State(Change_Data));
            Navigation(`/Home/Search/${Select_Data}`);
        }
    };

    return (
        <RecentContentsMainDivBox>
            <h2>가장 많이 검색 한 단어</h2>
            <SearchRankContentMainDivBox>
                <div className="Left_Container">
                    {Select_Ranks.map((list, j) => {
                        return j < 5 ? (
                            <div className="Contens_Container" onClick={() => HandleSubmitForSearch(list.pms_search_rank_search_text)}>
                                <h3>
                                    {j + 1}. {list.pms_search_rank_search_text}
                                </h3>
                            </div>
                        ) : (
                            <></>
                        );
                    })}
                </div>
                <div className="Right_Container">
                    {Select_Ranks.map((list, j) => {
                        return j >= 5 ? (
                            <div className="Contens_Container" onClick={() => HandleSubmitForSearch(list.pms_search_rank_search_text)}>
                                <h3>
                                    {j + 1}. {list.pms_search_rank_search_text}
                                </h3>
                            </div>
                        ) : (
                            <></>
                        );
                    })}
                </div>
            </SearchRankContentMainDivBox>
        </RecentContentsMainDivBox>
    );
};

export default SearchRankContent;
