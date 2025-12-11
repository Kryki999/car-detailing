"use client"
import Lottie from "lottie-react"
import { useEffect, useState } from "react"

interface LottieIconProps {
    path: string
    className?: string
}

export function LottieIcon({ path, className }: LottieIconProps) {
    const [animationData, setAnimationData] = useState<any>(null)

    useEffect(() => {
        fetch(path)
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch((err) => console.error("Error loading Lottie animation:", err))
    }, [path])

    if (!animationData) return <div className={className} />

    return <Lottie animationData={animationData} loop={true} className={className} />
}
