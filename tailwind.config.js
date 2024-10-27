/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontSize:'16px',
          fontWeight: '600',
        },
        '.alert-blue': {
          backgroundColor: '#cff4fc',
          color: '#055160',
          borderColor:'#b6effb',
        },
        '.alert-red': {
          backgroundColor: '#f8d7da',
          color: '#842029',
          borderColor:'#f5c2c7',
        },
        '.btn-red': {
          backgroundColor: '#dc3545',
          color: '#fff',
          borderColor:'#dc3545',
          '&:hover': {
            backgroundColor: '#bb2d3b'
          },
        },
        '.btn-green': {
          backgroundColor: '#198754',
          color: '#fff',
          borderColor:'#146c43',
          '&:hover': {
            backgroundColor: '#157347'
          },
        },
      })
    })
  ],
}

