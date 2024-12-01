import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm" | "lg"
  text?: string
}

export function Loading({ 
  size = "default", 
  text = "Loading...",
  className,
  ...props 
}: LoadingProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center space-y-2",
        className
      )} 
      {...props}
    >
      <Loader2 className={cn(
        "animate-spin",
        {
          "h-4 w-4": size === "sm",
          "h-8 w-8": size === "default",
          "h-12 w-12": size === "lg",
        }
      )} />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  )
} 