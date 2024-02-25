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
