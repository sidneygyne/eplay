import { createGlobalStyle } from 'styled-components'
import cores from './cores'

export const EstiloGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
    text-decoration: none;
  }

  body {
    background-color: ${cores.preta};
    color: ${cores.branca};
  }
`
