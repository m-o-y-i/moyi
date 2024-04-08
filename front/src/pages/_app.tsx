import "@/styles/globals.css";
import React, { useEffect, useRef } from "react";
import type { AppProps } from "next/app";
import zhCN from "antd/locale/zh_CN";
import Head from "next/head";
import { ConfigProvider } from "antd";

const getOml2dOptions = () => {
  return {
    models: [
      {
        path: "https://model.oml2d.com/cat-black/model.json",
        scale: 0.15,
        position: [0, 20],
        stageStyle: {
          height: 350,
        },
        menus: {
          disable: true,
          items: [],
        },
      },
    ],
    menus: {
      disable: true,
    },
  };
};

export default function App({ Component, pageProps }: AppProps) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      // 解决live2d渲染两次问题
      isFirstRender.current = false;
      return; // 不执行副作用代码
    }
    const oml2dOptions: any = getOml2dOptions();
    if (oml2dOptions) {
      import("oh-my-live2d").then(({ loadOml2d }) => {
        loadOml2d(oml2dOptions);
      });
    }
    return () => {};
  }, []);
  return (
    <ConfigProvider locale={zhCN}>
      <Head>
        <title>沫逸</title>
      </Head>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
