import Document, {Head, Html, Main, NextScript} from 'next/document';

const Favicon = () => (
    <>
        <link
            rel="icon"
            href="/Emeral-ParcelHub-Logo2.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/Emeral-ParcelHub-Logo2.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/Emeral-ParcelHub-Logo2.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="64x64"
            href="/Emeral-ParcelHub-Logo2.png"
        />
    </>
);
const Fonts = () => (
    <>
        <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
        />
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
        />
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        />
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap"
        />
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&display=swap"
        />
    </>
);

class CustomDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <Fonts/>
                    <Favicon/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
