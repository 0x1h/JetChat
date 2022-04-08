module.exports = {
  apps : [{
    name   : "limit worker",
    script : "server.js",
    args   : "limit"
  },{
    name   : "rotate worker",
    script : "server.js",
    args   : "rotate"
  }]
}