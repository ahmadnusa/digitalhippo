import { initTRPC } from "@trpc/server"
import { PayloadRequest } from "payload/types"

const t = initTRPC.context().create()
const middleware = t.middleware

// const isAuth = middleware(async ({ ctx, next }) => {
//   const req = ctx.req as PayloadRequest
//   const { user } = rea as { user: User | null }
// })

export const router = t.router
export const publicProcedure = t.procedure
