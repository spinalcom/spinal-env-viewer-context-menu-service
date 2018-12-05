const {
  spinalContextMenuService,
  SpinalContextApp
} = require("..");

// test instance creatation + module exports

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
    return Promise.resolve(true);
  }

  action() {
    console.log("action clicked");
  }
}

class SpinalContextAppTest2 extends SpinalContextApp {
  constructor() {
    super("testlabel", "test description", {
      icon: "add",
      icon_type: "in",
      backgroundColor: "000000",
      fontColor: "FFFFFF"
    });
  }

  isShown(option) {
    console.log("option.fail ? => ", option.testsFail);

    if (option.testsFail === true) throw new Error("coucou");
    return Promise.resolve(1);
  }

  action() {
    console.log("action clicked");
  }
}


spinalContextMenuService.registerApp("myHookName", new SpinalContextAppTest());
spinalContextMenuService.registerApp("myHookName", new SpinalContextAppTest2());

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
var i = 0;
setInterval(() => {
  i++;
  const testrandom = spinalContextMenuService.getApps("myHookName", {
    testsFail: (i % 2 === 0) ? true : false
  });
  testrandom.then(console.log.bind(null, "testrandom :"));
}, 1000);
