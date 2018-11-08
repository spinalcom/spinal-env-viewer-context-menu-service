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

## Classes

<dl>
<dt><a href="#SpinalContextMenuService">SpinalContextMenuService</a></dt>
<dd></dd>
<dt><a href="#SpinalContextApp">SpinalContextApp</a></dt>
<dd></dd>
</dl>

<a name="SpinalContextMenuService"></a>

## SpinalContextMenuService
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| apps | <code>object</code> | key = hookname, value array of apps |


* [SpinalContextMenuService](#SpinalContextMenuService)
    * [new SpinalContextMenuService()](#new_SpinalContextMenuService_new)
    * _instance_
        * [.registerApp(hookname, spinalContextApp)](#SpinalContextMenuService+registerApp)
        * [.getApps(hookname, option)](#SpinalContextMenuService+getApps) ⇒ <code>Promise</code>
    * _static_
        * [.SpinalContextMenuService](#SpinalContextMenuService.SpinalContextMenuService)
            * [new SpinalContextMenuService()](#new_SpinalContextMenuService.SpinalContextMenuService_new)

<a name="new_SpinalContextMenuService_new"></a>

### new SpinalContextMenuService()
Containter like service to register and get applications relative to a hookname

<a name="SpinalContextMenuService+registerApp"></a>

### spinalContextMenuService.registerApp(hookname, spinalContextApp)
method to register the Application to a hook

**Kind**: instance method of [<code>SpinalContextMenuService</code>](#SpinalContextMenuService)  

| Param | Type | Description |
| --- | --- | --- |
| hookname | <code>string</code> | the place where is application button is located |
| spinalContextApp | [<code>SpinalContextApp</code>](#SpinalContextApp) | the application |

<a name="SpinalContextMenuService+getApps"></a>

### spinalContextMenuService.getApps(hookname, option) ⇒ <code>Promise</code>
method to get the applications registered to a hookname

**Kind**: instance method of [<code>SpinalContextMenuService</code>](#SpinalContextMenuService)  
**Returns**: <code>Promise</code> - resolve : [spinalContextApp, ...]; reject: Error  

| Param | Type |
| --- | --- |
| hookname | <code>String</code> | 
| option | <code>object</code> | 

<a name="SpinalContextMenuService.SpinalContextMenuService"></a>

### SpinalContextMenuService.SpinalContextMenuService
**Kind**: static class of [<code>SpinalContextMenuService</code>](#SpinalContextMenuService)  
<a name="new_SpinalContextMenuService.SpinalContextMenuService_new"></a>

#### new SpinalContextMenuService()
Creates an instance of SpinalContextMenuService.

<a name="SpinalContextApp"></a>

## SpinalContextApp
**Kind**: global class  
**See**: https://material.io/tools/icons/?style=baseline for material icons  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>string</code> | <code>&quot;notset&quot;</code> | short name to be shown in the application |
| description | <code>string</code> |  | description of what the Application button do |
| buttonCfg | <code>object</code> |  | Object configuration of the Application button |
| buttonCfg.icon | <code>string</code> | <code>&quot;tab&quot;</code> | can be a font-awsome or material icon string |
| buttonCfg.icon_type | <code>string</code> | <code>&quot;in&quot;</code> | Where to place the icon in the `md-icon`. Should be one of theses `class`, `in`, `src` |
| buttonCfg.backgroundColor | <code>string</code> | <code>&quot;#0000FF&quot;</code> | backgroud color of the button |
| buttonCfg.fontColor | <code>string</code> | <code>&quot;#FFFFFF&quot;</code> | font color of the button |
| [badgeCfg] | <code>objet</code> |  | Object configuration of the Application button badge |
| badgeCfg.label | <code>string</code> |  | string shown in a badge; if empty it's not shown |
| badgeCfg.backgroundColor | <code>string</code> | <code>&quot;#FF0000&quot;</code> | backgroud color of the badge |
| badgeCfg.fontColor | <code>string</code> | <code>&quot;#FFFFFF&quot;</code> | font color of the badge |


* [SpinalContextApp](#SpinalContextApp)
    * [new SpinalContextApp()](#new_SpinalContextApp_new)
    * _instance_
        * [.isShown(option)](#SpinalContextApp+isShown) ⇒ <code>Promise</code>
        * [.action(option)](#SpinalContextApp+action)
    * _static_
        * [.SpinalContextApp](#SpinalContextApp.SpinalContextApp)
            * [new SpinalContextApp(label, description, buttonCfg, [badgeCfg])](#new_SpinalContextApp.SpinalContextApp_new)

<a name="new_SpinalContextApp_new"></a>

### new SpinalContextApp()
Interface like class to define a Contextual Application button

<a name="SpinalContextApp+isShown"></a>

### spinalContextApp.isShown(option) ⇒ <code>Promise</code>
Method called by `SpinalContextMenuService.getApps`
to filter the Application button to show in the context hook

**Kind**: instance method of [<code>SpinalContextApp</code>](#SpinalContextApp)  
**Returns**: <code>Promise</code> - Resolve: not shown if === -1;  

| Param | Type |
| --- | --- |
| option | <code>object</code> | 

<a name="SpinalContextApp+action"></a>

### spinalContextApp.action(option)
Method to call on click of the application button

**Kind**: instance method of [<code>SpinalContextApp</code>](#SpinalContextApp)  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>object</code> | {} |

<a name="SpinalContextApp.SpinalContextApp"></a>

### SpinalContextApp.SpinalContextApp
**Kind**: static class of [<code>SpinalContextApp</code>](#SpinalContextApp)  
<a name="new_SpinalContextApp.SpinalContextApp_new"></a>

#### new SpinalContextApp(label, description, buttonCfg, [badgeCfg])
Creates an instance of SpinalContextApp.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>string</code> | <code>&quot;notset&quot;</code> | short name to be shown in the application |
| description | <code>string</code> |  | description of what the Application button do |
| buttonCfg | <code>object</code> |  | Object configuration of the Application button |
| buttonCfg.icon | <code>string</code> | <code>&quot;tab&quot;</code> | can be a font-awsome or material icon string |
| buttonCfg.icon_type | <code>string</code> | <code>&quot;in&quot;</code> | Where to place the icon in the `md-icon`. Should be one of theses `class`, `in`, `src` |
| buttonCfg.backgroundColor | <code>string</code> | <code>&quot;#0000FF&quot;</code> | backgroud color of the button |
| buttonCfg.fontColor | <code>string</code> | <code>&quot;#FFFFFF&quot;</code> | font color of the button |
| [badgeCfg] | <code>objet</code> |  | Object configuration of the Application button badge |
| badgeCfg.label | <code>string</code> |  | string shown in a badge; if empty it's not shown |
| badgeCfg.backgroundColor | <code>string</code> | <code>&quot;#FF0000&quot;</code> | backgroud color of the badge |
| badgeCfg.fontColor | <code>string</code> | <code>&quot;#FFFFFF&quot;</code> | font color of the badge |


---
