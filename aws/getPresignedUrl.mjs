import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3client = new S3Client();

export async function handler(event) {
  const { fileKey } = JSON.parse(event.body)

  if (!fileKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'File key is required.'
      })
    }
  }

  const s3command = new PutObjectCommand({
    Bucket: 'lfzg',
    Key: fileKey
  })

  const signedUrl = await getSignedUrl(s3client, s3command, { expiresIn: 60 })

  return {
    statusCode: 200,
    body: JSON.stringify({ signedUrl })
  }
}
