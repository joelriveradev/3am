import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LearnPage() {
  return (
    <main className='flex flex-col items-center antialiased pt-12 px-10'>
      <div className=' flex items-center justify-center bg-danger/10 rounded-full w-32 h-32 mb-10'>
        <Sparkles className='text-danger' size={64} />
      </div>

      <h1 className='text-2xl md:text-3xl font-semibold text-center'>
        Welcome to 3AM <span className='text-danger'>Insights</span>.
      </h1>

      <p className='text-center mt-3 text-smoke max-w-md mx-auto'>
        Discover prophetic insights and glimpses from the Bible about what must
        shortly come to pass upon this world.
      </p>
    </main>
  )
}
