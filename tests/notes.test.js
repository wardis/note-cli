import { jest } from '@jest/globals'

jest.unstable_mockModule('../src/db.js', () => ({
  insert: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}))

beforeEach(() => {
  insert.mockClear()
  getDB.mockClear()
  saveDB.mockClear()
})

const { insert, getDB, saveDB } = await import('../src/db.js')
const { newNote, getAllNotes, removeNote } = await import('../src/notes.js')

describe('Note CLI', () => {
  test('newNote inserts data and returns it', async () => {
    const note = {
      content: 'this is a note',
      id: 1,
      tags: ['hello'],
    }
    insert.mockResolvedValue({ ...note, tags: [...note.tags] })

    const result = await newNote(note.content, note.tags)
    expect(result.content).toEqual(note.content)
    expect(result.tags).toEqual(note.tags)
  })

  test('getAllNotes returns all notes', async () => {
    const db = {
      notes: ['note1', 'note2', 'note3'],
    }
    getDB.mockResolvedValue(db)

    const result = await getAllNotes()
    expect(result).toEqual(db.notes)
  })

  test('removeNote does nothing if id is not found', async () => {
    const notes = [
      { id: 1, content: 'note 1' },
      { id: 2, content: 'note 2' },
      { id: 3, content: 'note 3' },
    ]
    saveDB.mockResolvedValue(notes)

    const idToRemove = 4
    const result = await removeNote(idToRemove)
    expect(result).toBeUndefined()
  })
})
