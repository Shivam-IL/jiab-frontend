import Script from 'next/script'
import { GA_ID } from '@/config'

const LoadGAScript = () => {
  return (
    <>
      <Script
        async
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             
             gtag('config', '${GA_ID}');
          `
        }}
      />
    </>
  )
}

export default LoadGAScript
