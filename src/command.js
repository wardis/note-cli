import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import {
  findNotes,
  getAllNotes,
  newNote,
  removeAllNotes,
  removeNote,
} from './notes.js'

yargs(hideBin(process.argv))
  .command(
    'new <note>',
    'Create a new note.',
    (yargs) =>
      yargs.positional('note', {
        type: 'string',
        describe: 'The content of the note to create',
      }),
    async (argv) => {
      console.info(await newNote(argv.note))
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
    async (argv) => {
      console.log(await getAllNotes())
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
      console.log(await findNotes(argv.filter))
    }
  )
  .command(
    'remove <id>',
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
    async (argv) => {}
  )
  .command(
    'clean',
    'Remove all notes.',
    () => {},
    (argv) => {
      removeAllNotes()
    }
  )
  .demandCommand(1)
  .parse()
