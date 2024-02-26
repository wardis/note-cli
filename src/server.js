import http from 'node:http'
import fs from 'node:fs/promises'
import open from 'open'

export const interpolate = (html, data) => {
  // {{ notes }} => data.notes
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, placeholder) => {
    return data[placeholder] || ''
  })
}

export const formatNotes = (notes) =>
  notes
    .map(
      (note) => `<div class="note">
        <p>${note.content}</p>
        <div class="tags">
          ${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>`
    )
    .join('')

export const createServer = (notes) =>
  http.createServer(async (req, res) => {
    const HTML_PATH = new URL('./template.html', import.meta.url).pathname
    const template = await fs.readFile(HTML_PATH, 'utf-8')
    const html = interpolate(template, { notes: formatNotes(notes) })

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html)
  })

export const start = (notes, port) => {
  const server = createServer(notes)
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
  open(`http://localhost:${port}`)
}
