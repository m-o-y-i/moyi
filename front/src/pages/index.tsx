import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

const HomePage = () => {
  const isRoot = getCookie("isRoot");
  const router = useRouter();

  useEffect(() => {
    if (!isRoot) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  return null;
};

export default HomePage;
