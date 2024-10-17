export async function uploadFile(url: string, file: File) {
  try {
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    })
      
  } catch (error) {
    console.error(error)
  }
}