import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import zhCN from "antd/locale/zh_CN";
import Head from "next/head";
import { ConfigProvider } from "antd";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={zhCN}>
      <Head>
        <title>沫逸</title>
      </Head>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
