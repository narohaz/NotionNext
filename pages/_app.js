// import '@/styles/animate.css' // @see https://animate.style/
import '@/styles/globals.css'
import '@/styles/utility-patterns.css'

// core styles shared by all of react-notion-x (required)
import '@/styles/notion.css' //  重写部分notion样式
import 'react-notion-x/src/styles.css' // 原版的react-notion-x

import useAdjustStyle from '@/hooks/useAdjustStyle'
import { GlobalContextProvider } from '@/lib/global'
import { getGlobalLayoutByTheme } from '@/themes/theme'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { getQueryParam } from '../lib/utils'

import Script from "next/script";

// 各种扩展插件 这个要阻塞引入
import BLOG from '@/blog.config'
import ExternalPlugins from '@/components/ExternalPlugins'
import GlobalHead from '@/components/GlobalHead'

/**
 * App挂载DOM 入口文件
 * @param {*} param0
 * @returns
 */
const MyApp = ({ Component, pageProps }) => {
  // 一些可能出现 bug 的样式，可以统一放入该钩子进行调整
  useAdjustStyle()

  const route = useRouter()
  const queryParam = useMemo(() => {
    return (
      getQueryParam(route.asPath, 'theme') ||
      pageProps?.NOTION_CONFIG?.THEME ||
      BLOG.THEME
    )
  }, [route])

  // 整体布局
  const GLayout = useCallback(
    props => {
      // 根据页面路径加载不同Layout文件
      const Layout = getGlobalLayoutByTheme(queryParam)
      return <Layout {...props} />
    },
    [queryParam]
  )

  return (
    <div>
      {/* <script src="https://cdn.jsdelivr.net/npm/greensock@1.20.2/dist/TweenLite.js"></script>
      <script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/pixi.js@5.3.6/dist/pixi.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/pixi-live2d-display@0.3.1/dist/cubism4.min.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/journey-ad/blog-img@76ba2b3/live2d/lib/pio.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/journey-ad/blog-img@76ba2b3/live2d/lib/pio_sdk4.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/journey-ad/blog-img@76ba2b3/live2d/lib/load.js"></script>
      <link href="https://cdn.jsdelivr.net/gh/journey-ad/blog-img@76ba2b3/live2d/lib/pio.css" rel="stylesheet" type="text/css"/> */}
      <Script type="text/javascript" src="/jiaran/TweenLite.js"></Script>
      <Script type="text/javascript" src="/jiaran/live2dcubismcore.min.js"></Script>
      <Script type="text/javascript" src="/jiaran/pixi.min.js"></Script>
      <Script type="text/javascript" src="/jiaran/cubism4.min.js"></Script>
      <Script type="text/javascript" src="/jiaran/pio.js"></Script>
      <Script type="text/javascript" src="/jiaran/pio_sdk4.js"></Script>
      <Script type="text/javascript" src="/jiaran/load.js"></Script>
      <link href="jiaran/pio.css" rel="stylesheet" type="text/css"/>
    <GlobalContextProvider {...pageProps}>
      <GLayout {...pageProps}>
        <GlobalHead {...pageProps} />
        <Component {...pageProps} />
      </GLayout>
      <ExternalPlugins {...pageProps} />
    </GlobalContextProvider>
    </div>
  )
}

export default MyApp
