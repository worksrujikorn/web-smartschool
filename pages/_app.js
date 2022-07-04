import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { AppWrapper } from '../component/layout/State'
function MyApp({ Component, pageProps }) {
  return <AppWrapper><Component {...pageProps} /></AppWrapper> 
  

}

export default MyApp
