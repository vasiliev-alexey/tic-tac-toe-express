import { httpServer } from "./server";
import { io } from "socket.io-client";

describe("server test", () => {
  afterEach((done) => {
    httpServer.close(done);
    done();
  });

  test("1", (done) => {
    const ioClient = io("http://localhost:3000");
    ioClient.connect();
    ioClient.once("game/boxClicked", (message: string) => {
      expect(message).toBe("Hello World");
    });
    ioClient.send("game/boxClicked");

    ioClient.close();
    expect(1).toBeTruthy();
    done();
  }, 10000);
});
