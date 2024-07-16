import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import Image from "next/image";
import CellAction from "@/app/(dashboard)/[storeId]/(routes)/websites/components/cell-action";

export const HoverEffect = ({
  items,
  className,
  storeId
}: {
  items: {
    name: string;
    price : string;
    images: {url : string}[];
    url : string;
    owner: string;
    ownerId: string;
    id: string;
    isFeatured: boolean;
  }[];
  className?: string;
  storeId : string | string[];
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 space-x-8  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={`/${storeId}/websites/${item?.id}/more`}
          key={item?.url}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>

         <div
          className={cn(
          "rounded-2xl col-span-1 h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
          className
         )}
        >
          <div className="relative z-40">
          <div className="p-4">
          <div className="w-full h-28">
          <Image src={item.images[0].url} alt={item.name} width={700} height={500} className="w-full h-full object-contain"/>
          </div>
          <div className="group-hover/bento:translate-x-2 text-sm transition duration-200 mt-6">
           {item.ownerId}
            <div className="font-sans font-bold text-neutral-600 text-lg dark:text-neutral-200 mb-2 mt-2">
              {item.name}
            </div>
            <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
              {item.url}
              <div>
                  <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                    <span>Price</span>
                    <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                      {item.price}
                    </span>
                  </button>
                </div>
            </div>
          </div>
          </div>
          </div>
          
        </div>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
