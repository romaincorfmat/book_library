"use client";
import React from "react";

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validation";

const SignUpPage = () => {
  return (
    <div>
      <AuthForm
        type="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{
          email: "",
          password: "",
          fullName: "",
          universityId: 0,
          universityCard: "",
        }}
      />
    </div>
  );
};

export default SignUpPage;
