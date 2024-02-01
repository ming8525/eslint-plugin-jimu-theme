/**
 * @fileoverview This plug-in is used to assist in migrating jimu-theme variables to the new version.
 * @author ming8525
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");



