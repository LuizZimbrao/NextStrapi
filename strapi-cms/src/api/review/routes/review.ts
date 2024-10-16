/**
 * review router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::review.review', {
  config: {
    create: {
      auth: false,
      middlewares: [
        async (ctx, next) => {
          const { user } = ctx.request.body;

          // const fileParsed = JSON.parse(image)

          const fileKey = `${user}.png`

          try {
            const res = await fetch('https://56jg9wigc1.execute-api.us-east-2.amazonaws.com/reviews', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ fileKey })
            })

            const json = await res.json()

            console.log('>>>', 's3 url', json);
            
          } catch (error) {
            console.error(error);
          } finally {
            return next()
          }
        }
      ]
    },
  },
});
