export const fontSizeArr = ['8px', '9px', '10px', '12px', '14px', '16px', '20px', '24px', '32px', '42px', '54px', '68px', '84px', '98px'];
export const QuillModules = {
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
                document.getElementById('quill-image-upload').click();
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
                    quill.format('link', false); // 링크 삭제
                }
            },
        },
    },
};
