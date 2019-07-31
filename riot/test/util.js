import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const appCode = fs.readFileSync(path.join(__dirname, '../public/app.js'), { encoding: 'utf-8' })

export function app() {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Riot App</title>
      </head>
      <body>
        <div id="app"></div>
      </body>
    </html>
  `, { runScripts: 'dangerously' })

  const { document } = dom.window

  const script = document.createElement('script')
  script.textContent = appCode
  document.body.appendChild(script)

  return dom
}

