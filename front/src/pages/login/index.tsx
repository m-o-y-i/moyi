import React, { useEffect, useState } from "react";
import Script from "next/script";
import { Button, Carousel, Divider, Form, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import request from "../../lib/request";
import { setCustomEncryption } from "../../lib/tools";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

const styles = require("./index.module.css");

// PC端登陆
const PC: React.FC<{}> = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.bgImg}>
      {/* 樱花特效 */}
      <Script src="/sakura.js" />
      <div className={styles.login}>
        <Carousel dots={false}>
          <>
            <p>登录</p>
            <Form
              name="login"
              style={{ maxWidth: 600, marginTop: 20 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              labelCol={{ span: 6 }}
              validateMessages={{
                required: "请输入${label}",
                pattern: {
                  mismatch:
                    "${label}只包含字母、数字和下划线,长度在3到16个字符",
                },
              }}
              onFinish={(values) => {
                setLoading(true);
                request({
                  method: "POST",
                  url: `${process.env.NEXT_PUBLIC_OPEN_URL}/login`,
                  body: {
                    ...values,
                    passWord: setCustomEncryption(values.passWord) + "my",
                  },
                }).then((res) => {
                  if (res.status) {
                    message.success(res.message);
                    setCookie("isRoot", true);
                    router.push("/dashboard");
                  } else {
                    message.error(res.message);
                  }
                  setLoading(false);
                });
              }}
            >
              <Form.Item
                label="用户名"
                name="userName"
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9_]{3,16}$/,
                  },
                ]}
              >
                <Input placeholder="请输入" />
              </Form.Item>

              <Form.Item
                label="密码"
                name="passWord"
                rules={[{ required: true, max: 16 }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item style={{ marginLeft: 60 }} wrapperCol={{ offset: 17 }}>
                <Button loading={loading} type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
            <Divider plain={true}>
              <span className={styles.dividerSpan}>或者</span>
            </Divider>
            <Button
              className={styles.userLogin}
              onClick={() => {
                setCookie("isRoot", false);
                router.push("/dashboard");
              }}
            >
              <UserOutlined />
              &nbsp;游客登录
            </Button>
          </>
        </Carousel>
      </div>
    </div>
  );
};

// 移动端登陆
const Mobile: React.FC<{}> = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Carousel dots={false}>
      <div className={styles.mobileLogin}>
        <p className={styles.mobileTitle}>登录</p>
        <Form
          name="login"
          style={{ maxWidth: 600, marginTop: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          labelCol={{ span: 6 }}
          validateMessages={{
            required: "请输入${label}",
            pattern: {
              mismatch: "${label}只包含字母、数字和下划线,长度在3到16个字符",
            },
          }}
          onFinish={(values) => {
            setLoading(true);
            request({
              method: "POST",
              url: `${process.env.NEXT_PUBLIC_OPEN_URL}/login`,
              body: {
                ...values,
                passWord: setCustomEncryption(values.passWord) + "my",
              },
            }).then((res) => {
              if (res.status) {
                message.success(res.message);
                setCookie("isRoot", true);
                router.push("/dashboard");
              } else {
                message.error(res.message);
              }
              setLoading(false);
            });
          }}
        >
          <Form.Item
            label="用户名"
            name="userName"
            rules={[
              {
                required: true,
                pattern: /^[a-zA-Z0-9_]{3,16}$/,
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="passWord"
            rules={[{ required: true, max: 16 }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button block loading={loading} type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
        <Divider plain={true}>
          <span className={styles.dividerSpan}>或者</span>
        </Divider>
        <Button
          className={styles.userLogin}
          onClick={() => {
            setCookie("isRoot", false);
            router.push("/dashboard");
          }}
        >
          <UserOutlined />
          &nbsp;游客登录
        </Button>
      </div>
    </Carousel>
  );
};

const Login: React.FC<{}> = ({}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const agents = [
      "iphone",
      "ipad",
      "ipod",
      "android",
      "linux",
      "windows phone",
    ];

    for (let i = 0; i < agents.length; i++) {
      if (ua.indexOf(agents[i]) !== -1) {
        setIsMobile(true);
      }
    }
  }, []);

  return isMobile ? <Mobile /> : <PC />;
};

export default Login;
