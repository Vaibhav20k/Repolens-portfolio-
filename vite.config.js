import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'blog-route-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url) {
            const urlPath = req.url.split('?')[0]
            if (urlPath === '/blog' || urlPath === '/blog/') {
              req.url = '/blog/index.html'
              return next()
            }
            if (urlPath.startsWith('/blog/')) {
              const publicBasePath = path.resolve(__dirname, 'public')
              const requestedFile = path.join(publicBasePath, urlPath)

              if (!fs.existsSync(requestedFile)) {
                // If .html file exists, rewrite request
                if (fs.existsSync(`${requestedFile}.html`)) {
                  req.url = `${urlPath}.html`
                } else if (fs.existsSync(path.join(requestedFile, 'index.html'))) {
                  req.url = path.join(urlPath, 'index.html').replace(/\\/g, '/')
                }
              }
            }
          }
          next()
        })
      }
    }
  ],
  server: {
    port: 3000,
    open: true
  }
})
