# spinal-env-viewer-context-menu-service

spinal-env-viewer-context-menu-service is a service to add icon button to a namedhook so the application UI can later retrive them via the hookname.

## Installation

```sh
npm i --save https://github.com/spinalcom/spinal-env-viewer-context-menu-service
```

## Usage

Get the service instance and the SpinalContextApp definition.

```js
const {
  spinalContextMenuService,
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");
```

Extends the class `SpinalContextApp` and define custom `isShown` and `action` methods.

```js
// example
class SpinalContextAppTest extends SpinalContextApp {
  constructor() {
    super("testlabel", "test description", {
      icon: "add",
      icon_type: "in",
      backgroundColor: "#000000",
      fontColor: "#FFFFFF"
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
```

Register the app to a `Hookname`

```js
spinalContextMenuService.registerApp("myHookName", new SpinalContextAppTest());
```

Afterwards the apps get the list with the `getApps` methods

```js
spinalContextMenuService
  .getApps("myHookName", {
    testsFail: false
  })
  .then(console.log.bind(null, "test1 :"));
// test1 : [ SpinalContextAppTest {
//     label: 'testlabel',
//     description: 'test description',
//     buttonCfg:
//      { icon: 'add',
//        icon_type: 'in',
//        backgroundColor: '#000000',
//        fontColor: '#FFFFFF' },
//     badgeCfg:
//      { label: '', backgroundColor: '#FF0000', fontColor: '#FFFFFF' } } ]
```

---

## API Documentations

{{>main}}

---
