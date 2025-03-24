import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const FindParentMainDivBox = styled.div`
    margin-bottom: 30px;
    color: gray;
    font-size: 15px;
`;

const FindParent = () => {
    const { Code } = useParams();
    const TreeMenu = useSelector(state => state.SideMenuListReducerThunks.data);
    const [parentChain, setParentChain] = useState('');

    const handleFindParent = () => {
        const chain = findParentChain(TreeMenu, Code);
        setParentChain(chain);
    };

    useEffect(() => {
        handleFindParent();
    }, [Code]);

    const findParentChain = (data, targetCode) => {
        let result = [];

        const findParent = (currentData, code) => {
            for (let item of currentData) {
                if (item.menu_code === code) {
                    result.unshift(item.menu_name); // Add current code to the front of the result array
                    if (item.menu_parent_code !== 'TOP') {
                        findParent(data, item.menu_parent_code); // Recursively find parent
                    }
                    break;
                }
                if (item.children.length > 0) {
                    findParent(item.children, code); // Recurse into children if they exist
                }
            }
        };

        findParent(data, targetCode);
        return result.join('  >  '); // Return the parent chain in the required format
    };

    return <FindParentMainDivBox>{parentChain}</FindParentMainDivBox>;
};

export default FindParent;
