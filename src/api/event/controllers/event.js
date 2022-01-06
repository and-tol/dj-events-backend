'use strict';

/**
 *  event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::event.event');
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
    console.log('>> request received >>');
    console.log('ctx user >', user);
    console.log('ctx >>>>', ctx);
    console.log('ctx.request.body >>', ctx.request.body);

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: 'No authorization header was found' }] },
      ]);
    }

    const data = await strapi.services.event.find({ user: user.id });

    if (!data) {
      return ctx.notFound();
    }

    // return sanitizeEntity(data, { model: strapi.models.event });
    return { data };
  },
}));
