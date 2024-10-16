'use client'
import { useEffect, useState } from "react";
import { ProductDetailsSkeleton } from "../ProductDetailsSkeleton";

import type { ProductData } from "@/types/product";

import Image from "next/image";

export function ProductDetails() {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setLoading(true);

    const documentId = window.location.pathname.split('/')[1]

    try {
      const res = await fetch(`http://localhost:1337/api/products/${documentId}?populate=*`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();

      setProduct(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  if (loading || !product) return <ProductDetailsSkeleton />

  const imageSrc = `${"http://localhost:1337"}${product.product_url[0].url}`;
  const imageLoader = () => {
    return `http://localhost:1337${product.product_url[0].url}?w=${product.product_url[0].width}&q=${75}`
  }

  return (
    <div className="flex items-center size-full mt-4 p-10">
      <div className="w-2/5 flex items-center justify-center">
        <Image loader={imageLoader} src={imageSrc} alt={product.product_name} height={product.product_url[0].height * 1.5} width={product.product_url[0].width * 1.5} />
      </div>

      <div className="w-3/5 flex p-5">
        <div className="flex flex-1 flex-col items-end">
          <p className="text-3xl text-slate-500 font-bold border-b border-slate-200 pb-4">{product.product_name}</p>
          <p className="text-2xl text-slate-500 font-bold pt-4">$ {product.product_price}</p>
        </div>
      </div>
    </div>
  )
}
