import Head from 'next/head'
import NextLink from 'next/link'
import Image from 'next/image'
import readingWomen from '../../public/reading_women.png'
import Header from '../components/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>Finad | Home</title>
      </Head>
      <div className="flex flex-col w-full justify-start items-center bg-bubbles bg-cover h-screen p-4">
        <Header />
        <main className="flex flex-col md:flex-row w-full max-w-7xl justify-between items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-semibold font-sans">
              Se organize<br />
              Como<br />
              Em Nenhum<br />
              Outro Lugar
            </h1>
            <p className="text-base">
              Sua vida financeira organizada<br />
              de maneira completa, em 1<br />
              só lugar.
            </p>
            <div className="flex flex-row gap-4">
              <NextLink href='/login'>
                <button className="rounded-xl bg-blue-500 p-3 text-2xl text-white bg-primary font-semibold hover:opacity-80 transition-all duration-200">ENTRAR</button>
              </NextLink>
              <NextLink href='/register'>
                <button className="rounded-xl bg-blue-500 p-3 text-2xl text-white bg-secondary font-semibold hover:opacity-80 transition-all duration-200">CADASTRAR</button>
              </NextLink>
            </div>
          </div>

          <div>
            <Image
              src={readingWomen}
              alt="reading women"
              width={700}
              height={634}
            />
          </div>
        </main>
      </div>
    </>
  )
}
