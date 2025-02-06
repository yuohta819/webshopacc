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
                    <button><img src="https://cdn3.upanh.info/upload/server-sw3/images/Acc%20FF%20Gia%20R%E1%BA%BB.png" alt="" /></button>
                    <button><img src="https://lightlauriel.com/img/danh-muc-hot/cate_6.png" alt="" /></button>
                </Flex>
            </Flex>
            <Flex gap="middle" align="start" vertical>
                <Flex style={boxStyle} justify={justify} align={alignItems}>
                    <button><img src="https://shopfifavn.com/statics/themes/nghiencode/images/default-thumbnail.jpg" style={{height: "80px", borderRadius: "10px"}} alt="" /></button>
                    <button><img src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lvg7de2imvl06f" style={{height: "80px", borderRadius: "10px"}} alt="" /></button>
                    <button><img src="https://scdn-stc.vng.games/mainsite/images/tocchien-icon.png" alt="" style={{height: "80px", borderRadius: "10px"}} /></button>
                </Flex>
            </Flex>
        </>

    );
}
export default TrangChu;