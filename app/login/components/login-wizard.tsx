"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmailStep } from "./email-step";
import { OtpStep } from "./otp-step";

export function LoginWizard() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");

  return (
    <div className="w-full max-w-[400px]">
      {step === "email" ? (
        <EmailStep
          onSuccess={(submittedEmail) => {
            setEmail(submittedEmail);
            setStep("otp");
          }}
        />
      ) : (
        <OtpStep email={email} onBack={() => setStep("email")} onSuccess={() => router.push("/dashboard")} />
      )}
    </div>
  );
}
