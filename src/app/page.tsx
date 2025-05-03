import { getUser } from "@/auth/server"
import { prisma } from "@/db/prisma"
import AskAIButton from "./Componets/AskAIButton"
import HomeToast from "./Componets/HomeToast"
import NoteTextInput from "./Componets/NoteTextInput"
import NewNoteButton from "./Componets/NewNoteButton"

type Props={
  searchParams:Promise<{[key:string]:string | string[] |undefined}>
}

async function Homepage({searchParams}:Props){
  const noteidParam=(await searchParams).noteId
  const user=await getUser()
  const noteId=Array.isArray(noteidParam)? noteidParam![0]:noteidParam || "";

  const note =await prisma.note.findUnique({
    where:{id:noteId,authorId:user?.id}
  })
return(
  <div className="flex h-full flex-col items-center gap-4">
  <div className="flex w-full max-w-4xl justify-end gap-2">
    <AskAIButton user={user}  />
    <NewNoteButton user={user} />
  </div>

  <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />

  <HomeToast />
</div>
)
}

export default Homepage