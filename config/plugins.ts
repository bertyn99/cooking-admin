module.exports = ({ env }) => ({
  upload: {
    config: {
      breakpoints: null, // Désactive les formats responsives
    },
  },
  publisher: {
    enabled: true,
    config: {
      hooks: {
        beforePublish: async ({ strapi, uid, entity }) => {
          console.log("beforePublish");
        },
        afterPublish: async ({ strapi, uid, entity }) => {
          console.log("afterPublish");
        },
        beforeUnpublish: async ({ strapi, uid, entity }) => {
          console.log("beforeUnpublish");
        },
        afterUnpublish: async ({ strapi, uid, entity }) => {
          console.log("afterUnpublish");
        },
      },
    },
  },
  "local-image-sharp": {
    config: {
      maxAge: 31536000, // which corresponds to 1 year: 60 seconds × 60 minutes × 24 hours × 365 days = 31536000 seconds.
      cacheDir: ".image-cache",
    },
  },
  // ..
  seo: {
    enabled: true,
  },
});
