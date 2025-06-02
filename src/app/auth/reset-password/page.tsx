"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

function ResetPasswordPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenValid, setTokenValid] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<ResetPasswordFormData>();
  
  const password = watch("password", "");

  // Verify token when component mounts
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("No reset token provided");
        setIsVerifying(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/auth/reset-password?token=${token}`);
        const data = await response.json();
        
        if (data.valid) {
          setTokenValid(true);
        } else {
          setError(data.error || "Invalid or expired token");
        }
      } catch (err) {
        setError("Failed to verify token");
        console.error(err);
      } finally {
        setIsVerifying(false);
      }
    };
    
    verifyToken();
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/auth/reset-password/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to reset password");
      }
      
      setResetSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state
  if (isVerifying) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-[#2C2E3A] mb-6">Reset Your Password</h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#5A31F4]"></div>
          </div>
          <p className="mt-4 text-gray-600">Verifying your reset token...</p>
        </div>
      </div>
    );
  }

  // Show success message
  if (resetSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-[#2C2E3A] mb-6">Password Reset Successful</h1>
          <div className="mb-6 text-green-600">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-600 mb-6">Your password has been reset successfully.</p>
          <Link 
            href="/auth/signin" 
            className="inline-block px-4 py-2 bg-[#5A31F4] hover:bg-[#4A21E4] text-white rounded-md transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center text-[#2C2E3A] mb-6">Reset Your Password</h1>
        
        {!tokenValid ? (
          <div className="text-center">
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
              <p>{error || "Invalid or expired token"}</p>
              <p className="mt-2">Please request a new password reset link.</p>
            </div>
            <Link href="/auth/forgot-password" className="inline-block mt-4 text-[#5A31F4] hover:underline">
              Request New Reset Link
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A31F4]"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A31F4]"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-[#5A31F4] hover:bg-[#4A21E4] text-white rounded-md transition focus:outline-none focus:ring-2 focus:ring-[#5A31F4] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
              
              <div className="text-center mt-4">
                <Link href="/auth/signin" className="text-[#5A31F4] hover:underline">
                  Back to Sign In
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto p-8 text-center">Loading...</div>}>
      <ResetPasswordPageContent />
    </Suspense>
  );
} 