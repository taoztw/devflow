"use client";
import { AuthForm } from "@/components/forms/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth.actions";
import { SignInSchema } from "@/lib/validations";

export const runtime = "edge";

function SignInPage() {
  return (
    <div>
      <AuthForm
        formType="SIGN_IN"
        schema={SignInSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={signInWithCredentials}
      />
    </div>
  );
}

export default SignInPage;
