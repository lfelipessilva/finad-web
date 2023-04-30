import NextLink from 'next/link'
import Image from 'next/image'
import logo from '../../public/finad_logo.png'

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center max-w-7xl p-4 w-full">
      <NextLink href='/'>
        <Image
          alt="finad"
          src={logo}
          layout="fixed"
          width={128}
          height={40}
          style={{
            cursor: 'pointer'
          }}
        />
      </NextLink>
      <nav className="flex flex-row gap-4">
        <NextLink href="/">
          <button className="hover:underline">
            Home
          </button>
        </NextLink>
        <NextLink href="/about">
          <button className="hover:underline">
            Sobre
          </button>
        </NextLink>
        <NextLink href="/pricing">
          <button className="hover:underline">
            Preços
          </button>
        </NextLink>
        <NextLink href="/how">
          <button className="hover:underline">
            Como Usar
          </button>
        </NextLink>
      </nav>

      <NextLink href='/login'>
        <button className="rounded-xl bg-blue-500 p-3 text-2xl text-white bg-primary font-semibold hover:opacity-80 transition-all duration-200">ENTRAR</button>
      </NextLink>
    </div>
  )
}

export default Header