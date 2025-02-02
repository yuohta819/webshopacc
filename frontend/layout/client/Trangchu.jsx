import 'antd/dist/reset.css';
import React from 'react';
import { Button, Flex, Segmented } from 'antd';
import { Link } from 'react-router-dom';
function TrangChu() {
    const boxStyle = {
        width: '100%',
        height: 120,
    };
    const justifyOptions = [
        'space-around',
    ];
    const alignOptions = ['flex-start', 'center', 'flex-end'];
    const [justify, setJustify] = React.useState(justifyOptions[0]);
    const [alignItems, setAlignItems] = React.useState(alignOptions[0]);
    return (
        <>
            <Flex gap="middle" align="start" vertical>
                <Flex style={boxStyle} justify={justify} align={alignItems}>
                   <button><img src="https://cdn3.upanh.info/upload/server-sw3/images/Acc%20Roblox%20Gia%20R%E1%BA%BB.png" alt="" /></button>
                    <button><img src="https://cdn3.upanh.info/upload/server-sw3/images/D%E1%BB%8Bch%20v%E1%BB%A5%20TTD.png" alt="" /></button>
                    <button><img src="https://cdn3.upanh.info/upload/server-sw3/images/D%E1%BB%8Bch%20v%E1%BB%A5%20Anime%20Defenders.png" alt="" /></button>
                </Flex>
            </Flex>
            <Flex gap="middle" align="start" vertical>
                <Flex style={boxStyle} justify={justify} align={alignItems}>
                    <button><img src="https://cdn3.upanh.info/upload/server-sw3/images/Gamepass%20Blox%20Fruits.png" alt="" /></button>
                    <button><img src="https://cdn3.upanh.info/upload/server-sw3/images/S%E1%BA%A3n%20Ph%E1%BA%A9m%20Hot.png" alt="" /></button>
                    <button><img src="https://cdn3.upanh.info/upload/server-sw3/images/icon-discord-nhan0qua.png" alt="" /></button>
                </Flex>
            </Flex>
        </>

    );
}
export default TrangChu;