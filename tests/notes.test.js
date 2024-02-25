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
  it('newNote inserts data and returns it', async () => {
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
})
