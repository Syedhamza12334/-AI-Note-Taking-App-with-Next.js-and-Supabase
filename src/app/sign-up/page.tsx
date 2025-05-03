import AuthForm from "../Componets/Autoform";
import { Card, CardHeader, CardTitle } from "../Componets/card";


function SignupPage() {
  return (
    <div className="mt-20 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="mb-4">
          <CardTitle className="text-center text-3xl">Sign up</CardTitle>
        </CardHeader>

        <AuthForm type="signup" />
      </Card>
    </div>
  );
}

export default SignupPage;
