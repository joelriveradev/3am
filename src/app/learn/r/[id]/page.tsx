import { getResource } from '@/actions/get-resource'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Show } from '@/components/app/show'

import Link from 'next/link'

interface PageProps {
  params: { id: string }
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const resource = await getResource(params.id)

  if (resource) {
    const { type, title, content } = resource

    return (
      <main className='bg-charcoal/15'>
        <header className='flex items-center justify-between w-full h-14 border-b border-b-charcoal px-2 pr-4'>
          <Button variant='ghost' className=''>
            <Link href='/learn'>
              <ArrowLeft size={20} />
            </Link>
          </Button>

          <h1 className='text-center'>{title}</h1>

          <Button variant='ghost'>
            <ExternalLink size={20} />
          </Button>
        </header>

        <Show when={!!content?.text}>
          <div className='p-6 lg:p-8 h-dvh overflow-y-scroll'>
            <p className='antialiased whitespace-pre-line'>{content?.text}</p>
          </div>
        </Show>
      </main>
    )
  }
}
