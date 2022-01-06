'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/events/me',
      handler: 'me.me',
      // handler: 'event.me',
      config: {
        policies: [],
      },
    },
  ],
};
