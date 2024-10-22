"use client";

import { useState } from "react";
import { getPresignedUrl } from "@/services/getPresignedUrl";
import { setReviewInProduct } from "@/services/setReviewInProduct";

type Reviewer = {
  user: string;
  comment: string;
  image: File | null;
};

export function ReviewsAndRates() {
  const [reviewer, setReviewer] = useState<Reviewer>({
    user: "",
    comment: "",
    image: null,
  });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
  
    if (file) {
      setReviewer((currentState) => ({
        ...currentState,
        image: file,
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const productId = window.location.pathname.split("/")[1];

    const body = {
      data: {
        ...reviewer,
        image: `${reviewer.user}-${reviewer.image?.name}`.toLocaleLowerCase().trim()
      },
    };

    if (!reviewer.user || !reviewer.comment || !reviewer.image) return 

    try {
      const res = await fetch(`http://localhost:1337/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!json?.data) return;

      await setReviewInProduct(productId, json.data.documentId)
      await getPresignedUrl(reviewer.user, reviewer.image)
    } catch (error) {
      console.error(error);
    } finally {
      setReviewer({
        user: "",
        comment: "",
        image: null,
      })
    }
  }



  return (
    <form
      className="flex flex-col bg-white rounded-sm p-10"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col space-y-4 items-center justify-center">
        <input
          className="w-full h-10 block text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <input
          className="w-full h-10 bg-slate-100 shadow-md rounded-xl p-4"
          name="user"
          type="text"
          value={reviewer.user}
          onChange={(e) =>
            setReviewer((currentState) => ({
              ...currentState,
              user: e.target.value,
            }))
          }
        />
        <input
          className="w-full h-10 bg-slate-100 shadow-md rounded-xl p-4"
          name="comment"
          type="text"
          value={reviewer.comment}
          onChange={(e) =>
            setReviewer((currentState) => ({
              ...currentState,
              comment: e.target.value,
            }))
          }
        />

        <button className="w-full h-10 shadow-md rounded-xl" type="submit">
          Enviar
        </button>
      </div>
    </form>
  );
}
