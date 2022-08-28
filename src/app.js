const os = require("os");
const path = require("path");
const { default: SysTray } = require("systray2");
const startServer = require("./server");

const itemStatus = {
  title: "Starting...",
  tooltip: "bb",
  checked: false,
  enabled: true,
};

const itemExit = {
  title: "Exit",
  tooltip: "bb",
  checked: false,
  enabled: true,
  click: () => {
    systray.kill(true);
  },
};

const iconPath = path.resolve(
  __dirname,
  "..",
  "assets",
  os.platform() ? "icon.ico" : "icon.png"
);

const systray = new SysTray({
  menu: {
    icon: iconPath,
    isTemplateIcon: os.platform() === "darwin",
    title: "Muk Tools",
    tooltip: "Muk Tools",
    items: [
      itemStatus,
      SysTray.separator,
      // item2,
      itemExit,
    ],
  },
  debug: false,
  copyDir: process.argv[0].endsWith(".exe"),
});

systray.onClick((action) => {
  if (!!action.item.click) {
    action.item.click();
  }
});

(async () => {
  const [_, app] = await Promise.all([systray.ready(), startServer()]);
  itemStatus.title = `http://localhost:${app.port}`;
  systray.sendAction({
    type: "update-item",
    item: itemStatus,
  });
})().catch((e) => {
  console.log("[error]", e.message);
});
