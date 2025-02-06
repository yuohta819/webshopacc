import React, { useState } from "react";
import { Layout, Menu, Card, Avatar } from "antd";
const { Header, Content } = Layout;

const champions = [
  { id: 1, name: "Ahri", img: "https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/Ahri.png" },
  { id: 2, name: "Yasuo", img: "https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/Yasuo.png" },
  { id: 3, name: "Lee Sin", img: "https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/LeeSin.png" }
];

const AccountInfo = () => (
  <Card title="Thông Tin Tài Khoản">
    <p><b>Tên:</b> APVV02</p>
    <p><b>Rank:</b> Chưa có hạng</p>
    <p><b>Khung:</b> Sắt</p>
  </Card>
);

const ChampionList = () => (
  <Card title="Danh Sách Tướng">
    <div style={{ display: "flex", gap: "10px" }}>
      {champions.map((champ) => (
        <Card key={champ.id} hoverable cover={<img alt={champ.name} src={champ.img} />}>
          <Card.Meta title={champ.name} />
        </Card>
      ))}
    </div>
  </Card>
);

const Lienminh = () => {
  const [selectedTab, setSelectedTab] = useState("info");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#000", color: "#fff", textAlign: "center", fontSize: "20px", margin: "35px 0 " }}>
        Acc Liên Minh #7463
      </Header>
      <Menu mode="horizontal" selectedKeys={[selectedTab]} onClick={(e) => setSelectedTab(e.key)}>
        <Menu.Item key="info" >Thông Tin</Menu.Item>
        <Menu.Item key="champions" >Tướng</Menu.Item>
        <Menu.Item key="skins">Trang Phục</Menu.Item>
        <Menu.Item key="achievements" >Thành Tích</Menu.Item>
      </Menu>
      {/* <Content style={{ padding: "20px" }}>
        {selectedTab === "info" && <AccountInfo />}
        {selectedTab === "champions" && <ChampionList />}
        {selectedTab === "skins" && <SkinList />}
        {selectedTab === "achievements" && <Achievements />}
      </Content> */}
    </Layout>
  );
};

export default Lienminh;
