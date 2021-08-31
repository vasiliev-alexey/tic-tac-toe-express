import * as http from "http";
import ioBack, { Server } from "socket.io";
import { io as socketSrv } from "./server";
import { createHttpTerminator } from "http-terminator";

import { httpServer } from "./server";
import { io } from "socket.io-client";

describe("server test", () => {
  // let socket;
  // let httpServer: http.Server;
  // let httpServerAddr;
  // let ioServer: Server;
  const httpTerminator = createHttpTerminator({ server: httpServer });

  beforeAll(async () => {
    // httpServer = http.createServer();
    // httpServerAddr = httpServer.listen().address();
    // ioServer = new Server();
  });

  afterEach((done) => {
    // shutDown(done);
    httpServer.close(done);
    // httpTerminator.terminate();
    done();
  });

  test("1", (done) => {
    // const d = ioserv;

    // const socket = io("http://localhost:3000");
    const ioClient = io("http://localhost:3000");
    ioClient.connect();
    ioClient.once("game/boxClicked", (message: string) => {
      expect(message).toBe("Hello World");
    });
    ioClient.send("game/boxClicked");

    ioClient.close();
    expect(1).toBeTruthy();
    done();
    // await shutDown();
    // d.close();
  }, 10000);
});
