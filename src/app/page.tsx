import { Button, Link } from "@heroui/react";
import { GoSmiley } from "react-icons/go";

export default function Home() {
  return (
    <div>
      <div className="text-3xl">Hello</div>
      <Button
        as={Link}
        href="/members"
        color="primary"
        variant="bordered"
        startContent={<GoSmiley />}
      >
        Click me
      </Button>
    </div>
  );
}
