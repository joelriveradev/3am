interface Route {
  name: string
  href: string
}

export const routes: Route[] = [
  { name: 'Home', href: '/' },
  { name: 'Learn', href: '/learn' },
  { name: 'News', href: '/news' },
]
