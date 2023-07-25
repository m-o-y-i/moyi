import React, { useEffect, useState } from "react";
import LayoutComponents from "@/components/layout";
import { List, Typography } from "antd";
import { useRouter } from "next/router";
import request from "@/lib/request";
const { Title, Paragraph, Text, Link } = Typography;

const DashboardDetail: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [dataSource, setDataSource] = useState<any>({});

  useEffect(() => {
    if (router.query.id) {
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
      });
    }
  }, [router.query.id]);
  return (
    <Typography>
      <Title>{dataSource.title}</Title>
      <Paragraph>{dataSource.content}</Paragraph>
    </Typography>
  );
};

export default DashboardDetail;
