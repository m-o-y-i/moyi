import React, { useEffect, useState } from "react";
import LayoutComponents from "@/components/layout";
import { List } from "antd";
import { useRouter } from "next/router";
import request from "@/lib/request";

const Log: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
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
  }, []);

  return (
    <LayoutComponents>
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
    </LayoutComponents>
  );
};

export default Log;
