'use server'

import { GET_RESOURCE } from '@/lib/queries'
import { request } from 'graphql-request'
import { Resource } from '@/lib/codegen/__generated__/graphql'

export async function getResource(id: string) {
  const url = process.env.HYGRAPH_API_URL as string

  const res = await request<{ resources: Resource[] }>(url, GET_RESOURCE, {
    id,
  }).catch(console.error)

  if (res) {
    return res.resources[0]
  }
}
