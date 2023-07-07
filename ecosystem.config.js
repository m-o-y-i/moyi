module.exports = {
  apps: [
    {
      name: "front",
      script: "npm",
      args: "run start",
      cwd: "/front", // 前端文件所在的目录
      watch: true,
    },
    {
      name: "back",
      script: "npm",
      args: "run start",
      cwd: "/back", // 后端文件所在的目录
      watch: true,
    },
  ],
};
