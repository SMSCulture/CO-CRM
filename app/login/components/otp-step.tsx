"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { showErrorToast, showSuccessToast } from "@/lib/toast-utils";
import { useAuthStore } from "@/store/auth-store";

interface OtpStepProps {
  email: string;
  onBack: () => void;
  onSuccess: () => void;
}

const OTP_EXPIRY_SECONDS = 10 * 60;
const RESEND_COOLDOWN_SECONDS = 60;

function maskEmail(email: string): string {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) return `${localPart[0]}***@${domain}`;
  return `${localPart.slice(0, 2)}***@${domain}`;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function OtpStep({ email, onBack, onSuccess }: OtpStepProps) {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [expiryTime, setExpiryTime] = useState(OTP_EXPIRY_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [hasVerifiedSuccessfully, setHasVerifiedSuccessfully] = useState(false);

  const { login } = useAuthStore();

  useEffect(() => {
    if (expiryTime <= 0) return;
    const timer = setInterval(() => setExpiryTime((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [expiryTime]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const verifyOtp = useCallback(
    async (code: string) => {
      if (code.length !== 6 || isVerifying || hasVerifiedSuccessfully) return;
      setIsVerifying(true);
      setError(null);

      try {
        const response = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, otp: code }),
        });

        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Invalid code. Please try again.");
          setIsVerifying(false);
          return;
        }

        setHasVerifiedSuccessfully(true);
        login(result.user);
        showSuccessToast("Signed in successfully");
        onSuccess();
      } catch {
        setError("An unexpected error occurred");
        setIsVerifying(false);
      }
    },
    [email, isVerifying, hasVerifiedSuccessfully, login, onSuccess]
  );

  useEffect(() => {
    if (otp.length === 6) verifyOtp(otp);
  }, [otp, verifyOtp]);

  async function handleResend() {
    setIsResending(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const result = await response.json();
        showErrorToast(result.error || "Failed to resend code");
      } else {
        showSuccessToast("A new code has been sent");
        setExpiryTime(OTP_EXPIRY_SECONDS);
        setResendCooldown(RESEND_COOLDOWN_SECONDS);
        setOtp("");
      }
    } catch {
      showErrorToast("An unexpected error occurred");
    }
    setIsResending(false);
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to <span className="font-medium text-foreground">{maskEmail(email)}</span>
        </p>
        {expiryTime > 0 ? (
          <p className="text-xs text-muted-foreground">Code expires in {formatTime(expiryTime)}</p>
        ) : (
          <p className="text-xs text-destructive">Code has expired — request a new one</p>
        )}
      </div>

      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={otp}
          onChange={setOtp}
          disabled={isVerifying || hasVerifiedSuccessfully}
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {error && <p className="text-sm text-destructive text-center">{error}</p>}
      {isVerifying && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Verifying...
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleResend}
        disabled={isResending || resendCooldown > 0}
      >
        {isResending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="mr-2 h-4 w-4" />
        )}
        {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code"}
      </Button>
    </div>
  );
}
