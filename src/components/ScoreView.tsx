import { useEffect, useRef } from 'react'
import abcjs, { type TuneObject } from 'abcjs'

interface ScoreViewProps {
  abc: string
  onRendered?: (visualObj: TuneObject | undefined) => void
}

export function ScoreView({ abc, onRendered }: ScoreViewProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const [visualObj] = abcjs.renderAbc(ref.current, abc, { responsive: 'resize' })
    onRendered?.(visualObj)
  }, [abc, onRendered])

  return <div ref={ref} className="w-full overflow-auto" />
}
