import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import { MdPlayCircleOutline } from 'react-icons/md';
import FavoriteButton from './FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';

interface IMovieListProps {
  title: string;
  data: Record<string, any>[];
}

const MovieList: React.FC<IMovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className='px-4 md:px-10 mt-4 pb-8'>
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold my-6">
          {title}
        </p>
        <div className='grid grid-cols-4 gap-6'>
          {data.map((movie) => (
            <div key={movie.id} className='flex flex-row items-center'>
              <MovieCard key={movie.id} data={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList


interface IMovieCardsProps {
  data: Record<string, any>;
}
const MovieCard: React.FC<IMovieCardsProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const redirectToWatch = useCallback(() => router.push(`/watch/${data.id}`), [router, data.id]);
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <Image
        onClick={redirectToWatch}
        src={data.thumbnailUrl}
        alt="Movie" draggable={false} className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        sm:group-hover:opacity-0
        delay-300
        w-full
        h-[12vw]
      "
        width={100}
        height={100}
      />
      <div className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100
      ">
        <Image
          onClick={redirectToWatch}
          src={data.thumbnailUrl} alt="Movie" draggable={false} className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-t-md
          w-full
          h-[12vw]
        "
          width={150}
          height={100}
        />
        <div className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
          ">
          <div className="flex flex-row items-center gap-3">
            <div onClick={redirectToWatch} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
              <MdPlayCircleOutline className="text-black w-4 lg:w-6" />
            </div>
            <FavoriteButton movieId={data.id} />
            <div
              onClick={() => openModal(data?.id)}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
              <IoChevronDownCircleOutline className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
            <p>{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  )
}