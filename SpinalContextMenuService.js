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

import * as Q from 'q';
var debounce = require('lodash.debounce');

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
    this.promiseByAppProfileId = {};
    this.appRdy = Q.defer();
    this.debouncedRdy = debounce(
      () => {
        this.appRdy.resolve();
        this.debouncedRdy = () => {};
      },
      1000,
      { leading: false, trailing: true }
    );
  }

  // waitRdy() {
  //   this.appRdy.promise;
  // }

  /**
   * Return true if user has access to this appProfile
   * @param appProfileId
   * @return {PromiseLike<boolean > | Promise<boolean>}
   */
  async hasUserRight(appProfileId) {
    this.debouncedRdy();
    await window.spinal.spinalSystem.init();
    const path =
      '/etc/UserProfileDir/' + window.spinal.spinalSystem.getUser().username;
    const userProfile = await window.spinal.spinalSystem.load(path);
    let res = false;
    if (userProfile) {
      for (let i = 0; i < userProfile.appProfiles.length && !res; i++) {
        res = ((1 << userProfile.appProfiles[i]) & appProfileId) !== 0;
      }
    }
    return res;
  }

  /**
   * method to register the Application to a hook
   *
   * @param {string} hookname the place where is application button is located
   * @param {SpinalContextApp} spinalContextApp the application
   * @param {number} appProfileId id of the group that can use the application
   * button
   * @memberof SpinalContextMenuService
   */
  registerApp(hookname, spinalContextApp, appProfileId) {
    this.debouncedRdy();
    if (typeof appProfileId === 'undefined') {
      console.warn(
        'Deprecated: The usage of this function without the third' +
          ' parameter appProfileId is deprecated your button is lock for admin' +
          ' only until you set the third parameter'
      );
      appProfileId = 1;
    }
    // get the array of apps of the hook
    let appsInHooks = this.apps[hookname];

    // create the array if not exist
    if (!(appsInHooks instanceof Array)) {
      appsInHooks = this.apps[hookname] = [];
    }

    if (!this.promiseByAppProfileId.hasOwnProperty(appProfileId)) {
      this.promiseByAppProfileId[appProfileId] =
        this.hasUserRight(appProfileId);
    }

    this.promiseByAppProfileId[appProfileId].then((hasAccess) => {
      // push the app if not exist ans user has access to the button
      if (hasAccess && appsInHooks.indexOf(spinalContextApp) === -1) {
        appsInHooks.push(spinalContextApp);
      }
    });
  }

  /**
   * method to get the applications registered to a hookname
   *
   * @param {String} hookname
   * @param {object} option
   * @memberof SpinalContextMenuService
   * @returns {Promise} resolve : [spinalContextApp, ...]; reject: Error
   */
  async getApps(hookname, option) {
    await this.appRdy.promise;
    // get the array of apps of the hook
    let appsInHooks = this.apps[hookname];

    // create the array if not exist
    if (!(appsInHooks instanceof Array)) {
      return Promise.resolve([]);
    }
    let promises = appsInHooks.map(async function (e, idx) {
      try {
        const res = await e.isShown(option);
        return res === -1 ? -1 : e;
      } catch (error) {
        console.error(error);
        return -1;
      }
    });
    try {
      const appRes = await Promise.all(promises);
      return appRes.filter((itm) => itm !== -1);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports = SpinalContextMenuService;
