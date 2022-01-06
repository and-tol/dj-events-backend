'use strict';

/**
 *  event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi }) => ({
  async exampleAction(ctx) {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },

  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: 'No authorization header was found' }] },
      ]);
    }

    ctx.query = {
      ...ctx.query,
      filters: { ...ctx.query.filters, user: user.id },
    };

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    if (!data) {
      return ctx.notFound()
    }

    return { data, meta };
  },
}));
