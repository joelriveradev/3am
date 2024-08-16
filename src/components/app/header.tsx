import { Logo } from './logo'
import { Nav } from './nav'
import { Menu } from 'lucide-react'

export const Header = () => {
  return (
    <header className='w-full h-16 flex items-center justify-between px-6 md:px-8 border-b border-b-charcoal'>
      <Logo />
      <Nav className='hidden lg:block' />
      <Menu className='lg:hidden' size={24} />
    </header>
  )
}
