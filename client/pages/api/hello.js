// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {client} from "../../utils/shopify";

export default (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}

export async function getServerSideProps() {
  const products = await client.product.fetchAll()
  return { props: { products: JSON.parse(JSON.stringify(products)) }}
}