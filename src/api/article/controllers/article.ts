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
        const publishDate = new Date(article.data[0].attributes.publishedAt);
        const fewDaysAfter = new Date(publishDate.toJSON());
        fewDaysAfter.setDate(fewDaysAfter.getDate() + 10);
        const fewDaysBefore = new Date(publishDate.toJSON());
        fewDaysBefore.setDate(fewDaysBefore.getDate() - 10);

        const { results: nextArticle }: any = await strapi
          .service("api::article.article")
          .find({
            fields: ["slug", "publishedAt"],
            filters: {
              $and: [
                {
                  publishedAt: {
                    $gt: article.data[0].attributes.publishedAt,
                  },
                },
                {
                  publishedAt: {
                    $lt: fewDaysAfter,
                  },
                },
              ],
            },
            order: {
              publishedAt: "asc",
            },
          });
        const { results: previousArticle }: any = await strapi
          .service("api::article.article")
          .find({
            fields: ["slug", "publishedAt"],
            filters: {
              $and: [
                {
                  publishedAt: {
                    $lt: article.data[0].attributes.publishedAt,
                  },
                },
                {
                  publishedAt: {
                    $gt: fewDaysBefore,
                  },
                },
              ],
            },
            order: {
              publishedAt: "asc",
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
