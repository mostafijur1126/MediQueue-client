"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
//Minu1126@#

const LoginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signUp.email({
      name: userData.name, // required
      email: userData.email, // required
      password: userData.password, // required
      image: userData.image,
      // callbackURL: "https://example.com/callback",
    });
    console.log(data, error);
    if (data) {
      toast.success("registation successfully");
      redirect("/login");
    }
    if (error) {
      toast.error("error.message");
    }
  };
  const handelGoogleSingIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="max-w-7xl mx-auto my-20">
      <Card>
        <h1 className="text-2xl">Registation</h1>
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>
          <TextField isRequired name="image">
            <Label>Photo URL</Label>
            <Input placeholder="Enter your photo url" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="w-full">
            <Button type="submit" className="w-full">
              <Check />
              Register
            </Button>
          </div>
        </Form>
        <p className="text-center">or</p>
        <Button
          onClick={handelGoogleSingIn}
          className="w-full"
          variant="outline"
        >
          <FcGoogle />
        </Button>
        <Link href="login" className="cursor-pointer text-blue-500">
          have your accout?
        </Link>
      </Card>
    </div>
  );
};

export default LoginPage;
