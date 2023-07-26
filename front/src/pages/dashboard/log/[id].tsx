import React, { useEffect, useState } from "react";
import LayoutComponents from "@/components/layout";
import { Empty, Spin, Typography } from "antd";
import { useRouter } from "next/router";
import request from "@/lib/request";
const { Title, Paragraph } = Typography;

const DashboardDetail: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [spin, setSpin] = useState(false);
  const [dataSource, setDataSource] = useState<any>({});

  useEffect(() => {
    if (router.query.id) {
      setSpin(true);
      request({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_OPEN_URL}/article_detail`,
        body: {
          id: router.query.id,
        },
      }).then((res) => {
        if (res.status) {
          setDataSource(res.data);
        }
        setSpin(false);
      });
    }
  }, [router.query.id]);

  return (
    <LayoutComponents>
      <Spin spinning={spin}>
        {JSON.stringify(dataSource) === "{}" ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Typography>
            <Title style={{ textAlign: "center" }}>{dataSource?.title}</Title>
            <Paragraph>
              {dataSource?.content?.split("\n").map((item: any) => (
                <div>{item}</div>
              ))}
            </Paragraph>
          </Typography>
        )}
      </Spin>
    </LayoutComponents>
  );
};

export default DashboardDetail;
