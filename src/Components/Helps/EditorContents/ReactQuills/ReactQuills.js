import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';
import ToolBars from './ToolBars';
import Delta from 'quill-delta';
import ImageResize from '@looop/quill-image-resize-module-react';

import { useDispatch, useSelector } from 'react-redux';
import { Change_Menu_Contents_Editor_State } from '../../../../Models/MenuReducers/MenuContentsEditorReducer/MenuContentsEditorReducer';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';

const fontSizeArr = ['8px', '9px', '10px', '14px', '16px', '20px', '24px', '32px', '42px', '54px', '68px', '84px', '98px'];
const SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = fontSizeArr;
Quill.register(SizeStyle, true);
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);
const Font = Quill.import('attributors/class/font');
Font.whitelist = ['arial', 'buri', 'gangwon'];
Quill.register(Font, true);

Quill.register('modules/imageResize', ImageResize);

const formats = ['size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'indent', 'color', 'background', 'align', 'image', 'link'];

const ReactQuills = ({ setHeight }) => {
    const dispatch = useDispatch();
    const Editor_State = useSelector(state => state.MenuContentsEditorReducer.Editor_State);
    const quillRef = useRef(null);

    const imageHandler = async (imageDataUrl, type, imageData) => {
        const file = imageData.toFile();
        const formData = new FormData();

        // append blob data
        formData.append('image', file);

        const quill = quillRef.current?.getEditor();
        const range = quill.getSelection();
        if (!quill) return;
        try {
            const response = await axios.post(`${process.env.REACT_APP_DB_HOST}/Pms_Route/MenuRouter/Pms_Image_Upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const imageUrl = `${process.env.REACT_APP_DB_HOST}/public/pms/${response.data.url}`;
            quill.insertEmbed(range.index, 'image', imageUrl);
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드 실패! IT팀에 문의바랍니다.');
        }
    };

    const QuillModules = useMemo(() => {
        return {
            toolbar: {
                container: '#toolbar',
                handlers: {
                    image: () => {
                        document.getElementById('quill-image-upload')?.click();
                    },
                    link: function () {
                        const quill = this.quill;
                        const range = quill.getSelection();
                        if (!range) return;

                        const existingLink = quill.getFormat(range).link || '';
                        const url = prompt('Enter the URL:', existingLink);

                        if (url) {
                            quill.format('link', url);
                        } else {
                            quill.format('link', false);
                        }
                    },
                },
            },
            imageDropAndPaste: {
                // add an custom image handler
                handler: imageHandler,
            },
            imageResize: {
                modules: ['Resize', 'DisplaySize'],
            },
            // imageDrop: true,
            history: {
                delay: 3000,
                maxStack: 100,
                userOnly: true,
            },

            clipboard: {
                matchers: [
                    [
                        'P',
                        (node, delta) => {
                            // 기존 P 태그의 속성을 유지하면서 새 줄을 추가
                            const previousFormat = quillRef.current?.getEditor()?.getFormat();
                            return delta.compose(new Delta().retain(delta.length(), previousFormat));
                        },
                    ],
                ],
            },
        };
    }, []);

    const handleImageUpload = async event => {
        const files = event.target.files;
        if (!files.length) return;

        const quill = quillRef.current?.getEditor();
        if (!quill) return;

        const range = quill.getSelection();

        const uploadPromises = Array.from(files).map(async file => {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post(`${process.env.REACT_APP_DB_HOST}/Pms_Route/MenuRouter/Pms_Image_Upload`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const imageUrl = `${process.env.REACT_APP_DB_HOST}/public/pms/${response.data.url}`;
                quill.insertEmbed(range.index, 'image', imageUrl);
            } catch (error) {
                console.error('이미지 업로드 실패:', error);
                alert('이미지 업로드 실패! IT팀에 문의바랍니다.');
            }
        });

        await Promise.all(uploadPromises);
        event.target.value = '';
    };

    const HandleEnter = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const quill = quillRef.current?.getEditor();
            if (!quill) return;

            const handleTextChange = (delta, oldDelta, source) => {
                if (source !== 'user') return;

                const selection = quill.getSelection();
                if (!selection) return;

                const [line, offset] = quill.getLine(selection.index);
                if (!line) return;

                const format = quill.getFormat(selection.index - 1); // 이전 줄 스타일 가져오기
                quill.formatText(selection.index, 1, format); // 현재 줄에 적용
            };

            quill.on('text-change', handleTextChange);
            return () => {
                quill.off('text-change', handleTextChange);
            };
        }
    };

    return (
        <div>
            <ToolBars></ToolBars>
            <div style={{ height: setHeight, overflow: 'auto' }}>
                <ReactQuill
                    onKeyDown={e => HandleEnter(e)}
                    style={{ width: '100%', background: '#fefefe' }}
                    ref={quillRef}
                    theme="snow"
                    value={Editor_State}
                    onChange={e => {
                        dispatch(Change_Menu_Contents_Editor_State(e));
                    }}
                    placeholder="내용을 입력하세요."
                    modules={QuillModules}
                    formats={formats}
                />
            </div>
            <input type="file" id="quill-image-upload" multiple accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
        </div>
    );
};

export default ReactQuills;
