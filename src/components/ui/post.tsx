"use client";

import Image from "next/image";
import type { FC } from "react";
import type { RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export type WithPostProp = RouterOutputs["post"]["getAll"][number];

const Post: FC<WithPostProp> = (props) => {
  const { author, post } = props;
  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-400 p-6">
      <Image
        width={50}
        height={50}
        src={author.profileImageUrl}
        alt="Profile Image"
        className="rounded-full"
        // placeholder="blur"
      />
      <div className={"flex flex-col"}>
        <div className="flex gap-2 text-slate-200">
          <span className="font-bold">{`@${author.username}`}</span>
          <span className="font-bold">&middot;</span>
          <span className="text-slate-300">
            {dayjs(post.createdAt).fromNow()}
          </span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

export { Post };
