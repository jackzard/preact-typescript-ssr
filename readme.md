# Preact Typescript SSR Boilerplate

Super Minimalist starter preact typescript SSR, support lazy load routing and serve extremly fast by turbo-http, some plugin is manually modified.

 - Typescript
 - Sass/scss
 - SSR
 - Rxjs
 - Axios
 - Redux
 - HMR
 - Webpack Dev Server
 - Transfer State between Server & Browser (No Multiple Ajax)
 
 
 Modified Plugin :
 - preact-redux (Fix types on typescript)
 - preact-render-to-string (set render to string as async function & wait componentWillMount)

### Development
    yarn start
Open localhost:4200

### SSR Development

Open 2 Terminal

    yarn watch:server    

    cd dist && node server.js
    
## Build Production

    yarn build    
