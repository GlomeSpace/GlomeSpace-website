'use strict';

/**
 * letter service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::letter.letter');
