"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { GiPadlock } from "react-icons/gi";
import { registerUser } from "@/app/actions/authActions";
import {
  registerSchema,  
  RegisterSchema,
} from "@/lib/schemas/RegisterSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleFormServerErrors } from "@/lib/util";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors, isSubmitting }
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched'
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);

    if (result.status === 'success') {
      console.log("User registered successfully");
    } else {
      handleFormServerErrors(result, setError);
    }
  }

  return (
    <Card className="w-3/5 mx-auto max-w-3xl">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-default">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">
              Register
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
              label="Name"
              variant="bordered"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message as string}
            />
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
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
