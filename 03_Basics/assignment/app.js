import http from "http";

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    // res.setHeader("Content-Type", "text/html");
    // res.write("<html>");
    // res.write("<head><title>Greetings Page</title></head>");
    // res.write(
    //   "<body><h2>Hey, Dear user welcome to learning Node js</h2></body>"
    // );
    // res.write("</>");
    // return res.end();

    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Greetings Page</title></head>");
    res.write(
      "<body><form action='/create-user' method='POST'><input type='text' name='username' /><button type='submit'>send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Registered Users</title></head>");
    res.write(
      "<body><ul><li>itachi uchiha</li><li>saske uchiha</li><li>shisui uchiha</li><li>naruto uzumaki</li><li>nagato uzumaki</li></ul></body>"
    ); 
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });

    return req.on("end", () => {
      const username = Buffer.concat(data)
        .toString() 
        .split("=")[1]
        .replace("+", " ");
      console.log(`username : ${username}`);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }
});

server.listen(3000);
