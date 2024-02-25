import { insert, getDB, saveDB } from './db.js'

export const newNote = async (note, tags = []) => {
  const data = {
    tags,
    content: note,
    id: Date.now(),
  }
  await insert(data)
  return data
}

export const getAllNotes = async () => (await getDB()).notes

export const findNotes = async (filter) =>
  (await getAllNotes()).filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  )

export const removeNote = async (id) => {
  const notes = await getAllNotes()
  const match = notes.find((note) => note.id === id)
  console.log(match)

  if (match) {
    const newNotes = notes.filter((note) => note.id !== match.id)
    await saveDB({ notes: newNotes })
    return id
  }
}

export const removeAllNotes = () => saveDB({ notes: [] })
