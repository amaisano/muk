if (window.location.hostname.indexOf("lndo") > -1) {
  var HOST = 'ws://muk_ws.lndo.site';
}
else {
  var HOST = location.origin.replace(/^http/, 'ws');
}

let ws = new WebSocket(HOST);
let el;

ws.onmessage = (event) => {
  el = document.getElementById('server-time');
  el.innerHTML = 'Server time: ' + event.data;
};