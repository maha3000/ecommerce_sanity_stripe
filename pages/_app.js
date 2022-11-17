import { Router } from 'next/router'
import { Toaster } from 'react-hot-toast'
import { Layout, Loader } from '../components'
import { StateContext } from '../context/StateContext'
import '../styles/globals.css'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true)
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false)
  });
  if(Component.getLayout){
    return(Component.getLayout(<Component {...pageProps} />))
  }
  return (
    <StateContext>
      <Layout>
        <Toaster/>
        {loading ? <Loader/> : <Component {...pageProps} />}
      </Layout>
    </StateContext> 
  )
  
}

export default MyApp
