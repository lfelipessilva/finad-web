import { useRouter } from 'next/router'
import NextLink from 'next/link'
import Image from 'next/image'
import { Gear, House, Lock, SignOut, Tray, User } from 'phosphor-react'
import logo from '../../public/finad_logo.png'
import cx from 'classnames'
import { useMutation } from 'react-query'
import AuthService from '../services/authService'
import { toast } from 'react-toastify'

export const Sidebar = ({ children }: any) => {
  const router = useRouter()

  if (!router.pathname.includes('/app')) {
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col top-0 left-0 w-64 bg-white h-fu border-r border-light-secondary">
        <div className="flex items-center justify-center h-14 border-b border-light-secondary">
          <Image
            alt="finad"
            src={logo}
            width={112}
            style={{
              cursor: 'pointer'
            }}
            onClick={() => router.push('/app')}
          />
        </div>
        <div className="overflow-y-auto overflow-x-scroll flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <SidebarDivider name='Menu' />
            <SidebarOption
              label='Dashboard'
              route='/app'
              icon={<House />}
            />
            <SidebarOption
              label='Inbox'
              route='/inbox'
              icon={<Tray />}
            />
            <SidebarDivider name='Configurações' />
            <SidebarOption
              label='Perfil'
              route='/profile'
              icon={<User />}
            />
            <SidebarOption
              label='Configurações'
              route='/config'
              icon={<Gear />}
              isBlocked
            />
            <SidebarDivider name='Sair' />
            <LogoutOption />
          </ul>
        </div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

interface SidebarOptionProps {
  route: string;
  label: string;
  icon: any;
  isBlocked?: boolean
}

const SidebarOption = ({ route, label, icon, isBlocked = false }: SidebarOptionProps) => {
  const router = useRouter()
  const isSelected = router.pathname === route

  const classes = cx(
    `relative flex flex-row items-center text-gray-600 border-l-4 p-2 border-transparent w-full gap-2 h-11 focus:outline-none `,
    !isBlocked && `hover:bg-gray-50 hover:text-gray-800 hover:border-primary pr-6`,
    isBlocked && `text-gray-300 hover:none pointer-events-none cursor-none`,
    isSelected && `bg-primary text-white`
  )

  return (
    <li>
      <NextLink
        href={route}
        className={classes}
      >
        <span className="inline-flex justify-center items-center">
          {icon}
        </span>
        <span className="text-sm tracking-wide truncate">{label}</span>
        {!!isBlocked && (
          <span className="inline-flex justify-center items-center">
            <Lock />
          </span>
        )}
      </NextLink>
    </li>
  )
}

const LogoutOption = () => {
  const router = useRouter()

  const logout = useMutation(
    async () => await AuthService.logout(),
    {
      onSuccess: () => {
        return router.replace('/')
      },
      onError: () => {
        toast.error('Ops! aconteceu algum problema no logout', {
          position: 'top-center',
        })
      },
    }
  );

  return (
    <li
      className='relative flex flex-row items-center text-gray-600 border-l-4 p-2 border-transparent w-full gap-2 h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 hover:border-primary pr-6 cursor-pointer'
      onClick={() => logout.mutate()}
    >
      <span className="inline-flex justify-center items-center">
        <SignOut />
      </span>
      <span className="text-sm tracking-wide truncate">Logout</span>
    </li>
  )
}

interface SidebarDividerProps {
  name: string;
}

const SidebarDivider = ({ name }: SidebarDividerProps) => {
  return (
    <li className="px-3">
      <div className="flex flex-row items-center h-8">
        <div className="text-sm font-light tracking-wide text-gray-500">{name}</div>
      </div>
    </li>
  )
}