import { createGlobalStyle } from 'styled-components'
import colors from './colors'

export const breakpoints = {
  desktop: '1024px',
  tablet: '768px'
}
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
    background-color: ${colors.black};
    color: ${colors.white};
    padding-top: 40px;
  }

  .container {
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.desktop} ) {
    max-width: 80%;
  }
  }
`
