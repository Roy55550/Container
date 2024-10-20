import { playfair } from '@/app/fonts'

export function CustomComponent() {
  return (
    <div>
      <h2 className={`${playfair.className} text-2xl font-bold`}>Component Heading</h2>
      {/* Rest of your component content */}
    </div>
  )
}