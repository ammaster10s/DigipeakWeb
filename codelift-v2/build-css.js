import fs from 'fs'
import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'

async function build() {
  try {
    const css = fs.readFileSync('src/index.css', 'utf8')
    const result = await postcss([tailwindcss()]).process(css, { 
      from: 'src/index.css', 
      to: 'src/output.css' 
    })
    fs.writeFileSync('src/output.css', result.css)
    console.log('CSS built successfully')
  } catch (err) {
    console.error('Error building CSS:', err)
  }
}

build()
