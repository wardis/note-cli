import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command(
    'new <note>',
    'Create a new note',
    (yargs) => {
      return yargs.positional('note', {
        type: 'string',
        describe: 'The content of the note to create',
      })
    },
    (argv) => {
      console.info(argv.note)
    }
  )
  .demandCommand(1)
  .parse()
