/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

/**
 *  Containter like service to register and get applications relative to a hookname
 *
 * @property {object} apps key = hookname, value array of apps
 * @class SpinalContextMenuService
 */
class SpinalContextMenuService {
  /**
   *Creates an instance of SpinalContextMenuService.
   * @memberof SpinalContextMenuService
   */
  constructor() {
    this.apps = {};
  }

  /**
   * method to register the Application to a hook
   *
   * @param {string} hookname the place where is application button is located
   * @param {SpinalContextApp} spinalContextApp the application
   * @memberof SpinalContextMenuService
   */
  registerApp(hookname, spinalContextApp) {
    // get the array of apps of the hook
    let appsInHooks = this.apps[hookname];

    // create the array if not exist
    if (!(appsInHooks instanceof Array)) {
      appsInHooks = this.apps[hookname] = [];
    }

    // push the app if not exist
    if (appsInHooks.indexOf(spinalContextApp) === -1) {
      appsInHooks.push(spinalContextApp);
    }
  }

  /**
   * method to get the applications registered to a hookname
   *
   * @param {String} hookname
   * @param {object} option
   * @memberof SpinalContextMenuService
   * @returns {Promise} resolve : [spinalContextApp, ...]; reject: Error
   */
  getApps(hookname, option) {
    // get the array of apps of the hook
    let appsInHooks = this.apps[hookname];

    // create the array if not exist
    if (!(appsInHooks instanceof Array)) {
      return Promise.resolve([]);
    }

    let promises = appsInHooks.map(e => {
      try {
        let prom = e.isShown(option)
          .then((res) => {
            return res;
          });
        return prom;

      } catch (error) {
        console.error(error);
        return -1;
      }
    });
    return Promise.all(promises)
      .then(
        results => {
          const resultApps = [];
          for (var i = 0; i < results.length; i++) {
            if (results[i] !== -1) resultApps.push(appsInHooks[i]);
          }
          return resultApps;
        },
        () => []
      )
      .catch(console.error);
  }
}

module.exports = SpinalContextMenuService;
