import { useMutation } from "react-query"
import AuthService from "../../services/authService"
import { useRouter } from "next/router"
import { toast } from 'react-toastify'

export default function Logout() {
  const router = useRouter()
  const logout = useMutation(
    async () => await AuthService.logout(),
    {
      onSuccess: (data) => {
        return router.replace('/')
      },
      onError: (error: any) => {
        toast.error('Ops! aconteceu algum problema no logout', {
          position: 'top-center',
        })
      },
    }
  );

  logout.mutate()

  return (
    <h1>teste</h1>
  )
}