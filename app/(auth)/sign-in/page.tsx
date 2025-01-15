"use client";
import React from "react";

import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validation";

const SignInPage = () => {
  return (
    <div>
      <AuthForm
        type="SIGN_IN"
        schema={signInSchema}
        defaultValues={{
          email: "",
          password: "",
        }}
      />
    </div>
  );
};

export default SignInPage;
