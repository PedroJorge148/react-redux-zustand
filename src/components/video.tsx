import { useEffect } from "react"
import ReactPlayer from "react-player"
import { useCurrentLesson, useStore } from "../zustand-store"
import { Loader2 } from "lucide-react"

export function Video() {
  const { isLoading, next } = useStore(store => {
    return {
      isLoading: store.isLoading,
      next: store.next
    }
  })  
  
  function handlePlayNext() {
    next()
  }

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    document.title = `${currentLesson?.title}`
  }, [currentLesson])

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="size-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          playing
          onEnded={handlePlayNext}
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  )
}