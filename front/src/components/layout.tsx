import React, { ReactNode } from "react";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer } = Layout;
const LayoutComponents: React.FC<{
  children: ReactNode | null;
}> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <div className="demo-logo" />
        <Menu
          defaultSelectedKeys={["1"]}
          mode="horizontal"
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
      </Header>
      <Content className="site-layout" style={{ padding: "0px 50px" }}>
        <div
          style={{
            margin: "16px 0",
            padding: 24,
            background: colorBgContainer,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center", fontSize: 12 }}>
        辽ICP备2023006147号-1
      </Footer>
    </Layout>
  );
};

export default LayoutComponents;
