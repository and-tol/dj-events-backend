'use strict';

/**
 *  event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi }) => ({
  // Create event with linked user
  async create(ctx) {
    try {
      // ctx.body = 'ok';
      let entity;

      if (ctx.is('multipart')) {
        // Calling the default core action
        const { data, meta, files } = await super.find(ctx);
        data.user = ctx.state.user.id;

        // ! This is code not work because has new API
        // entity = await strapi.services.event.create(data, { files })
        // entity = await strapi
        //   .service('api::event.event')
        //   .create(data, { files });
        entity = await strapi.entityService.create(
          'api::event.event',
          {
            data: ctx.request.body,
          },
          { files }
        );
      } else {
        // ctx.request.body.user = ctx.state.user.id;

        ctx = { ...ctx, body: ctx.request.body };
        console.log('>>>> create >>>', ctx.request.body.data);

        entity = await strapi.entityService.create('api::event.event', {
          data: { ...ctx.request.body.data },
          populate: '*',
        });
      }
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    } catch (err) {
      ctx.body = err;
    }
  },
  // Update user event, Редактирование события пользователя
  async update(ctx) {
    console.log('update');
    try {
      // Получаем пользователя (user)
      const user = ctx.state.user;
      // Получаем id события, которое нужно редактировать
      // const { id } = ctx.params;
      let entity;

      // Получаем событие юзера
      ctx.query = {
        ...ctx.query,
        filters: { ...ctx.query.filters, user: user.id, id: ctx.params.id },
      };
      const { data, meta } = await super.find(ctx);

      if (!data) {
        return ctx.unauthorized(`You can't update this entry`);
      }

      if (ctx.is('multipart')) {
        // ! Это наверняка не правильный код
        // Calling the default core action
        const { data, meta, files } = await super.find(ctx);
        data.user = ctx.state.user;

        // entity = await strapi.services.event.create(data, { files })
        entity = await strapi
          .service('api::event.event')
          .update({ id }, data, { files });
      } else {
        ctx = { ...ctx, body: ctx.request.body };

        entity = await strapi.entityService.update('api::event.event', id, {
          data: ctx.request.body,
        });
      }
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      console.log('>>> create sanitizedEntity >>>', sanitizedEntity);

      return this.transformResponse(sanitizedEntity);
    } catch (err) {
      ctx.body = err;
    }
  },

  // Delete user event
  async delete(ctx) {
    try {
      const { id } = ctx.params;

      // Получаем события юзера, с которыми он связан
      ctx.query = {
        ...ctx.query,
        filters: { ...ctx.query.filters, user: user.id, id: ctx.params.id },
      };
      const { data, meta } = await super.find(ctx);

      if (!data) {
        // !
        return ctx.unauthorized(`You can't delete this entry`);
        // Работатет так же
        // return ctx.response.unauthorized(`You can't update this entry`);
      }

      const entry = await strapi.entityService.delete('api::event.event', id);
      const sanitizedEntity = await this.sanitizeOutput(entry, ctx);

      return this.transformResponse(sanitizedEntity);
    } catch (err) {
      ctx.body = err;
    }
  },

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

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    if (!data) {
      return ctx.notFound();
    }

    return { data, meta };
  },
}));
