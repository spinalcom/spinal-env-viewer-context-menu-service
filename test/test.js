const { spinalContextMenuService, SpinalContextApp } = require("..");

// test instance creatation + module exports
console.log(spinalContextMenuService);
console.log(SpinalContextApp);

// create an test class that extends of SpinalContextApp
class SpinalContextAppTest extends SpinalContextApp {
  constructor() {
    super("testlabel", "test description", {
      icon: "add",
      icon_type: "in",
      backgroundColor: "000000",
      fontColor: "FFFFFF"
    });
  }

  isShown(option) {
    if (option.testsFail === true) return Promise.resolve(-1);
    return Promise.resolve(true);
  }

  action() {
    console.log("action clicked");
  }
}

spinalContextMenuService.registerApp("myHookName", new SpinalContextAppTest());

const testAppList1 = spinalContextMenuService.getApps("myHookName", {
  testsFail: false
});

const testAppList2 = spinalContextMenuService.getApps("myHookName", {
  testsFail: true
});

const testAppList3 = spinalContextMenuService.getApps("UndefinedHookName", {
  testsFail: false
});

testAppList1.then(console.log.bind(null, "test1 :"));
testAppList2.then(console.log.bind(null, "test2 :"));
testAppList3.then(console.log.bind(null, "test3 :"));
