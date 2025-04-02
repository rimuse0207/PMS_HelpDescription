import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ReactQuills from '../Helps/EditorContents/ReactQuills/ReactQuills';
import { useDispatch, useSelector } from 'react-redux';
import { Initial_Menu_Contents_Editor_State } from '../../Models/MenuReducers/MenuContentsEditorReducer/MenuContentsEditorReducer';
import Select from 'react-select';
import { Request_Get_Axios, Request_Post_Axios } from '../../API';
import { toast } from '../../ToastMessage/ToastManager';
import { InputType } from '../MenuUpdate/MenuAddInputs/MenuAddInputs';
import axios from 'axios';
import { FiDelete } from 'react-icons/fi';

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
    .Attend_Container {
        margin-bottom: 15px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        justify-content: space-between;
        .Delete_Icons {
            &:hover {
                cursor: pointer;
                color: red;
            }
        }
    }
`;

const Modal = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    min-width: 520px;
    height: 80%;
    overflow: auto;
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
    const input_Ref = useRef();
    const [Select_Value, setSelect_Value] = useState(null);
    const [Select_Options, setSelect_Options] = useState([]);
    const [filesList, setFilesList] = useState([]);
    const [MailTitle, setMailTitle] = useState('');

    const Content_State = useSelector(state => state.MenuContentsEditorReducer.Editor_State);

    const Handle_Change_Insert_Files = async e => {
        const formData = new FormData();

        for (var i = 0; i < e.target.files.length; i++) {
            console.log(e.target.files[i]);
            formData.append('file', e.target.files[i]);
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_DB_HOST}/Pms_Route/MenuRouter/PMS_Board_Send_Mails_For_Files_Upload`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            setFilesList(filesList.concat(response.data.data));
            console.log(response);

            if (input_Ref.current) {
                input_Ref.current.value = '';
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Handle_Delete_File_List = Select_Data => {
        const Delete_File_Data = filesList.filter(item => item.filename !== Select_Data.filename);
        setFilesList(Delete_File_Data);
    };

    const onConfirm = async () => {
        if (!Select_Value) {
            toast.show({
                title: `작성자 이메일을 선택 해 주세요.`,
                successCheck: false,
                duration: 6000,
            });

            return;
        }
        const Send_To_Mail_From_Client = await Request_Post_Axios('/Pms_Route/MenuRouter/Send_To_Mail_From_Client', {
            Select_Value,
            Content_State,
            filesList,
            MailTitle,
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
                <div style={{ marginBottom: '30px' }}>
                    <div>제목</div>
                    <InputType
                        style={{ height: '40px' }}
                        type="text"
                        placeholder="제목을 입력 해 주세요."
                        value={MailTitle}
                        onChange={e => setMailTitle(e.target.value)}
                    ></InputType>
                </div>
                {/* <div style={{ marginTop: '25px', marginBottom: '25px' }}>
                    <div>첨부파일</div>
                    <input
                        type="file"
                        name="files"
                        id="files"
                        multiple
                        onChange={e => Handle_Change_Insert_Files(e)}
                        ref={input_Ref}
                    ></input>
                    {filesList.length > 0 ? (
                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <div>첨부파일 리스트</div>
                            <ul>
                                <div style={{ border: '1px solid lightgray', marginBottom: '10px' }}></div>
                                {filesList.map((list, indexs) => {
                                    return (
                                        <li className="Attend_Container" key={list.filename}>
                                            <div>
                                                <span style={{ marginRight: '20px' }}>{indexs + 1}.</span>
                                                <span>{list.originalname}</span>
                                            </div>
                                            <div className="Delete_Icons" onClick={() => Handle_Delete_File_List(list)}>
                                                <FiDelete />
                                            </div>
                                        </li>
                                    );
                                })}
                                <div style={{ border: '1px solid lightgray', marginTop: '10px' }}></div>
                            </ul>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div> */}
                <ReactQuills setHeight="30vh"></ReactQuills>
                <ButtonContainer>
                    <ConfirmButton onClick={onConfirm}> 메 일 전 송 </ConfirmButton>
                    <CancelButton onClick={() => HandleCancle()}> 취 소 </CancelButton>
                </ButtonContainer>
            </Modal>
        </Overlay>
    );
};

export default React.memo(MailSendModal);
