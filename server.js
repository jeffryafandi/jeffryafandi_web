const ServerListener = require("./serverListen"),
      server = new ServerListener(process.env.PORT || 3000, resolve(__dirname, "src"));
      
      
server.run()