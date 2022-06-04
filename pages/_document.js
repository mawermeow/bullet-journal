import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render() {
        return <Html lang='zh-Hant-TW'>
            <Head />
            <body>
            <Main/>
            <NextScript/>
            <div id="notifications"/>
            </body>
        </Html>
    }
}

export default MyDocument;