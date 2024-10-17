/**
 * review router
 */

import { factories } from '@strapi/strapi';
import { uploadFile } from '../../../services/uploadFile';

export default factories.createCoreRouter('api::review.review', {
  config: {
    create: {
      auth: false,
      middlewares: [
        async (ctx, next) => {
          const { data: { user, image } } = ctx.request.body;

          const fileParsed = JSON.parse(image ?? "{}")

          const fileKey = `${user}-${fileParsed.name}`

          try {
            const res = await fetch('https://56jg9wigc1.execute-api.us-east-2.amazonaws.com/reviews', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ fileKey })
            })

            const json = await res.json() as any

            await uploadFile(json?.signedUrl, fileParsed)
            
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
