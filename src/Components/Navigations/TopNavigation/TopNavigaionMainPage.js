import React from 'react';
import styled from 'styled-components';
import { FaHome } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Change_Side_Menu_Func } from '../../../Models/MenuReducers/SideMenuReducer/SideMenuReducer';
import { useNavigate } from 'react-router-dom';
const TopNavigationMainPageMainDivBox = styled.div`
    height: 64px;
    background: #3d4647;
    color: #fefefe;
    border-style: solid;
    border-width: 0px 0px 6px 0px;
    border-color: transparent transparent #5bb73b transparent;
    border-radius: 0px;
    .ww_skin_toolbar {
        font-family: arial, sans_serif;
        padding: 0;
        margin: 0;
    }
    table {
        border-spacing: 0;
        tbody {
            border-spacing: 0;
        }
    }
    .ww_skin_toolvar_cluster {
        white-space: nowrap;
    }
    .ww_skin_toolbar_button_spacer {
        width: 300px;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
    }
    .ww_skin_toolbar_button_left,
    .ww_skin_toolbar_button_center,
    .ww_skin_toolbar_button_right {
        display: inline-block;
        vertical-align: top;
    }
    .ww_skin_toolbar p,
    .ww_skin_toolbar a,
    .ww_skin_toolbar span,
    .ww_skin_toolbar pre {
        font-size: 14pt;
    }
    .ww_skin_home {
        background: #3d4647;
        width: 56px;
        height: 56px;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
    }
    .ww_skin_home:hover {
        background: #252b2c;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
        cursor: pointer;
    }
    .ww_skin_button {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
    .ww_skin_home i {
        font-size: 18pt;
        color: #fefefe;
    }
    .fa {
        display: inline-block;
        font: normal normal normal 14px / 1 FontAwesome;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
    }
    .ww_skin_menu_toggle_button {
        text-decoration: none;
        display: table;
        vertical-align: top;
        text-align: center;
        cursor: pointer;
    }
    .ww_skin_toolbar_button_left,
    .ww_skin_toolbar_button_center,
    .ww_skin_toolbar_button_right {
        display: inline-block;
        vertical-align: top;
    }
    a {
        color: #5bb73b;
        text-decoration: none;
    }
    .ww_skin_menu {
        background: #3d4647;
        width: 56px;
        height: 56px;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
    }
    .ww_skin_menu:hover {
        background: #252b2c;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
        cursor: pointer;
    }
    .ww_skin_menu_toggle_button i {
        display: table-cell;
        vertical-align: middle;
    }
    .ww_skin_menu i {
        font-size: 18pt;
        color: #fefefe;
    }

    .ww_skin_prev {
        background: #3d4647;
        width: 56px;
        height: 56px;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
    }
    .ww_skin_prev:hover {
        background: #252b2c;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
        cursor: pointer;
    }
    .ww_skin_prev i {
        font-size: 18pt;
        color: #fefefe;
    }
    .ww_skin_next {
        background: #3d4647;
        width: 56px;
        height: 56px;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
    }
    .ww_skin_next:hover {
        background: #252b2c;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
        cursor: pointer;
    }
    .ww_skin_next i {
        font-size: 18pt;
        color: #fefefe;
        vertical-align: -4px;
    }
    .ww_skin_toolbar_cluster_search {
        width: 99%;
        background: #3d4647;
    }

    .ww_skin_search_form {
        display: inline-block;
        width: 100%;
        background: #3d4647;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
    }

    .ww_skin_search_form_inner {
        width: 100%;
    }
    .ww_skin_search_table {
        border-collapse: collapse;
        border-spacing: 0px;
        border-color: transparent;
    }
    .ww_skin_search_scope_container {
        display: table-cell;
        vertical-align: middle;
        border-collapse: initial;
        padding-left: 20px;
        padding-right: 0px;
    }
    .ww_skin_search_input_container {
        font-size: 0;
        width: 81%;
        border: none;
        vertical-align: middle;
    }
    .ww_skin_search_input {
        font-family: arial, sans_serif;
        font-size: 10pt;
        width: 100%;
        height: 30px;
        padding: 2px;
        border-style: solid;
        border-width: 1px;
        border-color: transparent;
        border-radius: 8px;
    }
    .ww_skin_search_button_container_outer {
        padding: 0px;
    }
    .ww_skin_search_button_container_inner {
        width: 56px;
    }
    .ww_skin_search_button {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
    .ww_skin_search {
        background: #3d4647;
        width: 56px;
        height: 56px;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
    }
    .ww_skin_search i {
        font-size: 24pt;
        color: #fefefe;
        font-weight: bolder;
    }
    .ww_skin_search:hover {
        background: #252b2c;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
        cursor: pointer;
    }
    .ww_skin_toolbar_logo_spacer {
        height: 56px;
        overflow: hidden;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
        text-align: right;
    }
    .ww_skin_toolbar_logo_container {
        height: 56px;
        background: #3d4647;
        display: inline-block;
        border-style: none;
        border-width: 0px;
        border-color: transparent;
        border-radius: 0px;
        padding-top: 10.5px;
        padding-bottom: 10.5px;
        padding-left: 0px;
        padding-right: 37px;
    }
    img.ww_skin_toolbar_logo {
        height: 35px;
        width: auto;
        max-height: 56px;
    }
`;

