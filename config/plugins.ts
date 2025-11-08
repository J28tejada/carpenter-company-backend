export default ({ env }) => {
  const baseUrl = env('STRAPI_PLUGIN_UPLOAD_PROVIDER_OPTIONS_BASE_URL');
  const forcePathStyle = env.bool(
    'STRAPI_PLUGIN_UPLOAD_PROVIDER_OPTIONS_FORCE_PATH_STYLE',
    true,
  );
  const acl = env('STRAPI_PLUGIN_UPLOAD_PROVIDER_OPTIONS_ACL', 'public-read');

  return {
    upload: {
      config: {
        provider: env('STRAPI_PLUGIN_UPLOAD_PROVIDER', 'local'),
        providerOptions: {
          accessKeyId: env('STRAPI_PLUGIN_UPLOAD_PROVIDER_OPTIONS_ACCESS_KEY_ID'),
          secretAccessKey: env(
            'STRAPI_PLUGIN_UPLOAD_PROVIDER_OPTIONS_SECRET_ACCESS_KEY',
          ),
          region: env('STRAPI_PLUGIN_UPLOAD_PROVIDER_OPTIONS_REGION'),
          endpoint: env('STRAPI_PLUGIN_UPLOAD_PROVIDER_OPTIONS_ENDPOINT'),
          baseUrl,
          forcePathStyle,
          params: {
            Bucket: env('STRAPI_PLUGIN_UPLOAD_PROVIDER_OPTIONS_BUCKET'),
          },
        },
        actionOptions: {
          upload: {
            ACL: acl,
          },
          uploadStream: {
            ACL: acl,
          },
          delete: {},
        },
      },
    },
  };
};
