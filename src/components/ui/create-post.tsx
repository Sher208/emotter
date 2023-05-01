"use client";

import type { WithUserProp } from "@clerk/nextjs";
import type { FC } from "react";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/utils/api";

const CreatePost: FC<WithUserProp> = ({ user }) => {
  const [input, setInput] = useState("");
  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.post.getAll.invalidate();
    },
  });
  return (
    <div className="flex w-full gap-3">
      <Image
        width={40}
        height={40}
        src={user.profileImageUrl}
        alt="Profile Image"
        className="rounded-full"
        // placeholder="blur"
      />
      <input
        placeholder="Type your emojis!!"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => mutate({ content: input })}>POST</button>
    </div>
  );
};

export { CreatePost };
