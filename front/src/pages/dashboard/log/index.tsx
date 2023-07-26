import React, { useEffect, useState } from "react";
import LayoutComponents from "@/components/layout";
import { Button, Form, Input, List, Modal } from "antd";
import { useRouter } from "next/router";
import request from "@/lib/request";
import { PlusOutlined } from "@ant-design/icons";
import { getCookie } from "cookies-next";

const Log: React.FC<{}> = () => {
  const router = useRouter();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [isRoot, setIsRoot] = useState<any>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    request({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_OPEN_URL}/article_list`,
    }).then((res) => {
      if (res.status) {
        setDataSource(res.data);
      }
      setLoading(false);
    });
  }, [reload]);

  useEffect(() => {
    setIsRoot(getCookie("isRoot"));
  }, []);

  return (
    <LayoutComponents>
      {isRoot && (
        <div
          suppressHydrationWarning
          style={{ display: "flex", justifyContent: "end" }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            添加新日志
          </Button>
        </div>
      )}
      <List
        loading={loading}
        dataSource={dataSource}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              title={
                <a
                  href="#"
                  onClick={() => router.push(`/dashboard/log/${item._id}`)}
                >
                  {item.title}
                </a>
              }
              description={`${item.describe}...`}
            />
          </List.Item>
        )}
      />
      <Modal
        title="添加新日志"
        open={open}
        width={600}
        destroyOnClose
        onCancel={() => setOpen(false)}
        onOk={() => {
          form.validateFields().then((values) => {
            request({
              method: "POST",
              url: `${process.env.NEXT_PUBLIC_OPEN_URL}/write_article_detail`,
              body: values,
            }).then((res) => {
              if (res.status) {
                setReload(!reload);
              }
            });
          });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="标题" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="describe">
            <Input />
          </Form.Item>
          <Form.Item label="内容" name="content">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </LayoutComponents>
  );
};

export default Log;
