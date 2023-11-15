import { ReactNode } from "react";
export const headerTitle = (title: string | ReactNode) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: 24,
        marginBottom: 16,
      }}
    >
      <div
        style={{ background: "#3370ff", height: 20, marginRight: 8, width: 2 }}
      ></div>
      <div
        style={{
          fontWeight: 500,
          color: "#fff",
          fontSize: "1rem",
          lineHeight: "1.5rem",
        }}
      >
        {title}
      </div>
    </div>
  );
};
