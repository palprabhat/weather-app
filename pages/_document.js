import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="relative overflow-y-scroll h-screen">
          <Main />
          <div
            id="modal-root"
            className="fixed top-0 right-0 bottom-0 left-0"
            style={{ zIndex: "-1" }}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}
