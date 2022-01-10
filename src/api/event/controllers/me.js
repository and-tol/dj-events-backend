'use strict';
// const { sanitizeEntity } = require('strapi-utils');

/**
 *  custom controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
// const modelUid = "api::event.event"


module.exports = createCoreController('api::event.event', ({ strapi }) => ({
  async exampleAction(ctx) {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },

  // async me(ctx) {
  //   const user = ctx.state.user;

  //   console.log('ctx >>>>', ctx);
  //   // console.log('ctx.request.body >>', ctx.request.body);

  //   if (!user) {
  //     return ctx.badRequest(null, [
  //       { messages: [{ id: 'No authorization header was found' }] },
  //     ]);
  //   }
  //   console.log('>>> strapi >>>', strapi);
  //   const { data, meta } = await super.find(ctx);
  //   console.log('>>> data >>>', {data})
  //   const data2 = await strapi.store;
  //   console.log('>>> data 2 >>>', {data2})

  //   // ! find(): undefined
  //   const data1 = await strapi.services.event.find({ user: user.id });

  //   if (!data) {
  //     return ctx.notFound();
  //   }
  //   return { data };
  // },

  // Get logged in users
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

    // Found all events
    // const entity = await strapi
    //   .service('api::event.event')
    //   .find({ user: user.id });
    // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    // return this.transformResponse(sanitizedEntity);

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    if (!data) {
      return ctx.notFound();
    }

    return { data, meta };
  },
}));
