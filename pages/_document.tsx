import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Exo:wght@900&family=Neuton:wght@700&family=Quattrocento+Sans&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                var currentTheme;
                var themeStorageKey = 'siw-theme'

                function getTheme() {
                  if (typeof window === 'undefined') return 'light'
                  return localStorage.getItem(themeStorageKey) || 'light'
                }

                function setLightMode() {
                  document.documentElement.classList.remove('dark')
                }

                function setDarkMode() {
                  document.documentElement.classList.add('dark')
                }

                try {
                  currentTheme = getTheme();
                  if (currentTheme === 'light') {
                    setLightMode()
                  } else {
                    setDarkMode()
                  }
                } catch (err) {
                  console.log(new Error("Error occurred while setting theme"));
                }
              })();
            `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
