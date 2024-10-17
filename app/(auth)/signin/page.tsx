import SignIn from '@/app/components/Signin'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SignInPage (){
    const session = await getServerSession()
    if(session){
        return redirect('/')
    }
    return (
        <SignIn/>
    )
}
