// pages/_app.js
import "../style.css";
// import ExtraContext from './extra'

function MyApp({Component, pageProps}) {
  return (
//   <ExtraContext>
      <Component {...pageProps} />
//   </ExtraContext>
//   <Component {...pageProps} />
  );
}

export default MyApp;