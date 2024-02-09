import {
  AfterChangeHook,
  BeforeChangeHook,
} from "payload/dist/collections/config/types"
import { Access, CollectionConfig } from "payload/types"

import { PRODUCT_CATEGORIES } from "../../config"
import { Product, User } from "../../payload-types"

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
  const user = req.user

  return { ...data, user: user.id }
}

const syncUser: AfterChangeHook<Product> = async ({ req, doc }) => {
  const fullUser = await req.payload.findByID({
    collection: "users",
    id: req.user.id,
  })

  if (fullUser && typeof fullUser === "object") {
    const { products } = fullUser

    const allIDs = [
      ...(products?.map((product) =>
        typeof product === "object" ? product.id : product
      ) || []),
    ]

    const createdProductIDs = allIDs.filter(
      (id, index) => allIDs.indexOf(id) === index
    )

    const dataToUpdate = [...createdProductIDs, doc.id]

    await req.payload.update({
      collection: "users",
      id: fullUser.id,
      data: {
        products: dataToUpdate,
      },
    })
  }
}

const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined

    if (!user) return false
    if (user.role === "admin") return true

    const userProductIDs = (user.products || []).reduce<Array<string>>(
      (acc, product) => {
        if (!product) return acc
        if (typeof product === "string") {
          acc.push(product)
        } else {
          acc.push(product.id)
        }

        return acc
      },
      []
    )

    return {
      id: {
        in: userProductIDs,
      },
    }
  }

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {},
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Product details",
    },
    {
      name: "price",
      label: "Price in USD",
      min: 0,
      max: 1000,
      type: "number",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: "product_files",
      label: "Product file(s)",
      type: "relationship",
      required: true,
      relationTo: "product_files",
      hasMany: false,
    },
    {
      name: "approvedForSale",
      label: "Product Status",
      type: "select",
      defaultValue: "pending",
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
      options: [
        {
          label: "Pending verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      label: "Product images",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
}
