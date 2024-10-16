'use client'
import { useState } from "react"

type Reviewer = {
  user: string,
  comment: string,
  image: string,
}

export function ReviewsAndRates() {
  const [reviewer, setReviewer] = useState<Reviewer>({ user: '', comment: '', image: '' })

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; 

    console.log('>>>', file);
    

    if (file) {
      setReviewer((currentState) => ({...currentState, image: JSON.stringify(file)}))
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const productId = window.location.pathname.split('/')[1]

    const body = {
      data: {
        ...reviewer
      }
    }

    try {
      const res = await fetch(`http://localhost:1337/api/reviews`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });

      const json = await res.json();
      
      if (!json?.data) return
        
      await setReviewInProduct(productId, json.data.documentId)
      
    } catch (error) {
      console.error(error);
    }
  }

  async function setReviewInProduct(productId: string, reviewId: string) {
    await fetch(`http://localhost:1337/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          reviews: {
            connect: [{ documentId: reviewId, status: 'published', end: true }]
          }
        }
      })
    })
  }

  return (
    <form className="flex flex-col bg-white rounded-sm p-10" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4 items-center justify-center">
        <input className="w-full h-10" name="image" type="file" accept="image/*" onChange={handleFileChange} />
        <input className="w-full h-10 bg-slate-100 shadow-md rounded-xl p-4" name="user" type="text" value={reviewer.user} onChange={(e) => setReviewer((currentState) => ({...currentState, user: e.target.value}))} />
        <input className="w-full h-10 bg-slate-100 shadow-md rounded-xl p-4" name="comment" type="text" value={reviewer.comment} onChange={(e) => setReviewer((currentState) => ({...currentState, comment: e.target.value}))} />

        <button className="w-full h-10 shadow-md rounded-xl" type="submit">Enviar</button>
      </div>
    </form>
  )
}