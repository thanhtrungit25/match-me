"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { GiPadlock } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signInUser } from "@/app/actions/authActions";
import {
  loginSchema,  
  LoginSchema,
} from "@/lib/schemas/LoginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched'
  });

  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);
    if (result.status === "success") {
      router.push("/members");
      router.refresh();
    } else {
      toast.error(result.error as string);
    }
  }

  return (
    <Card className="w-3/5 mx-auto max-w-3xl">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-default">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">
              Login
            </h1>
          </div>
          <div className="text-neutral-500">
            Welcome back to MatchMe!
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Email"
              variant="bordered"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />
            <Input
              defaultValue=""
              label="Password"
              type="password"
              variant="bordered"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
            />
            <Button
              fullWidth
              color="default"
              type="submit"
              isDisabled={!isValid}
            >
              Login
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
