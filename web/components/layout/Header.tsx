import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-green-600 shadow-md">
      <div className="h-14 flex items-center justify-center px-4">
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="Nineteen Shop"
            width={140}
            height={56}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
      </div>
    </header>
  )
}
