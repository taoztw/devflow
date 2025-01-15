import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  className?: string;
}

const UserAvatar = ({ id, name, imageUrl, className = "size-9" }: Props) => {
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={cn(className)}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={36}
            height={36}
            quality={100}
            className="object-cover"
          />
        ) : (
          <AvatarFallback className="primary-gradient font-bold tracking-wider text-white">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
