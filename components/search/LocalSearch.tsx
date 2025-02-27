"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

import { Input } from "../ui/input";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
  position?: "left" | "right";
}

function LocalSearch({
  route,
  imgSrc,
  placeholder,
  otherClasses,
  position = "left",
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const deplayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(deplayDebounceFn);
  }, [searchQuery, router, route, searchParams, pathname]);
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {position === "left" && (
        <label htmlFor="search">
          <Image
            src={imgSrc}
            width={24}
            height={24}
            alt="search"
            className="cursor-pointer"
          />
        </label>
      )}

      <Input
        id="search"
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="no-focus paragraph-regular placeholder text-dark400_light700 border-none shadow-none outline-none"
      />

      {position === "right" && (
        <label htmlFor="search">
          <Image
            src={imgSrc}
            width={24}
            height={24}
            alt="search"
            className="cursor-pointer"
          />
        </label>
      )}
    </div>
  );
}

export default LocalSearch;
