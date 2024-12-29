"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const filters = [
  { name: "Newest", value: "newest" },
  { name: "Popular", value: "popular" },
  { name: "Unanswered", value: "unanswered" },
  { name: "Recommended", value: "recommended" },
];

function HomeFilter() {
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter") || "";
  const [active, setActive] = useState(filterParams);
  const router = useRouter();
  const handleTypeClick = (filter: string) => {
    let url: string;
    if (filter) {
      if (filter === active) {
        setActive("");
        url = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["filter"],
        });
      } else {
        setActive(filter);
        url = formUrlQuery({
          params: searchParams.toString(),
          key: "filter",
          value: filter.toLowerCase(),
        });
      }
    } else {
      setActive("");
      url = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    }
    router.push(url, { scroll: false });
  };
  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <Button
          key={filter.name}
          className={cn(
            "body-medium rounded-lg px-6 py-3 capitalize shadow-none",
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
          onClick={() => {
            handleTypeClick(filter.value);
          }}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}

export default HomeFilter;
