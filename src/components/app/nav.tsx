'use client'

import { usePathname } from 'next/navigation'
import { routes } from '@/lib/nav'
import { cn } from '@/lib/utils'

import Link from 'next/link'

const root = '/'

const isActiveRoute = (pathname: string, target: string): boolean => {
  if (pathname !== root && target === root) {
    return false
  }
  // includes nested routes like /learn/s/:id
  return pathname.startsWith(target)
}

export const Nav = ({ className }: { className?: string }) => {
  const pathname = usePathname()

  return (
    <nav className={cn(className)}>
      <ul className='w-full inline-flex items-center'>
        {routes.map(({ name, href }) => {
          const active = isActiveRoute(pathname, href)

          if (pathname === root && href === root) {
            return null
          }

          return (
            <li
              key={name}
              className={cn(
                'text-smoke text-sm mr-4 last:m-0',
                'focus:text-danger focus:underline focus:underline-offset-4',
                'hover:text-danger hover:underline hover:underline-offset-4',
                {
                  'text-danger': active,
                }
              )}
            >
              <Link href={href}>{name}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
