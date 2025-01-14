"use client";

import { AuthForm } from "@/components/forms/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/actions";
import { SignUpSchema } from "@/lib/validations";

function SignUpPage() {
  return (
    <div>
      Sign up
      <AuthForm
        formType="SIGN_IN"
        schema={SignUpSchema}
        defaultValues={{ email: "", password: "", username: "", name: "" }}
        onSubmit={signUpWithCredentials}
      />
    </div>
  );
}

export default SignUpPage;
