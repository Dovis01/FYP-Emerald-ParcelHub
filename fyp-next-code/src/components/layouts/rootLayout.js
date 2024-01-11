import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}) {
    return (
        <>
            <header>
            </header>
            <main className={inter.className}>{children}</main>
            <footer>
            </footer>
        </>
    )
}
