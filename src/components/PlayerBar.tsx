import { useEffect, useRef, useState } from 'react'
import abcjs, { type TuneObject } from 'abcjs'
import { Pause, Play } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function PlayerBar({ visualObj }: { visualObj?: TuneObject }) {
  const synthRef = useRef<InstanceType<typeof abcjs.synth.CreateSynth> | null>(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState<string>()

  // Tune changed: drop the old synth.
  useEffect(() => {
    return () => {
      synthRef.current?.stop()
      synthRef.current = null
      setPlaying(false)
    }
  }, [visualObj])

  const toggle = async () => {
    if (!visualObj) return
    setError(undefined)
    try {
      if (playing) {
        synthRef.current?.pause()
        setPlaying(false)
        return
      }
      if (!synthRef.current) {
        if (!abcjs.synth.supportsAudio()) throw new Error('Audio is not supported in this browser.')
        const synth = new abcjs.synth.CreateSynth()
        await synth.init({ visualObj })
        await synth.prime()
        synthRef.current = synth
      }
      synthRef.current.start()
      setPlaying(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      setPlaying(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button onClick={toggle} disabled={!visualObj} size="sm">
        {playing ? <Pause /> : <Play />}
        {playing ? 'Pause' : 'Play'}
      </Button>
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  )
}
