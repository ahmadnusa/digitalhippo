import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PRODUCT_CATEGORIES } from "@/config"

import { buttonVariants } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"

const MobileNav2 = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
        <Menu className="h-6 w-6" aria-hidden />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col fixed overflow-auto scrollbar-none"
      >
        <SheetHeader className="text-left px-4">
          <SheetTitle>Category</SheetTitle>
        </SheetHeader>

        <div className="mt-2">
          <ul>
            {PRODUCT_CATEGORIES.map((category) => (
              <li key={category.label} className="space-y-4 px-4 pb-8 ">
                <div className="border-b border-gray-200">
                  <div className="-mb-px flex">
                    <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 text-base font-semibold underline">
                      {category.label}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                  {category.featured.map((item) => (
                    <div key={item.name} className="group relative text-sm">
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <Image
                          priority
                          fill
                          sizes="100%"
                          src={item.imageSrc}
                          alt="product category image"
                          className="object-cover object-center"
                        />
                      </div>
                      <Link
                        href={item.href}
                        className="mt-6 block font-normal text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <SheetFooter className="flex flex-row justify-end gap-3 px-4 py-6">
          <SheetClose asChild>
            <Link href="/sign-up" className={buttonVariants()}>
              Sign up
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "outline" })}
            >
              Sign in
            </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav2
