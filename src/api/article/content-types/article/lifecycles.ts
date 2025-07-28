export default {
    async afterCreate(event) {
        const { result } = event;

        // Check if the content was published
        if (result.publishedAt && !result.firstPublishedAt) {
            await strapi.documents("api::article.article").update({
                documentId: result.documentId,
                status: "published",
                data: {
                    firstPublishedAt: result.publishedAt,
                },
            });
        }
    },
    async afterUpdate(event) {
        const { result } = event;

        // Check if the content was published
        if (result.publishedAt && !result.firstPublishedAt) {
            await strapi.documents("api::article.article").update({
                documentId: result.documentId,
                status: "published",
                data: {
                    firstPublishedAt: result.publishedAt,
                },
            });
        }
    },
};
