import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

// Returns a boolean indicating if an element is visible on screen
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

// Executes a callback when a ref is resized
export const useResizeObserver = ({ callback, element }) => {

  const current = element && element.current;
  const observer = useRef(null);

  useEffect(() => {
      const currentElement = element.current
      if (observer.current) {
        observer.current.observe(currentElement)
      }
      observer.current = new ResizeObserver(callback)
      observe()
      return () => {
        // Remove the observer as soon as the component is unmounted
        observer.current.unobserve(currentElement)
      }
  }, [current])

  const observe = () => {
    if (element && element.current && observer.current) {
      observer.current.observe(element.current)
    }
  }

}

useResizeObserver.propTypes = {
  element: PropTypes.object,
  callback: PropTypes.func,
};
