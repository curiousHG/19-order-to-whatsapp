import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"

import { cn } from "@/lib/utils"

function ToggleGroup<Value extends string>({
  className,
  ...props
}: ToggleGroupPrimitive.Props<Value>) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      className={cn("inline-flex items-center gap-0.5 rounded-full p-0.5", className)}
      {...props}
    />
  )
}

function ToggleGroupItem<Value extends string>({
  className,
  ...props
}: TogglePrimitive.Props<Value>) {
  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2 py-1 text-[11px] font-semibold sm:px-2.5",
        "transition-colors touch-manipulation select-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-white/70",
        "data-unpressed:text-white/70 data-unpressed:hover:text-white",
        "data-pressed:bg-amber-400 data-pressed:text-green-950 data-pressed:shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
