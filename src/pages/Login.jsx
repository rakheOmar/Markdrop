import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import axios from "@/lib/axios";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/users/login", data);
      console.log("Login Success:", res.data);
      setUser(res.data?.data?.user);
      toast.success("Logged in successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      const message = err?.response?.data?.message?.toString?.() || err?.message || "Login failed.";

      if (err?.response?.data?.errors?.length) {
        err.response.data.errors.forEach((e) => {
          toast.error(e?.message?.toString() || "Something went wrong.");
        });
      } else {
        toast.error(message);
      }

      console.error("Login Error:", message, err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      // Ensure Google Identity script is loaded
      const googleObj = window.google;
      if (!googleObj || !googleObj.accounts || !googleObj.accounts.id) {
        throw new Error("Google Identity script not loaded");
      }

      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        throw new Error("Missing VITE_GOOGLE_CLIENT_ID env var");
      }

      // If button already rendered, request a fresh credential via prompt
      const res = await new Promise((resolve, reject) => {
        try {
          googleObj.accounts.id.initialize({ client_id: clientId, callback: resolve });
          googleObj.accounts.id.prompt();
        } catch (err) {
          reject(err);
        }
      });

      const credential = res?.credential;
      if (!credential) throw new Error("Google credential not received");

      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.log(
          "[Google] credential length:",
          credential?.length,
          "baseURL:",
          axios.defaults.baseURL
        );
      }

      const apiRes = await axios.post("/users/oauth/google", { idToken: credential });
      setUser(apiRes.data?.data?.user);
      toast.success("Logged in with Google!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      const message =
        err?.response?.data?.message?.toString?.() || err?.message || "Google login failed.";
      toast.error(message);
      console.error("Google Login Error:", message, err);
    } finally {
      setGoogleLoading(false);
    }
  };

  // Render the official Google button into a container
  useEffect(() => {
    const googleObj = window.google;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!googleObj || !googleObj.accounts || !googleObj.accounts.id || !clientId) return;
    try {
      googleObj.accounts.id.initialize({
        client_id: clientId,
        callback: async (res) => {
          try {
            const credential = res?.credential;
            if (!credential) return;
            const apiRes = await axios.post("/users/oauth/google", { idToken: credential });
            setUser(apiRes.data?.data?.user);
            toast.success("Logged in with Google!");
            setTimeout(() => navigate("/"), 1000);
          } catch (err) {
            const message =
              err?.response?.data?.message?.toString?.() || err?.message || "Google login failed.";
            toast.error(message);
          }
        },
      });
      const container = document.getElementById("googleBtnContainer");
      if (container) {
        googleObj.accounts.id.renderButton(container, {
          theme: "outline",
          size: "large",
          width: 320,
          type: "standard",
          text: "continue_with",
          shape: "rectangular",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="max-w-sm w-full">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo className="h-9 w-9 text-primary" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight">Log in</CardTitle>
          <CardDescription>Welcome back! Please sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="w-full flex justify-center">
            <div
              id="googleBtnContainer"
              className="w-full flex justify-center"
              style={{ minHeight: 40 }}
            />
          </div>
          <Button
            className="w-full gap-3"
            variant="secondary"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
          >
            <GoogleLogo />
            {googleLoading ? "Connecting..." : "Use One Tap"}
          </Button>

          <div className="flex items-center justify-center overflow-hidden">
            <Separator className="flex-1" />
            <span className="text-sm px-2 text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Continue with Email
              </Button>
            </form>
          </Form>

          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="underline text-primary hover:text-primary/90">
              Sign Up!
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg
      width="1.2em"
      height="1.2em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block shrink-0 align-sub text-[inherit]"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M15.6823 8.18368C15.6823 7.63986 15.6382 7.0931 15.5442 6.55811H7.99829V9.63876H12.3194C12.1401 10.6323 11.564 11.5113 10.7203 12.0698V14.0687H13.2983C14.8122 12.6753 15.6823 10.6176 15.6823 8.18368Z"
          fill="#4285F4"
        />
        <path
          d="M7.99812 16C10.1558 16 11.9753 15.2915 13.3011 14.0687L10.7231 12.0698C10.0058 12.5578 9.07988 12.8341 8.00106 12.8341C5.91398 12.8341 4.14436 11.426 3.50942 9.53296H0.849121V11.5936C2.2072 14.295 4.97332 16 7.99812 16Z"
          fill="#34A853"
        />
        <path
          d="M3.50665 9.53295C3.17154 8.53938 3.17154 7.4635 3.50665 6.46993V4.4093H0.849292C-0.285376 6.66982 -0.285376 9.33306 0.849292 11.5936L3.50665 9.53295Z"
          fill="#FBBC04"
        />
        <path
          d="M7.99812 3.16589C9.13867 3.14825 10.241 3.57743 11.067 4.36523L13.3511 2.0812C11.9048 0.723121 9.98526 -0.0235266 7.99812 -1.02057e-05C4.97332 -1.02057e-05 2.2072 1.70493 0.849121 4.40932L3.50648 6.46995C4.13848 4.57394 5.91104 3.16589 7.99812 3.16589Z"
          fill="#EA4335"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="15.6825" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
