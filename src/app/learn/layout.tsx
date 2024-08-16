import { getResources } from '@/actions/get-resources'
import { ResourceList } from '@/components/app/resource-list'
import { Suspense } from 'react'

interface LearnLayoutProps {
  children: React.ReactNode
}

export default async function LearnLayout({ children }: LearnLayoutProps) {
  const resources = await getResources()

  return (
    <div className='w-full flex flex-col-reverse items-center lg:items-start lg:flex-row'>
      <aside className='w-full max-w-xl lg:w-96 shrink-0 lg:border-r border-r-charcoal lg:min-h-dvh flex flex-col bg-charcoal/10 lg:bg-black'>
        <Suspense fallback={<div>Loading...</div>}>
          <ResourceList resources={resources ?? []} />
        </Suspense>
      </aside>

      <div className='flex-1 mb-20'>{children}</div>
    </div>
  )
}
