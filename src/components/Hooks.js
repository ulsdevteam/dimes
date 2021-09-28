import { useEffect, useState } from 'react'

export function useOnScreen(ref) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
    {threshold: "0.3"}
  )

  useEffect(() => {
    ref.current && observer.observe(ref.current)
    // Remove the observer as soon as the component is unmounted
    return () => { observer.disconnect() }
  }, [ref])
  return isIntersecting
}
