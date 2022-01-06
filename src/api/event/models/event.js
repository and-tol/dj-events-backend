const slugify = require('slugify');

// module.exports = {
//   /**
//    * Triggered before user creation.
//    */
//   lifecycles: {
//     async beforeCreate(data) {
//       if (data.name) {
//         data.slug = slugify(data.name, { lower: true });
//       }
//     },
//     async beforeUpdate(params, data) {
//       if (data.name) {
//         data.slug = slugify(data.name, { lower: true });
//       }
//     },
//   },
// };


// module.exports = {
//   beforeSave: async model => {
//     if (model.name) {
//       model.slug = slugify(model.name);
//     }
//   },
//   beforeUpdate: async model => {
//     if (model.getUpdate() && model.getUpdate().name) {
//       model.update({
//         slug: slugify(model.getUpdate().name),
//       });
//     }
//   },
// };

// module.exports = {
//   beforeSave: async (model, attrs, options) => {
//     if (options.method === 'insert' && attrs.name) {
//       model.set('slug', slugify(attrs.name));
//     } else if (options.method === 'update' && attrs.name) {
//       attrs.slug = slugify(attrs.name);
//     }
//   },
// };
