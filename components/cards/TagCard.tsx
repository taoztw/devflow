import Image from "next/image";
import Link from "next/link";

import ROUTES from "@/constants/routes";
import { getDeviconClassName } from "@/lib/utils";

import { Badge } from "../ui/badge";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

function TagCard({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: Props) {
  const iconClass = getDeviconClassName(name);

  const content = (
    <>
      {" "}
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 flex flex-row gap-2 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={`${iconClass} text-sm`}></i>
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            src="/icons/close.svg"
            width={12}
            height={12}
            alt="close icon"
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
          />
        )}
      </Badge>
    </>
  );

  if (compact) {
    return isButton ? (
      <button className="flex justify-between gap-2">{content}</button>
    ) : (
      <Link href={ROUTES.TAG(_id)} className="flex justify-between gap-2">
        {content}

        {showCount && (
          <p className="small-medium text-dark500_light700">{questions}</p>
        )}
      </Link>
    );
  }

  return (
    <Link href={ROUTES.TAG(_id)} className="flex justify-between gap-2">
      {content}

      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </Link>
  );
}

export default TagCard;