const TopNavigationMainPage = () => {
    const Navigation = useNavigate();
    const dispatch = useDispatch();
    const HandleChangeMenu = () => {
        dispatch(Change_Side_Menu_Func());
    };

    const HandleMoveToHome = () => {
        Navigation('/Home/Helps');
    };
    return (
        <TopNavigationMainPageMainDivBox>
            <table className="ww_skin_toolbar">
                <tbody>
                    <tr>
                        <td className="ww_skin_toolbar_cluster ww_skin_toolbar_cluster_left">
                            <div className="ww_skin_toolbar_menu_spacer ww_skin_toolbar_button_spacer">
                                <span
                                    className="ww_skin_toolbar_button_left ww_skin_toolbar_background_default ww_skin_toolbar_left_background ww_skin_toolbar_button_enabled"
                                    onClick={() => HandleMoveToHome()}
                                >
                                    <a className="ww_behavior_home ww_skin ww_skin_button ww_skin_home">
                                        <i className="fa">
                                            <FaHome />
                                        </i>
                                    </a>
                                </span>
                                <span
                                    className="ww_skin_toolbar_button_right ww_skin_menu_toggle_button"
                                    onClick={() => HandleChangeMenu()}
                                >
                                    <a className="ww_behavior_menu ww_skin ww_skin_menu ww_skin_menu_toggle_button">
                                        <i className="fa">
                                            <GiHamburgerMenu />
                                        </i>
                                    </a>
                                </span>
                                <span className="ww_skin_toolbar_button_right ww_skin_toolbar_background_default ww_skin_toolbar_button_enabled">
                                    <a className="ww_behavior_prev ww_skin ww_skin_button ww_skin_prev">
                                        <i className="fa">
                                            <FaCaretUp />
                                        </i>
                                    </a>
                                </span>
                                <span className="ww_skin_toolbar_button_right ww_skin_toolbar_background_default ww_skin_toolbar_button_enabled">
                                    <a className="ww_behavior_next ww_skin ww_skin_button ww_skin_next">
                                        <i className="fa">
                                            <FaCaretDown />
                                        </i>
                                    </a>
                                </span>
                            </div>
                        </td>

                        <td className="ww_skin_toolbar_cluster ww_skin_toolbar_cluster_search">
                            <form className="ww_skin_search_form">
                                <span className="ww_skin_toolbar_button_left ww_skin_toolbar_background_default ww_skin_toolbar_button_enabled ww_skin_search_form_inner ww_skin_toolbar_right_background">
                                    <table className="ww_skin_search_table">
                                        <tbody>
                                            <tr>
                                                <td
                                                    id="search_scope_container"
                                                    className="ww_skin_search_scope_container selector_options_closed"
                                                ></td>
                                                <td id="search_input_container" className="ww_skin_search_input_container">
                                                    <input id="search_input" className="ww_skin_search_input"></input>
                                                </td>
                                                <td className="ww_skin_search_button_container_outer">
                                                    <div className="ww_skin_search_button_container_inner">
                                                        <a className="ww_behavior_search ww_skin ww_skin_search ww_skin_search_button">
                                                            <i className="fa">
                                                                <IoSearch />
                                                            </i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </span>
                            </form>
                        </td>
                        <td className="ww_skin_toolbar_cluster ww_skin_toolbar_cluster_right">
                            <div className="ww_skin_toolbar_logo_spacer">
                                <div className="ww_skin_toolbar_logo_container">
                                    <img src="/EXICON PNG.PNG" className="ww_skin_toolbar_logo"></img>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </TopNavigationMainPageMainDivBox>
    );
};

export default TopNavigationMainPage;
