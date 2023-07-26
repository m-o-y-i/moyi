import React, { ReactNode, useEffect, useState } from "react";
import { Avatar, Layout, Menu, theme } from "antd";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const LayoutComponents: React.FC<{
  children: ReactNode | null;
}> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isRoot, setIsRoot] = useState<any>(false);
  const router = useRouter();
  useEffect(() => {
    if (typeof getCookie("isRoot") !== "boolean") {
      router.push("/login");
    }
    setIsRoot(getCookie("isRoot"));
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
          justifyContent: "space-between",
        }}
      >
        <Menu
          selectedKeys={[router.pathname]}
          mode="horizontal"
          items={items}
          onClick={(item) => router.push(item.key)}
        />
        {isRoot ? (
          <Avatar style={{ background: "#1890ff" }}>逸</Avatar>
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
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
