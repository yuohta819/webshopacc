import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined,UserSwitchOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const lable = ["Trạng Thái Đơn Hàng", "Lịch sử mua hàng","Trạng Thái Nạp ATM", "Trạng Thái Thẻ Cào", "Thông tin tài khoản"]
const path = ["trangthai","lichsu","napatm" ,"napthe", "thongtin"]
const items = [VideoCameraOutlined,UserSwitchOutlined , UploadOutlined, UploadOutlined,UserOutlined].map(         //, UserOutlined VideoCameraOutlined
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: <Link to={`${path[index]}`}>{lable[index]}</Link>,
  }),
);
const Deatil = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation()
  return (
    <div className="box" style={{
      marginTop: 25,
      height: '100vh'
    }}>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={location.pathname} items={items} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content
            style={{
              margin: '24px 16px 0',
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
export default Deatil;