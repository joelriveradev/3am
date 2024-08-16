'use server'

import { request } from 'graphql-request'
import { GET_RESOURCE_LIST } from '@/lib/queries'
import { Resource } from '@/lib/codegen/__generated__/graphql'

export async function getResources() {
  const url = process.env.HYGRAPH_API_URL as string

  const res = await request<{ resources: Resource[] }>(
    url,
    GET_RESOURCE_LIST
  ).catch(console.error)

  if (res) {
    return res.resources
  }
}
