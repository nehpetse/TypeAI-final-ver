import { Storage } from '@lib/enums/Storage'
import { Logger } from '@lib/state/Logger'
import { createMMKVStorage } from '@lib/storage/MMKV'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TextFilterStateProps = {
    filter: string[]
    setFilter: (arr: string[]) => void
}

export const useTextFilterStore = create<TextFilterStateProps>()(
    persist(
        (set) => ({
            filter: [],
            setFilter: (arr) => set((state) => ({ ...state, filter: arr })),
        }),
        {
            name: Storage.TextFilter,
            version: 1,
            storage: createMMKVStorage(),
        }
    )
)

type RegexResult = {
    result: string
    found: boolean
}

export const useTextFilter = (inputString: string): RegexResult => {
    const filters = useTextFilterStore((state) => state.filter)
    if (filters.length === 0) return { result: inputString, found: false }
    let newString = inputString
    try {
        filters.forEach((item) => {
            const regex = new RegExp(item, 'gi')
            newString = inputString.replace(regex, '')
        })
    } catch (e) {
        Logger.warn('Regex parsing failed: ' + e)
    } finally {
        return { result: newString, found: newString.length !== inputString.length }
    }
}
