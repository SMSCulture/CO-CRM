"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Turnstile } from "@/components/ui/turnstile";
import { otpRequestSchema, type OtpRequestFormData } from "@/lib/validations/auth";
import { showErrorToast } from "@/lib/toast-utils";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

interface EmailStepProps {
  onSuccess: (email: string) => void;
}

export function EmailStep({ onSuccess }: EmailStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const form = useForm<OtpRequestFormData>({
    resolver: zodResolver(otpRequestSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: OtpRequestFormData) {
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      showErrorToast("Please complete the verification check.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          "cf-turnstile-response": turnstileToken ?? "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        showErrorToast(result.error || "Failed to send verification code");
        setIsLoading(false);
        return;
      }

      onSuccess(data.email);
    } catch {
      showErrorToast("An unexpected error occurred");
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@cultureowl.com"
                    className="pl-10 h-11"
                    {...field}
                    disabled={isLoading}
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {TURNSTILE_SITE_KEY && (
          <Turnstile
            siteKey={TURNSTILE_SITE_KEY}
            onVerify={(token) => setTurnstileToken(token)}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
          />
        )}

        <p className="text-xs text-muted-foreground text-center">We&apos;ll send you a 6-digit verification code</p>

        <Button
          type="submit"
          className="w-full h-11"
          disabled={isLoading || (Boolean(TURNSTILE_SITE_KEY) && !turnstileToken)}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending code...
            </>
          ) : (
            "Continue with Email"
          )}
        </Button>
      </form>
    </Form>
  );
}
