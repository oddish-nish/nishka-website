import fs from 'node:fs'
import path from 'node:path'

const FILES = {
  poems: 'src/data/poems.js',
  quotes: 'src/data/quotes.js',
  books: 'src/data/books.js',
  photos: 'src/data/photos.js',
  plants: 'src/data/plants.js',
  questions: 'src/data/questions.js',
  philosophies: 'src/data/philosophies.js',
  learning: 'src/data/learning.js',
  facts: 'src/data/facts.js',
  stories: 'src/data/stories.js',
}

const PHOTO_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

function send(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'))
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function safePhotoName(filename) {
  const ext = path.extname(filename || '').toLowerCase() || '.jpg'
  const base = path
    .basename(filename || 'photo', ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'photo'
  return { ext, base }
}

export function studioPlugin(root, password) {
  const photoDir = path.join(root, 'public/assets/photos')

  return {
    name: 'nishka-studio',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        const url = req.url?.split('?')[0]
        if (url !== '/api/studio' && url !== '/api/studio/photo') {
          next()
          return
        }

        try {
          const body = await readBody(req)
          if (body.password !== password) {
            send(res, 401, { ok: false })
            return
          }

          if (url === '/api/studio/photo') {
            const { ext, base } = safePhotoName(body.filename)
            if (!PHOTO_EXTS.has(ext) || typeof body.data !== 'string') {
              send(res, 400, { ok: false })
              return
            }
            fs.mkdirSync(photoDir, { recursive: true })
            const name = `${Date.now()}-${base}${ext}`
            fs.writeFileSync(path.join(photoDir, name), Buffer.from(body.data, 'base64'))
            send(res, 200, { ok: true, src: `/assets/photos/${name}` })
            return
          }

          const file = FILES[body.collection]
          if (!file || !Array.isArray(body.items)) {
            send(res, 400, { ok: false })
            return
          }
          const dest = path.join(root, file)
          fs.writeFileSync(dest, `export const ${body.collection} = ${JSON.stringify(body.items, null, 2)}\n`)
          send(res, 200, { ok: true })
        } catch (error) {
          send(res, 500, { ok: false, error: String(error) })
        }
      })
    },
  }
}
