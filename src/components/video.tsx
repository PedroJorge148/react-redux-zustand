import { useEffect } from "react"
import ReactPlayer from "react-player"
import { useAppDispatch, useAppSelector } from "../store"
import { next, useCurrentLesson } from "../store/slices/player"
import { Loader2 } from "lucide-react"

export function Video() {
  const dispatch = useAppDispatch()

  const { currentLesson } = useCurrentLesson()
  const isCourseLoading = useAppSelector(state => state.player.isLoading)

  function handlePlayNext() {
    dispatch(next())
  }

  useEffect(() => {
    document.title = `${currentLesson?.title}`
  }, [currentLesson])

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isCourseLoading ? (
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