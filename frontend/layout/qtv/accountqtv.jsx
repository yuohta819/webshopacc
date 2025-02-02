import React, { useEffect, useState } from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const AccoutQTV = () => {
    const { styles } = useStyle();
    const QTV = import.meta.env.VITE_QTV
    const navigate = useNavigate()
    function handdleLink() {
        navigate(`/${QTV}/account`)
    }
    return (
        <div className="box" style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: 48,
            paddingTop: 20,
        }}>
            <ConfigProvider

                button={{
                    className: styles.linearGradientButton,
                }}
            >
                <Space >
                    <Button type="primary" size="large" onClick={handdleLink} icon={<AntDesignOutlined />}>
                        Tài khoản
                    </Button>
                </Space>
            </ConfigProvider>
        </div>
    );
};
export default AccoutQTV;