"use client";
import { useEffect, useState } from "react";
import { CardItem } from "../CardItem";
import { CardItemSkeleton } from "../CardItemSkeleton";

import type { ProductData } from "@/types/product";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

export function ProductShelf() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:1337/api/products?populate=product_url", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();

      setProducts(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  if (loading) return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="flex flex-col w-full max-w-full relative p-10"
    >
      <div className="w-full flex items-center justify-end space-x-4">
        <CarouselPrevious />
        <CarouselNext />
      </div>

      <CarouselContent>
        <CardItemSkeleton />
        <CardItemSkeleton />
        <CardItemSkeleton />
      </CarouselContent>
    </Carousel>
  );

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="flex flex-col w-full max-w-full relative p-10"
    >
      <div className="w-full flex items-center justify-end space-x-4">
        <CarouselPrevious />
        <CarouselNext />
      </div>

      <CarouselContent>
        {products.map(
          ({
            product_id,
            product_url,
            product_name,
            product_price,
          }: ProductData) => (
            <CarouselItem
              key={product_id}
              className="md:basis-1/3 lg:basis-1/3 mb-1"
            >
              <div className="flex items-center justify-center min-h-32 cursor-pointer">
                <CardItem
                  image={product_url[0]}
                  name={product_name}
                  price={product_price}
                />
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
    </Carousel>
  );
}
