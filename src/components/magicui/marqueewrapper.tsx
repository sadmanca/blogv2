import { cn } from "@/lib/utils";
import { Marquee } from "./marquee";

const ReviewCard = ({
  name,
  body,
}: {
  name: string;
  body: string;
}) => {
  // Generate a random color
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;

  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 -mb-8",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex items-center gap-2 -mt-4 -mb-2">
        {/* Profile Circle */}
        <div
          className="rounded-full w-10 h-10 flex items-center justify-center"
          style={{ backgroundColor: randomColor }}
        >
          <span className="text-black font-bold text-sm">
            {name.charAt(0)}
          </span>
        </div>
        {/* Name and name */}
        <div className="flex flex-row justify-center">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">@{name}</p>
        </div>
      </div>
      {/* Review Body */}
      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{body}</p>
    </figure>
  );
};

export default function MarqueeWrapper({
  reviews,
}: {
  reviews: { name: string; body: string }[];
}) {
  const firstRow = reviews.slice(0, reviews.length / 4);
  const secondRow = reviews.slice(reviews.length / 4, 2 * reviews.length / 4);
  const thirdRow = reviews.slice(2 * reviews.length / 4, 3 * reviews.length / 4);
  const fourthRow = reviews.slice(3 * reviews.length / 4, 4 * reviews.length / 4);

  return (
    <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(15deg) rotateY(-7deg) rotateZ(15deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:40s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]" vertical>
          {secondRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]" vertical>
          {thirdRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:40s]" vertical>
          {fourthRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}