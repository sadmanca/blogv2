import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-secondary/50 hover:text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/50',
        outline: 'border border-input bg-background hover:bg-secondary/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        social: 'bg-primary text-primary-foreground hover:bg-tertiary hover:text-tertiary-foreground',
        website: 'bg-primary text-primary-foreground hover:bg-tertiary hover:text-tertiary-foreground',
        linkedin: 'bg-primary text-primary-foreground hover:bg-[#0077B5] hover:text-tertiary-foreground',
        github: 'bg-primary text-primary-foreground hover:bg-background hover:text-secondary-foreground',
        twitter: 'bg-primary text-primary-foreground hover:bg-blue-500 hover:text-tertiary-foreground hover:border-solid',
        bluesky: 'bg-primary text-primary-foreground hover:bg-sky-400/90 hover:text-tertiary-foreground',
        threads: 'bg-primary text-primary-foreground hover:bg-background hover:text-secondary-foreground',
        mastodon: 'bg-primary text-primary-foreground hover:bg-tertiary hover:text-tertiary-foreground',
        pixelfed: 'bg-primary text-primary-foreground hover:bg-background hover:text-secondary-foreground',
        instagram: 'bg-primary text-primary-foreground hover:bg-pink-500 hover:text-tertiary-foreground',
        spotify: 'bg-primary text-primary-foreground hover:bg-green-500/90 hover:text-secondary-foreground',
        lastfm: 'bg-primary text-primary-foreground hover:bg-red-800/95 hover:text-tertiary-foreground',
        goodreads: 'bg-primary text-primary-foreground hover:bg-goodreads hover:text-goodreads-foreground',
        email: 'bg-primary text-primary-foreground hover:bg-red-500/95 hover:text-tertiary-foreground',
        rss: 'bg-primary text-primary-foreground hover:bg-orange-600/90 hover:text-tertiary-foreground',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
