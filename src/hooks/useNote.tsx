"use client"

import { NoteProviderContext } from "@/app/providers/noteprovider"
import { useContext } from "react"

function useNote(){
    const context=useContext(NoteProviderContext)

    if (!context) throw new  Error("Usenote must be used with a note Provider")

        return context
}

export default useNote