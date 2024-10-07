import Image from "next/image";
import type { ProductImage } from "@/types/product";

export function CardItem({ image, name, price }: { image: ProductImage, name: string, price: number }) {
  const imageSrc = `${"http://localhost:1337"}${image}`;
  const imageLoader = () => {
    return `http://localhost:1337${image.url}?w=${image.width}&q=${75}`
  }

  return (
    <div className="flex flex-col items-center content-center bg-slate-200 size-full rounded-lg">
      <div className="p-5">
        <Image loader={imageLoader} src={imageSrc} alt={name} height={image.height} width={image.width} />
      </div>

      <div className="flex items-center content-between shadow-sm p-5 bg-white size-full rounded-b-lg">
        <p className="text-slate-500 font-bold flex-1">{name}</p>
        <p className="text-slate-500 font-bold">$ {price}</p>
      </div>
    </div>
  )
}
