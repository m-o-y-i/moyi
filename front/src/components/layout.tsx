import React, { ReactNode, useEffect } from "react";
import { Layout, Menu, theme } from "antd";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const { Header, Content, Footer } = Layout;
const LayoutComponents: React.FC<{
  children: ReactNode | null;
}> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const isRoot = getCookie("isRoot");
  const router = useRouter();
  useEffect(() => {
    if (!isRoot) {
      router.push("/login");
    }
  }, [router]);

  const items = [
    {
      key: "/dashboard",
      label: "首页",
    },
    {
      key: "/dashboard/log",
      label: "日志",
    },
  ];
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
          selectedKeys={[router.pathname]}
          mode="horizontal"
          items={items}
          onClick={(item) => router.push(item.key)}
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
