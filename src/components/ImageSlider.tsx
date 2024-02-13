import Image from "next/image"
import Link from "next/link"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ImageSliderProps {
  urls: string[]
  href?: string
}

const ImageSlider = ({ urls, href }: ImageSliderProps) => {
  return (
    <Carousel className=" group w-full max-w-xs">
      <CarouselContent>
        {urls.map((url, index) => (
          <CarouselItem key={index} className=" relative h-full w-full">
            <Link href={href || ""}>
              <Image
                src={url}
                height={500}
                width={500}
                loading="eager"
                className="h-full w-full object-cover aspect-square"
                alt="product-image"
                priority
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      {urls.length > 1 && (
        <>
          <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-80" />
          <CarouselNext className="right-2 opacity-0 group-hover:opacity-80" />
        </>
      )}
    </Carousel>
  )
}

export default ImageSlider
