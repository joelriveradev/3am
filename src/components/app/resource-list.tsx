'use client'

import { useState, useEffect, FormEvent, Fragment } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Resource } from '@/lib/codegen/__generated__/graphql'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { ArrowUp, ListFilter } from 'lucide-react'

import Link from 'next/link'
import { Show } from './show'

interface Props {
  resources: Resource[]
}

interface Filter {
  id: string
  label: string
}

const filters: Filter[] = [
  { id: 'study', label: 'Studies' },
  { id: 'article', label: 'Articles' },
  { id: 'video', label: 'Videos' },
  { id: 'podcast', label: 'Podcasts' },
]

export const ResourceList = ({ resources }: Props) => {
  const [activeResource, setActiveResource] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const [filteredResources, setFilteredResources] =
    useState<Resource[]>(resources)

  const path = usePathname()

  const handleClick = (id: string) => {
    setActiveResource(id)
  }

  useEffect(() => {
    if (activeFilters.length > 0) {
      return setFilteredResources(
        resources.filter(({ type }) => activeFilters.includes(type))
      )
    }
    setFilteredResources(resources)
  }, [activeFilters])

  const handleFilterSelect = (event: FormEvent<HTMLButtonElement>) => {
    const { id: filter } = event.currentTarget

    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  useEffect(() => {
    setActiveResource(null)
  }, [path])

  return (
    <div className='pb-8'>
      <header className='items-center justify-center flex mb-6 h-14 border-t border-t-charcoal lg:border-t-0 border-b border-b-charcoal px-4'>
        <form className='w-full flex items-center justifiy-center'>
          <Popover>
            <PopoverTrigger
              className={cn(
                'w-10 h-8 flex items-center text-smoke justify-center shrink-0 mr-2 bg-charcoal/30 rounded-md hover:bg-charcoal/40',
                'focus:outline-0 focus:border focus:border-smoke'
              )}
            >
              <ListFilter className='text-smoke shrink-0' size={20} />
            </PopoverTrigger>

            <PopoverContent
              className='w-[350px] max-w-lg'
              side='bottom'
              align='start'
              sideOffset={18}
            >
              <div className='flex flex-col items-top'>
                {filters.map(({ id, label }, i) => {
                  return (
                    <Fragment key={id}>
                      <div className='flex items-center' key={id}>
                        <Checkbox
                          id={id}
                          className='mr-3'
                          onClick={handleFilterSelect}
                          checked={activeFilters.includes(id)}
                          aria-checked={activeFilters.includes(id)}
                        />

                        <label
                          htmlFor='study'
                          className='text-sm antialised leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                          {label}
                        </label>
                      </div>

                      <Show when={i !== filters.length - 1}>
                        <Separator className='my-3' />
                      </Show>
                    </Fragment>
                  )
                })}
              </div>
            </PopoverContent>
          </Popover>

          <Input
            placeholder='Search resources'
            className='w-full border border-charcoal text-left mr-2 px-4'
          />

          <Button
            className='w-10 h-8 bg-charcoal/30 rounded-md hover:bg-charcoal/40'
            type='submit'
            variant='default'
          >
            <ArrowUp className='text-smoke shrink-0' size={20} />
          </Button>
        </form>
      </header>

      <ul
        className={cn('px-6', {
          'hidden lg:block': activeResource,
        })}
      >
        {filteredResources.map(
          ({ id, type, title, description, updatedAt }) => {
            const date = formatDate(updatedAt)
            const active = path.includes(id)

            return (
              <li
                onClick={() => handleClick(id)}
                className={cn(
                  'antialiased border border-transparent p-2 px-3 pb-3',
                  {
                    'border border-danger rounded-xl bg-danger/5': active,
                  }
                )}
                key={id}
              >
                <Link href={`/learn/r/${id}`}>
                  <small className='flex items-center text-xs text-smoke mb-2'>
                    <Badge
                      variant='outline'
                      className='mr-2 p-0 px-2 py-0.5 pb-1 font-normal text-xs border border-smoke/25 capitalize'
                    >
                      {type}
                    </Badge>
                    {date}
                  </small>

                  <p className='text-sm'>{title}</p>
                  <p className='text-[#919191] text-sm mt-0.5'>{description}</p>
                </Link>
              </li>
            )
          }
        )}
      </ul>
    </div>
  )
}
