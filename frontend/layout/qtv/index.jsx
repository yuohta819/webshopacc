import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Bill from './bill';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogOut from './logout';
import { useLocale } from 'antd/es/locale';
import AccoutQTV from './accountqtv';
const { Header, Content, Footer } = Layout;
const QTV = import.meta.env.VITE_QTV
const items = [
    { key: '1', label: <Link to={`/${QTV}/thecao`}>Thẻ Cào</Link> },
    { key: '2', label: <Link to={`/${QTV}/atm`}>ATM</Link> },
    { key: '3', label: <Link to={`/${QTV}/rubux`}>Robux</Link> },
    { key: '5', label: <Link to={`/${QTV}/caythue`}>Blox Fruit</Link> },
    { key: '6', label: <Link to={`/${QTV}/lienquan`}>Liên Quân</Link> },
    { key: '7', label: <Link to={`/${QTV}/freefire`}>Free Fire</Link> },
  ];
const Dashboard = () => {
  const location = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const selectedKey = items.find(item => location.pathname.startsWith(item.key))?.key;
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 1514
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={selectedKey}
          items = {items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
          width: 1519
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
        <Outlet />
        </div>
      </Content>
      <AccoutQTV />
      <LogOut />
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default Dashboard;