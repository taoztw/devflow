"use client";

import { AuthForm } from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/lib/validations";

function SignUpPage() {
  return (
    <div>
      Sign up
      <AuthForm
        formType="SIGN_IN"
        schema={SignUpSchema}
        defaultValues={{ email: "", password: "", username: "", name: "" }}
        onSubmit={(data) => Promise.resolve({ success: true, data })}
      />
    </div>
  );
}

export default SignUpPage;
