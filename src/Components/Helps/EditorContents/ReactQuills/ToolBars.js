import React from 'react';

const ToolBars = () => {
    const fontSizeArr = ['8px', '9px', '10px', '14px', '16px', '20px', '24px', '32px', '42px', '54px', '68px', '84px', '98px'];
    return (
        <div>
            <div id="toolbar">
                <span className="ql-formats">
                    {/* <select className="ql-font" defaultValue="arial">
                        <option value="arial">Arial</option>
                        <option value="buri">Buri</option>
                        <option value="gangwon">Gangwon</option>
                    </select> */}
                    <select className="ql-size" defaultValue="10px">
                        {fontSizeArr.map(list => {
                            return (
                                <option key={list} value={list}>
                                    {list}
                                </option>
                            );
                        })}
                    </select>
                </span>
                <span className="ql-formats">
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                </span>
                <span className="ql-formats">
                    {/* <button className="ql-list" value="ordered" /> */}
                    <button className="ql-indent" value="-1" />
                    <button className="ql-indent" value="+1" />
                </span>
                <span className="ql-formats">
                    <select className="ql-color" />
                    <select className="ql-background" />
                    <select className="ql-align" />
                </span>
                <span className="ql-formats">
                    <button className="ql-image" />
                    <button className="ql-link" />
                </span>
                <span className="ql-formats">
                    <button className="ql-clean" />
                </span>
            </div>
        </div>
    );
};
export default ToolBars;
