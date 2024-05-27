import { Html, Head, Main, NextScript } from "next/document";
import { Provider } from "jotai";
export default function Document() {
  return (
    <Html lang="en">
      <Provider>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Provider>
    </Html>
  );
}
