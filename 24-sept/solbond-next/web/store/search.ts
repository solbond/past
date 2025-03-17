import { atom } from "jotai"
import atomWithDebounce from "./atomWithDebounce"

export const searchAtom = atom({
	query: "",
	isOpen: false,
	isFocused: false
})

export const { isDebouncingAtom, debouncedValueAtom, clearTimeoutAtom, currentValueAtom } = atomWithDebounce("")
