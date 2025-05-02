import React from 'react';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export const SearchContentsMainDivBox = styled.div`
    padding: 10px;
    width: 100%;
    max-height: calc(100vh - 70px);
    overflow: auto;
    .title_group {
        border-bottom: 1px dashed #5bb73b;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .Contents_Group {
        border-bottom: 1px solid gray;
        padding: 10px;

        &:hover {
            cursor: pointer;
            background-color: #efefef;
        }
        h3 {
            margin-bottom: 20px;
        }
        .Content_Container {
            p,
            li,
            div {
                display: inline-block;
            }
            strong,
            span {
                font-size: 14px !important;
            }
            img {
                display: none;
            }
        }
    }
`;

const SearchContents = () => {
    const Navigation = useNavigate();
    const Search_State = useSelector(state => state.MenuSearchReducer.Search_State);

    const HandleClicKMoveToDescript = (e, list) => {
        Navigation(`/Home/Helps/${list.menu_code}/${list.menu_name}/${list.menu_parent_code}/${list.menu_parent_name}`);
    };

    return (
        <SearchContentsMainDivBox>
            <div className="title_group">
                <h2>검색</h2>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <strong>찾은 검색 결과: {Search_State.length}</strong>
            </div>
            {Search_State.map(list => {
                return (
                    <div key={list.menu_name} className="Contents_Group" onClick={e => HandleClicKMoveToDescript(e, list)}>
                        <h3>{list.menu_name}</h3>
                        {list.pms_content_info_content ? (
                            <div className="Content_Container" style={{ fontSize: '10px !important' }}>
                                {parse(list?.pms_content_info_content)}
                            </div>
                        ) : (
                            '컨텐츠가 없습니다.'
                        )}
                    </div>
                );
            })}
        </SearchContentsMainDivBox>
    );
};

export default SearchContents;
