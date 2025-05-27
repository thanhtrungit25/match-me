import { auth, signOut } from "@/auth";
import { Button } from "@heroui/react";
import { GoSmiley } from "react-icons/go";

export default async function Home() {
  const session = await auth();

  return (
    <div className="p-5">
      <div className="text-3xl">Hello</div>
      
      <h3 className="text-2xl font-semibold">
        User session data:
      </h3>
      {session ? (
        <div>
          <pre>
            {JSON.stringify(session, null, 2)}
          </pre>  
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <Button
              type="submit"
              color="primary"
              variant="bordered"
              startContent={<GoSmiley />}
            >
              Sign out
            </Button>
          </form>
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
}
