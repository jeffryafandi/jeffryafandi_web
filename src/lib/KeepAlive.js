module.exports = class KeepAlive {
  constructor(client, intervalSeconds) {
    this.client = client;
    this.keepAliveCount = 0;
    this._interval = {
      seconds: intervalSeconds,
      miliseconds: intervalSeconds * 1000
    };
    this._request = require("axios");

    console.info(`[KEEP_ALIVE]: Request per ${this._interval.seconds} sekon.`);
    var count = 0;
    setInterval(() => {
      count++;
      this.keepAliveCount = count;
      this.run();
    }, this._interval.miliseconds);
  }

  async run() {
    const url = `https://raznar-helper.herokuapp.com`;
    try {
      const response = await this._request.get(url);
      if (response.status !== 200) {
        console.error("[KEEP_ALIVE]: Invalid Status Code");
      } else {
        console.log("[KEEP_ALIVE]: Successfuly request!");
      }
    } catch (e) {
      console.error(`[KEEP_ALIVE]: ${e}`);
    }
  };
};