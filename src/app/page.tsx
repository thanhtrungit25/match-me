import { auth } from "@/auth";
import { Button } from "@heroui/react";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-6">
      <h1 className="text-4xl font-bold">Welcome to MatchMe App</h1>
      {session ? (
        <Button
          as={Link}
          href="/members"
          size="lg"
          color="default"
          variant="bordered"
        >
          Continue
        </Button>
      ) : (
        <div className="flex flex-row gap-4">
          <Button
            as={Link}
            href="/login"
            size="lg"
            color="default"
            variant="bordered"
          >
            Login
          </Button>
          <Button
            as={Link}
            href="/register"
            size="lg"
            color="default"
            variant="bordered"
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
}
