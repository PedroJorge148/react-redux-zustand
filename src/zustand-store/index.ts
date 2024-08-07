import { create } from "zustand"
import { api } from "../lib/api"

interface Course {
  id: string
  modules: {
    id: string
    title: string
    lessons: {
      id: string
      title: string
      duration: string
    }[]
  }[]
}

export interface PlayerState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean,
  
  play: (moduleAndLessonIndex: [number, number]) => void
  next: () => void
  load: () => Promise<void>
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    load: async () => {
      set({ isLoading: true })

      const response = await api.get('/courses/1')
      
      set({
        course: response.data,
        isLoading: false
      })
    },

    play: ([moduleIndex, lessonIndex]: [number, number]) => {
      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex
      })
    },

    next: () => {
      const { currentModuleIndex, currentLessonIndex, course } = get()

      const nextLessonIndex = currentLessonIndex + 1

      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex
        })
      } else {
        const nextModuleIndex = currentModuleIndex + 1

        const nextModule = course?.modules[nextModuleIndex]

        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0
          })
        }
      }
    }
  }
})