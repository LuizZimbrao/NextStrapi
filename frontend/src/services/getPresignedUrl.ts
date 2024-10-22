'use client'

import { uploadFile } from "./uploadFile";

export async function getPresignedUrl(user: string, file: File) {
  const fileKey = (`${user}-${file.name}`).toLocaleLowerCase().trim();

  const body = JSON.stringify({fileKey})

  try {
    const res = await fetch('https://56jg9wigc1.execute-api.us-east-2.amazonaws.com/reviews', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })

    const json = await res.json()

    if (!json?.signedUrl) return 

    await uploadFile(json?.signedUrl, file)
  } catch (error) {
    console.error(error);
  }
}