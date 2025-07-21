import { ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils" // Utility for conditional classnames (if you're using it)

/**
 * ChartContainer wraps a recharts component in a responsive container.
 */
export function ChartContainer({ children, className = "", height = 300 }) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

/**
 * Sample chart configuration with CSS variable-based colors.
 */
export const ChartConfig = {
  colors: ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"],
  height: 300,
}

/**
 * Wrapper for recharts tooltip.
 */
export function ChartTooltip({ content }) {
  return <>{content}</>
}

/**
 * Tooltip content with dark ShadCN-style appearance.
 */
export function ChartTooltipContent({
  label,
  payload,
  hideLabel = false,
  indicator = "solid", // new: dashed or solid
  nameKey = null, // if dataKey doesn't match label name
  className = "",
  labelFormatter = null, // optional label formatter
}) {
  if (!payload || payload.length === 0) return null

  return (
    <div
      className={cn(
        "rounded-md border border-muted bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md",
        className
      )}
    >
      {!hideLabel && (
        <p className="mb-1 text-xs font-medium text-muted-foreground">
          {labelFormatter ? labelFormatter(label) : label}
        </p>
      )}
      {payload.map((entry, idx) => (
        <div key={idx} className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <span
              className={cn(
                "inline-block h-2 w-2 rounded-full",
                indicator === "dashed" ? "border border-current" : ""
              )}
              style={{
                backgroundColor:
                  indicator === "dashed" ? "transparent" : entry.color,
                color: entry.color,
              }}
            />
            <span className="capitalize">
              {nameKey ? entry.payload[nameKey] : entry.name}
            </span>
          </span>
          <span className="font-semibold">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * Chart legend wrapper
 */
export function ChartLegend({ content }) {
  return <>{content}</>
}

/**
 * Basic legend content for desktop vs. mobile
 */
export function ChartLegendContent({
  labels = [
    { label: "Desktop", color: "var(--chart-1)" },
    { label: "Mobile", color: "var(--chart-2)" },
  ],
}) {
  return (
    <ul className="flex gap-4 text-sm text-muted-foreground">
      {labels.map((item, i) => (
        <li key={i} className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  )
}
