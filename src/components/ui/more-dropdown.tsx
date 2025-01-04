import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, CalendarFold, Laptop, Moon, Sun } from 'lucide-react'
import * as React from 'react'

export function MoreDropdown() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="group px-2 py-0 capitalize text-foreground/60 transition-colors hover:text-foreground/80"
          title="More"
        >
          <span>More</span>
          <ChevronDown className="size-4" style={{ marginTop: '2.5px' }} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background">
        <DropdownMenuItem onClick={() => window.location.href = '/uses'}>
          <Laptop className="mr-2 size-4" />
          <span>Uses</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
