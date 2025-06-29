import React, { useEffect, useState } from "react";
import AktivGroteskText from "../common/AktivGroteskText";
import { PENDING } from "@/constants";
import UserGeneratedJokeCard from "../common/UserGeneratedJokeCard";
import { useRouter } from "next/navigation";
import useAppDispatch from "@/hooks/useDispatch";
import { useGetUserSubmittedJokes } from "@/api/hooks/JokeHooks";
import {
  IUserSubmittedJoke,
  updateUserSubmittedJokes,
} from "@/store/profile/profile.slice";
import { dateConvert } from "@/utils";
import GreenCTA from "../GreenCTA";

const UserGeneratedJokecComponent = ({
  myJokeText,
  hallOfLameText,
}: {
  myJokeText: string;
  hallOfLameText: string;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [currentItems, setCurrentItems] = useState<number>(4);
  const [allJokes, setAllJokes] = useState<IUserSubmittedJoke[]>([]);
  const [currentJokes, setCurrentJokes] = useState<IUserSubmittedJoke[]>([]);

  const { data: userSubmittedJokesData } = useGetUserSubmittedJokes();

  useEffect(() => {
    if (userSubmittedJokesData?.ok) {
      const { data } = userSubmittedJokesData ?? {};
      dispatch(updateUserSubmittedJokes({ userSubmittedJokes: data ?? [] }));
      setAllJokes(data ?? []);
    }
  }, [userSubmittedJokesData, dispatch]);

  useEffect(() => {
    if (allJokes?.length > 0) {
      setCurrentJokes(allJokes.slice(0, currentItems));
    }
  }, [allJokes, currentItems]);

  const isAllShown = currentItems >= allJokes.length;

  if (currentJokes?.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[16px] md:gap-[32px]">
      <div className="relative flex justify-between items-center">
        <AktivGroteskText
          text={myJokeText}
          fontSize="text-[16px] md:text-[28px]"
          fontWeight="font-[700] uppercase"
        />
        <button
          className="bg-transparent border-none outline-none"
          onClick={() => router.push("/hall-of-lame")}
        >
          <AktivGroteskText
            className="text-[#11A64B]"
            fontSize="text-[12px] md:text-[24px]"
            fontWeight="font-[700]"
            text={hallOfLameText}
          />
        </button>
      </div>
      <div className="md:hidden relative flex flex-col  gap-[12px] md:gap-[20px]">
        {currentJokes?.length > 0 &&
          currentJokes?.map((joke: IUserSubmittedJoke) => (
            <UserGeneratedJokeCard
              key={joke.id}
              title={joke.title ?? ""}
              date={dateConvert(joke.date ?? "") ?? ""}
              status={joke.status ?? PENDING}
              image={joke.thumbnail_url ?? ""}
            />
          ))}
      </div>
      <div className="relative hidden md:grid md:grid-cols-2 md:gap-[20px]">
        {currentJokes?.length > 0 &&
          currentJokes?.map((joke: IUserSubmittedJoke) => (
            <UserGeneratedJokeCard
              key={joke.id}
              title={joke.title ?? ""}
              date={dateConvert(joke.date ?? "") ?? ""}
              status={joke.status ?? PENDING}
              image={joke.thumbnail_url ?? ""}
            />
          ))}
      </div>
      <div className="flex justify-center">
        {allJokes.length > 4 && (
          <GreenCTA
            className=""
            text={isAllShown ? "Show Less" : "Show More"}
            onClick={() => {
              if (isAllShown) {
                setCurrentItems(4);
              } else {
                setCurrentItems((prev) => Math.min(prev + 4, allJokes.length));
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UserGeneratedJokecComponent;
