import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactQuills from '../Helps/EditorContents/ReactQuills/ReactQuills';
import { useDispatch, useSelector } from 'react-redux';
import { Initial_Menu_Contents_Editor_State } from '../../Models/MenuReducers/MenuContentsEditorReducer/MenuContentsEditorReducer';
import Select from 'react-select';
import { Request_Get_Axios, Request_Post_Axios } from '../../API';
import { toast } from '../../ToastMessage/ToastManager';

// Styled Components
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Modal = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    min-width: 520px;

    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-in-out;
    color: black;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const Message = styled.p`
    font-size: 16px;
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ConfirmButton = styled.button`
    background: ${props => (props.BackColors ? props.BackColors : 'green')};
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    flex: 1;
    margin-right: 10px;

    &:hover {
        background: ${props => (props.hoverBackColors ? props.hoverBackColors : 'darkgreen')};
    }
`;

const CancelButton = styled.button`
    background: #ddd;
    color: black;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    flex: 1;

    &:hover {
        background: #bbb;
    }
`;

const MailSendModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [Select_Value, setSelect_Value] = useState(null);
    const [Select_Options, setSelect_Options] = useState([]);
    const Content_State = useSelector(state => state.MenuContentsEditorReducer.Editor_State);
    const onConfirm = async () => {
        const Send_To_Mail_From_Client = await Request_Post_Axios('/Pms_Route/MenuRouter/Send_To_Mail_From_Client', {
            Select_Value,
            Content_State,
        });
        if (Send_To_Mail_From_Client.status) {
            dispatch(Initial_Menu_Contents_Editor_State());
            onClose();
            toast.show({
                title: `정상적으로 메일 발송이 되었습니다..`,
                successCheck: true,
                duration: 6000,
            });
        }
    };
    const HandleCancle = () => {
        onClose();
    };

    const Get_Select_Person_Options = async () => {
        const Get_Select_Person_Options_Axios = await Request_Get_Axios('/Pms_Route/MenuRouter/Get_Select_Person_Options');
        if (Get_Select_Person_Options_Axios.status) {
            setSelect_Options(Get_Select_Person_Options_Axios.data);
        }
    };

    useEffect(() => {
        Get_Select_Person_Options();
    }, []);

    const handleChangeData = e => {
        setSelect_Value(e);
    };

    return (
        <Overlay>
            <Modal>
                <h4 style={{ marginBottom: '20px' }}>문의사항.</h4>

                <div style={{ marginBottom: '20px' }}>
                    <div>작성자 이메일</div>
                    <div>
                        <Select
                            value={Select_Value}
                            onChange={e => handleChangeData(e)}
                            name="colors"
                            options={Select_Options}
                            className="basic-multi-select"
                            classNamePrefix="하위 메뉴 등록을 위해 선택 해 주세요."
                            placeholder="이메일을 작성 해 주세요."
                        />
                    </div>
                </div>
                <ReactQuills></ReactQuills>
                <ButtonContainer>
                    <ConfirmButton onClick={onConfirm}> 메 일 전 송 </ConfirmButton>
                    <CancelButton onClick={() => HandleCancle()}> 취 소 </CancelButton>
                </ButtonContainer>
            </Modal>
        </Overlay>
    );
};

export default React.memo(MailSendModal);
