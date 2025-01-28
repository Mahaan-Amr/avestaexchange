import Link from 'next/link'
import { defaultLocale } from '@/lib/utils/i18n'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-4">Could not find requested resource</p>
        <Link
          href={`/${defaultLocale}`}
          className="text-blue-600 hover:underline"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 