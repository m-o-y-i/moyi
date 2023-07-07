import React, { useEffect, useState } from "react";
import Script from "next/script";
import { Button, Carousel, Divider, Form, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import request from "../../lib/request";
import { getBcryptPassWord, setCustomEncryption } from "../../lib/tools";
import { useRouter } from "next/router";

const styles = require("./index.module.css");
const Login: React.FC<{}> = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.bgImg}>
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
                  url: "/login",
                  body: {
                    ...values,
                    passWord: setCustomEncryption(values.passWord) + "my",
                  },
                }).then((res) => {
                  if (res.status) {
                    message.success(res.message);
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
            <Button className={styles.userLogin} onClick={() => {}}>
              <UserOutlined />
              &nbsp;游客登录
            </Button>
          </>
        </Carousel>
      </div>
    </div>
  );
};

export default Login;
