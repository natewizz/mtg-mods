"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState({ google: false, discord: false });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      // @ts-ignore
      if (session.user?.needsUsernameSetup) {
        router.push("/auth/setup-username");
      } else {
        router.push("/");
      }
    }
  }, [session, status, router]);

  const handleSignIn = async (provider: "google" | "discord") => {
    try {
      setIsLoading({ ...isLoading, [provider]: true });
      setError(null);
      await signIn(provider, { callbackUrl: "/" });
    } catch (signInError) {
      console.error(`${provider} Sign-In Error:`, signInError);
      setError(`An error occurred during sign in. Please try again.`);
    } finally {
      setIsLoading({ ...isLoading, [provider]: false });
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {error && (
        <div className="text-red-500 text-sm text-center mb-4">
          {error}
        </div>
      )}
      <button
        onClick={() => handleSignIn("google")}
        disabled={isLoading.google}
        className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--primary)] hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] ${
          isLoading.google ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-white"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path
              d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
              fill="#4285F4"
            />
            <path
              d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
              fill="#34A853"
              clipPath="url(#b)"
              transform="translate(0 6)"
            />
            <path
              d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
              fill="#FBBC05"
              clipPath="url(#c)"
              transform="translate(0 6)"
            />
            <path
              d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
              fill="#EA4335"
              clipPath="url(#d)"
              transform="translate(0 6)"
            />
          </svg>
        </span>
        {isLoading.google ? "Signing in..." : "Sign in with Google"}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <button
        onClick={() => handleSignIn("discord")}
        disabled={isLoading.discord}
        className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#5865F2] hover:bg-[#4752C4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5865F2] ${
          isLoading.discord ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-white"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4464.8257-.618 1.328-1.554.062-3.109.062-4.663 0a13.3414 13.3414 0 00-.618-1.328.0741.0741 0 00-.0785-.0371A19.7913 19.7913 0 003.683 4.3698a.0741.0741 0 00-.0371.0785c.1603.9315.4223 1.834.7853 2.6829a17.292 17.292 0 00-1.8975 3.1417.0741.0741 0 00.016.096c.3512.235.7024.4533 1.0536.654a.0741.0741 0 00.0866-.0211c.3341-.2936.6342-.6212.9132-.9728a13.0642 13.0642 0 00-1.554 2.2215.0741.0741 0 00.0371.093c.477.1983.975.3625 1.494.492a.0741.0741 0 00.096-.062c.0371-.235.062-.477.0866-.719a12.2902 12.2902 0 004.663 0c.0246.242.0492.484.0866.719a.0741.0741 0 00.096.062c.519-.1295.996-.2936 1.494-.492a.0741.0741 0 00.0371-.093 13.0642 13.0642 0 00-1.554-2.2215c.279.3516.579.6792.9132.9728a.0741.0741 0 00.0866.0211c.3512-.2008.7024-.4182 1.0536-.654a.0741.0741 0 00.016-.096 17.292 17.292 0 00-1.8975-3.1417c.363-.8488.625-1.7514.7853-2.6829a.0741.0741 0 00-.0371-.0785zM8.02 15.3312c-.8257 0-1.494-1.401-1.494-3.109s.6683-3.109 1.494-3.109c.8488 0 1.5152 1.401 1.494 3.109s-.6454 3.109-1.494 3.109zm7.96 0c-.8257 0-1.494-1.401-1.494-3.109s.6683-3.109 1.494-3.109c.8488 0 1.5152 1.401 1.494 3.109s-.6454 3.109-1.494 3.109z" />
          </svg>
        </span>
        {isLoading.discord ? "Signing in..." : "Sign in with Discord"}
      </button>
    </div>
  );
} 