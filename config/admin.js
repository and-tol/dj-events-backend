module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6345391eea45fe4fddd81570096dc562'),
  },
});
