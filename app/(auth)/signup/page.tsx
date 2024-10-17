import { redirect } from "next/navigation";
import SignUp from "../../components/Signup";
import { getServerSession } from "next-auth";

export default async function SignUpPage() {
  const session = await getServerSession()
    if(session){
        return redirect('/')
    }
  return (
    <div>
      <SignUp />
    </div>
  );
}
