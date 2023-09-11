import { serverConfig } from "./imports.js";

const runServer = (app) => {
  app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(
      `server running on http://${serverConfig.host}:${serverConfig.port}`
    );
  });
};

export default runServer;
