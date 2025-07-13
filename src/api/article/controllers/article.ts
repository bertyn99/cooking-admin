/**
 * article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::article.article",
  ({ strapi }) => ({
    async find(ctx) {

      let surround = false;
      const populateArray = ctx.query.populate as string[];

      // If the query does not contain the surround parameter, we need to remove it
      if (ctx.query.populate && populateArray.includes("surround")) {
        surround = true;
        // Remove the surround parameter from the query populate
        //remove a elemnt in the array
        const populateArray = ctx.query.populate as string[];
        ctx.query.populate = populateArray.filter(
          (item: string) => item !== "surround"
        );


      }

      // Calling the default core action
      const article = await super.find(ctx);
      if (ctx.query.populate && surround) {
        const publishDate = new Date(article.data[0].publishedAt);
        const fewDaysAfter = new Date(publishDate.toJSON());
        fewDaysAfter.setDate(fewDaysAfter.getDate() + 30);
        const fewDaysBefore = new Date(publishDate.toJSON());
        fewDaysBefore.setDate(fewDaysBefore.getDate() - 30);

        const { results: nextArticle }: any = await strapi
          .service("api::article.article")
          .find({
            fields: ["slug", "publishedAt"],
            filters: {
              $and: [
                {
                  publishedAt: {
                    $gt: article.data[0].publishedAt,
                  },
                },
                {
                  publishedAt: {
                    $lt: fewDaysAfter,
                  },
                },
              ],
            },
            pagination: {
              page: 1,
              pageSize: 1,
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
                    $lt: article.data[0].publishedAt,
                  },
                },
                {
                  publishedAt: {
                    $gt: fewDaysBefore,
                  },
                },
              ],
            },
            pagination: {
              page: 1,
              pageSize: 1,
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
          prev: sanitezedPreviousArticle, next: sanitezedNextArticle,
        };
      }

      return article;
    },
  })
);
