'use client'

export async function setReviewInProduct(productId: string, reviewId: string) {
  await fetch(`http://localhost:1337/api/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        reviews: {
          connect: [{ documentId: reviewId, status: "published", end: true }],
        },
      },
    }),
  });
}