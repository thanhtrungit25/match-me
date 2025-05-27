import { Button } from "@heroui/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function SocialLogin() {
  const providers = [
    {
      name: "google",
      icon: <FcGoogle size={20} />,
      text: "Google",
    },
    {
      name: "github",
      icon: <FaGithub size={20} />,
      text: "GitHub",
    }
  ];

  const onClick = (provider: "google" | "github") => {
    console.log(`Sign in with ${provider}`);
    signIn(provider, {
      callbackUrl: "/members",
    });
  };

  return (
    <div className="flex items-center w-full gap-2">
      {providers.map((providers) => (
        <Button
          key={providers.name}
          fullWidth
          variant="bordered"
          onPress={() => onClick(providers.name as "google" | "github")}
        >
          {providers.icon}
        </Button>
      ))}
    </div>
  );
};