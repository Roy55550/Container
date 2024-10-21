import * as React from "react"
import { cn } from "../../lib/utils"

const ProgressPrimitive = React.lazy(() => import('@radix-ui/react-progress').then(mod => ({ default: mod.Root })))

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive> {
  value?: number
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive>, ProgressProps>(
  ({ className, value, ...props }, ref) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ProgressPrimitive
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        <div
          className="h-full w-full flex-1 bg-primary transition-all"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive>
    </React.Suspense>
  )
)
Progress.displayName = "Progress"

export { Progress }
