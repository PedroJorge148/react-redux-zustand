import { MessageCircle } from "lucide-react"
import { useEffect } from "react"
import { Header } from "../components/header"
import { Module } from "../components/module"
import { Video } from "../components/video"
import { useStore } from "../zustand-store"
// import { useAppDispatch, useAppSelector } from "../store"
// import { loadCourse, } from "../store/slices/player"

export function Player() {
  const { course, load } = useStore(store => {
    return {
      course: store.course,
      load: store.load
    }
  })  
  useEffect(() => {
    load()
  }, [])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6 m-10">
        <div className="flex items-center justify-between">
          <Header />
          <button className="flex items-center gap-2 rounded bg-violet-500 py-2 px-3 text-sm text-white hover:bg-violet-600 transition-colors">
            <MessageCircle className="size-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {course?.modules && course.modules.map((module, i) => (
              <Module
                key={module.id}
                moduleIndex={i} 
                title={module.title} 
                amountOfLessons={module.lessons.length} 
              />
            ))}
          </aside>
        </main>
      </div>
    </div>
  )
}