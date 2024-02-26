import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import {
  findNotes,
  getAllNotes,
  newNote,
  removeAllNotes,
  removeNote,
} from './notes.js'
import { start } from './server.js'

const listNotes = (notes) => {
  notes.forEach(({ id, tags, content }) => {
    console.log('id: ', id)
    console.log('tags: ', tags)
    console.log('content: ', content)
    console.log('\n')
  })
}

yargs(hideBin(process.argv))
  .command(
    ['new <note>', 'add'],
    'Create a new note.',
    (yargs) =>
      yargs.positional('note', {
        type: 'string',
        describe: 'The content of the note to create',
      }),
    async (argv) => {
      const tags = argv.tags
        ? argv.tags.split(',').map((tag) => tag.trim())
        : []
      const note = await newNote(argv.note, tags)
      console.log('New note: ', note)
    }
  )
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note',
  })
  .command(
    'all',
    'Get all notes.',
    () => {},
    async () => {
      const notes = await getAllNotes()
      listNotes(notes)
    }
  )
  .command(
    'find <filter>',
    'Get matching notes.',
    (yargs) =>
      yargs.positional('filter', {
        describe:
          'The search term to filter notes by, will be applided to note.content',
        type: 'string',
      }),
    async (argv) => {
      listNotes(await findNotes(argv.filter))
    }
  )
  .command(
    ['remove <id>', 'delete'],
    'Remove a note by id.',
    (yargs) =>
      yargs.positional('id', {
        type: 'number',
        describe: 'The id of the note to remove',
      }),
    async (argv) => {
      console.log(await removeNote(argv.id))
    }
  )
  .command(
    'web [port]',
    'See notes on the browser.',
    (yargs) =>
      yargs.positional('port', {
        describe: 'port to bind on',
        default: 5000,
        type: 'number',
      }),
    async (argv) => {
      const notes = await getAllNotes()
      start(notes, argv.port)
    }
  )
  .command(
    'clean',
    'Remove all notes.',
    () => {},
    async (argv) => {
      await removeAllNotes()
      console.log('DB is reset.')
    }
  )
  .demandCommand(1)
  .parse()
