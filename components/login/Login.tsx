"use client";
import { useActionState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/user/login";

function Login() {
  const router = useRouter();
  const [formStatus, formAction, isPending] = useActionState(loginAction, {
    message: "",
    success: false,
    user: "",
  });

  if (formStatus.success) {
    router.push("/");
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6 w-[90%] md:w-100">
      <div className="w-full flex justify-center items-center">
        <Image
          src="/logo.jpg"
          alt="IRAI Automation logo"
          width={250}
          height={250}
          priority
        ></Image>
      </div>
      <div className="w-full flex justify-center">
        <h1 className="text-3xl font-bold text-center">
          Sign in to your account
        </h1>
      </div>
      <form
        action={formAction}
        className="w-full flex justify-center flex-col gap-8 mt-4"
      >
        <input
          className="h-12 rounded-md p-2 border-solid border-light border focus:outline-none focus:ring-1 focus:ring-primary"
          type="text"
          placeholder="Employee ID"
          name="username"
          defaultValue={formStatus?.user ?? ""}
          required
        ></input>
        <input
          className="h-12 rounded-md p-2 border-solid border-light border focus:outline-none focus:ring-1 focus:ring-primary"
          type="password"
          placeholder="Password"
          name="password"
          required
        ></input>
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary rounded-xl h-12 p-2 text-white font-bold -mt-2 cursor-pointer hover:bg-primary/90 transition-colors active:bg-primary/70 disabled:opacity-50"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
        {!formStatus.success && (
          <p className="text-red-500">{formStatus.message}</p>
        )}
      </form>
    </div>
  );
}

export default Login;
