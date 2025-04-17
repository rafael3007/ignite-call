import { globalCss } from '@ignite-ui/react'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    // textDecoration: 'none',
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
    fontFamily: 'Roboto, sans-serif',
  },

  'body, input, textarea, button': {
    fontWeight: 400,
    fontSize: '1rem',
  },
})
