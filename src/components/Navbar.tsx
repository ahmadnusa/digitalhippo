import { cookies } from "next/headers"
import Link from "next/link"
import React from "react"

import { Icons } from "./Icons"
import MaxWidthWrapper from "./MaxWidthWrapper"
import MobileNav from "./MobileNav"
import Navitems from "./Navitems"
import { buttonVariants } from "./ui/button"

const Navbar = () => {
  const nextCoocies = cookies()
  const user = false
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <MobileNav />

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <Navitems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!user && (
                    <>
                      <Link
                        href="/sign-in"
                        className={buttonVariants({ variant: "secondary" })}
                      >
                        Sign in
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link
                        href="/sign-up"
                        className={buttonVariants({ variant: "default" })}
                      >
                        Create account
                      </Link>
                      <div className="flex lg:ml-6">
                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}

                  {/* {user && (
                    <>
                      <UserAccountNav user={user} />
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />{" "}
                    </>
                  )} */}

                  <div className="ml-4 flow-root lg:ml-6">
                    Cart{/* <Cart /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar
