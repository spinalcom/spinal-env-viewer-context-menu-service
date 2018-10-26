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
 *  Interface like class to define a Contextual Application button
 *
 * @class SpinalContextApp
 */
class SpinalContextApp {
  /**
   * Creates an instance of SpinalContextApp.
   * @param {string} icon can be a font-awsome or material icon
   * @param {string} label short name to be shown in the application
   * @param {string} description description of what the Application button do
   * @memberof SpinalContextApp
   */
  constructor(icon, label, description) {
    this.icon = icon;
    this.label = label;
    this.description = description;
    this.badge = "";
    this.badgeColor = "FF0000";
  }

  /**
   * Method called by `SpinalContextMenuService.getApps`
   * to filter the Application button to show in the context hook
   *
   * @param {object} option
   * @memberof SpinalContextApp
   * @returns {Promise} Resolve: not shown if === -1;
   */
  isShown(option) {}

  /**
   * Method to call on click of the application button
   *
   * @param {object} option {}
   * @memberof SpinalContextApp
   */
  action(option) {}
}

module.exports = SpinalContextApp;
