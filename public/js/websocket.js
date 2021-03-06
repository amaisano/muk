if (window.location.hostname.indexOf("lndo") > -1) {
  var HOST = 'ws://mukchests.lndo.site';
}
else {
  var HOST = location.origin.replace(/^http/, 'ws');
}

let ws = new WebSocket(HOST);
let el;

ws.onmessage = (event) => {
  console.log(event.data);

  // Convert string JSON into JS Object
  payload = JSON.parse(event.data)

    switch (payload.action) {
      case "add":
        addChests(
          payload.number ?? 1,
          payload.timer ?? 0,
          payload.random ?? false
      );
      break;

    case "remove":
      removeChests(payload.number ?? 1);
      break;

    case "clear":
      clearAllChests();
      break;

    default:
      break;
  }
};
