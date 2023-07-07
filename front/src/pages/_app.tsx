import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import zhCN from "antd/locale/zh_CN";
import Head from "next/head";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import { ConfigProvider } from "antd";

const { Header, Content, Footer } = Layout;
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // useEffect(() => {
  //     router.push("/login");
  // }, [router]);

  // if (!isRoot) {
  //   return (
  //     <ConfigProvider locale={zhCN}>
  //       <Head>
  //         <title>登录</title>
  //       </Head>
  //       <Component {...pageProps} />
  //     </ConfigProvider>
  //   );
  // }
  return (
    <ConfigProvider locale={zhCN}>
      <Head>
        <title>沫逸</title>
      </Head>
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
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
            }}
          >
            <Component {...pageProps} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>辽ICP备2023006147号-1</Footer>
      </Layout>
    </ConfigProvider>
  );
}
