import React, { useState, useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';

const fontSizeArr = ['8px', '9px', '10px', '12px', '14px', '16px', '20px', '24px', '32px', '42px', '54px', '68px', '84px', '98px'];
const SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = fontSizeArr;
Quill.register(SizeStyle, true);

const Font = Quill.import('attributors/class/font');
Font.whitelist = ['arial', 'buri', 'gangwon'];
Quill.register(Font, true);

const DEFAULT_FONT = 'arial';
const DEFAULT_SIZE = '14px';

const formats = [
    'font',
    'size',
    'color',
    'background',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
];

const ReactQuills = () => {
    const [value, setValue] = useState('');
    const quillRef = useRef(null);
    const lastFormat = useRef({ font: DEFAULT_FONT, size: DEFAULT_SIZE });

    const QuillModules = {
        toolbar: {
            container: [
                [{ font: [] }],
                [{ size: fontSizeArr }],
                [{ color: [] }, { background: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['link', 'image'],
                ['clean'],
            ],
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
    };

    useEffect(() => {
        const initializeQuill = () => {
            if (quillRef.current) {
                const quill = quillRef.current.getEditor();
                if (!quill) return;

                // 스크롤 위치 고정
                quill.on('text-change', () => {
                    const scrollTop = quill.root.scrollTop;
                    quill.root.scrollTop = scrollTop; // 스크롤 고정
                });

                quill.on('selection-change', range => {
                    if (range && range.index !== undefined) {
                        const currentFormat = quill.getFormat(range.index);
                        lastFormat.current = {
                            font: currentFormat.font || lastFormat.current.font,
                            size: currentFormat.size || lastFormat.current.size,
                        };
                    }
                });

                quill.on('editor-change', () => {
                    setTimeout(() => {
                        if (!quill.hasFocus()) {
                            quill.focus();
                        }
                    }, 0);
                });
            }
        };

        // Add a delay to initialize quill after the component has fully mounted
        setTimeout(initializeQuill, 500);
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

                console.log(response);
                const imageUrl = `${process.env.REACT_APP_DB_HOST}/${response.data.url}`;
                quill.insertEmbed(range.index, 'image', imageUrl);
            } catch (error) {
                console.error('이미지 업로드 실패:', error);
            }
        });

        await Promise.all(uploadPromises);
        event.target.value = '';
    };

    return (
        <div>
            <ReactQuill
                style={{ height: 'calc(100vh - 300px)', width: '100%' }}
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder="내용을 입력하세요."
                modules={QuillModules}
                formats={formats}
            />
            <input type="file" id="quill-image-upload" multiple accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
        </div>
    );
};

export default ReactQuills;
