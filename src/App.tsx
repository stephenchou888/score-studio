import { useState } from 'react'
import type { TuneObject } from 'abcjs'
import { RotateCcw } from 'lucide-react'

import { PlayerBar } from '@/components/PlayerBar'
import { ScoreView } from '@/components/ScoreView'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { SAMPLE_ABC } from '@/lib/abc-samples'

export default function App() {
  const [abc, setAbc] = useState(SAMPLE_ABC)
  const [visualObj, setVisualObj] = useState<TuneObject>()

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8">
      <header className="mx-auto mb-6 max-w-6xl">
        <h1 className="text-2xl font-bold tracking-tight">Score Studio</h1>
        <p className="text-sm text-muted-foreground">Write ABC notation, see the staff instantly.</p>
      </header>
      <main className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>ABC Notation</CardTitle>
            <CardDescription>Edit the tune below.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Textarea
              value={abc}
              onChange={(e) => setAbc(e.target.value)}
              spellCheck={false}
              aria-label="ABC notation"
              className="min-h-80 font-mono"
            />
            <div>
              <Button variant="outline" size="sm" onClick={() => setAbc(SAMPLE_ABC)}>
                <RotateCcw /> Reset sample
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Rendered with abcjs.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <PlayerBar visualObj={visualObj} />
            <ScoreView abc={abc} onRendered={setVisualObj} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
