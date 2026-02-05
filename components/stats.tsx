"use client"

import { useEffect, useState, useRef } from "react"

interface StatItem {
  value: number
  suffix: string
  label: string
  _key?: string
}

interface StatsProps {
  statsList?: StatItem[]
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export function Stats(props: StatsProps) {
  // Early return if no data from CMS
  if (!props.statsList || props.statsList.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {props.statsList.map((stat, index) => (
            <div key={stat._key || index} className="text-center w-[45%] lg:w-auto min-w-[150px]">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

