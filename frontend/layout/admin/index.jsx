import React, { useEffect, useState } from 'react';
import { MdManageAccounts } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { Link } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Tongquan from './tongquan';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { BiSolidCategory } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
const { Header, Content, Footer, Sider } = Layout;


const Adminn = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const admin = import.meta.env.VITE_ADMIN

  return (
    <>
      <div className="selection-1">
        <h2 style={{
          margin: 0,
          padding: 20,
          background: '#002140',
          color: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}>ADMIN</h2>
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              
              <Menu.Item key="sub1" icon={<PieChartOutlined />}>
                <Link to={`/${admin}/tongquan`}>Tổng quan</Link>
              
              </Menu.Item>
              <Menu.SubMenu key="sub2" icon={<UserOutlined />} title="Tài Khoản">
                <Menu.Item key="1" icon={<MdManageAccounts />}>
                  <Link to={`/${admin}/createadmin`}>Tài Khoản Admin</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<MdOutlineManageAccounts />}>
                  <Link to={`/${admin}/createqtv`}>Tài Khoản QTV</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<MdOutlineManageAccounts />}>
                  <Link >Tài Khoản Khách Hàng</Link>
                </Menu.Item>
              </Menu.SubMenu>
             
              <Menu.SubMenu key="sub3" icon={< BiSolidCategory />} title="Sản Phẩm">
                <Menu.Item key="4" icon={<GiMoneyStack />}>
                  <Link to={`/${admin}/changerobux`}>Rubux</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<MdOutlineManageAccounts />}>
                  <Link to={`/${admin}/bloxfruit`}>Blox Fruit</Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<MdOutlineManageAccounts />}>
                  <Link to={`/${admin}/createqtv`}>Tài Khoản Khách Hàng</Link>
                </Menu.Item>
              </Menu.SubMenu>
             
              {/* <Menu.SubMenu key="sub4" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />}>
                Files
              </Menu.Item> */}
            </Menu>
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
                margin: '0 16px',
              }}
            >
              <Breadcrumb
                style={{
                  margin: '16px 0',
                }}
              >
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
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

    </>
  );
};
export default Adminn