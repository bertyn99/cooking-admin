/**
 * article controller
 */

import { factories } from "@strapi/strapi";
import { Entity } from "@strapi/strapi/lib/core-api/service";

export default factories.createCoreController(
  "api::article.article",
  ({ strapi }) => ({
    async find(ctx) {
      // Calling the default core action
      const article = await super.find(ctx);
      if (ctx.query.populate.includes("surround")) {
        const { results: nextArticle }: any = await strapi
          .service("api::article.article")
          .find({
            where: {
              publishedAt: {
                gt: article.data[0].attributes.publishedAt,
              },
            },
            order: {
              publishedAt: "asc",
            },
            pagination: {
              start: 1,
              limit: 1,
            },
          });
        const { results: previousArticle }: any = await strapi
          .service("api::article.article")
          .find({
            where: {
              publishedAt: {
                lt: article.data[0].attributes.publishedAt,
              },
            },
            order: {
              publishedAt: "desc",
            },
            pagination: {
              start: 1,
              limit: 1,
            },
          });

        const sanitezedNextArticle = await this.sanitizeOutput(
          nextArticle[0],
          ctx
        );
        const sanitezedPreviousArticle = await this.sanitizeOutput(
          previousArticle[0],
          ctx
        );

        article.data[0] = {
          ...article.data[0],
          ...{ prev: sanitezedNextArticle, next: sanitezedPreviousArticle },
        };
      }

      return article;
    },
  })
);
