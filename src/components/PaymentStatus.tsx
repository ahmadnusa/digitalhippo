"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { trpc } from "@/trpc/client"

interface PaymentStatusProps {
  orderEmail: string
  orderId: string
  isPaid: boolean
}

const PaymentStatus = ({ orderEmail, orderId, isPaid }: PaymentStatusProps) => {
  const router = useRouter()

  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  )

  useEffect(() => {
    if (data?.isPaid) router.refresh()
  }, [data?.isPaid, router])

  return (
    <div className="mt-16 flex justify-between text-sm text-gray-600">
      <div>
        <p className="font-medium text-gray-900">Shipping To</p>
        <p>{orderEmail}</p>
      </div>

      <div className="text-end">
        <p className="font-medium text-gray-900">Order Status</p>
        <p className={isPaid ? "text-green-600" : "text-yellow-400"}>
          {isPaid ? "Payment successful" : "Pending payment"}
        </p>
      </div>
    </div>
  )
}

export default PaymentStatus
