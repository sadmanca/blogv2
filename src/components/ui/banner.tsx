import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ArrowRightIcon, Bell, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BannerProps {
  text: string; // The text to display in the banner
  link: string; // The URL the banner should link to
}

export default function Banner({ text, link }: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isViewportWideEnough, setIsViewportWideEnough] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // Check if the viewport width is greater than 768px (or any threshold you choose)
      setIsViewportWideEnough(window.innerWidth > 768);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Hide the banner if it's not visible or if the viewport is too small
  if (!isVisible || !isViewportWideEnough) return null;

  return (
    <div className="bg-foreground/80 text-background px-2 py-1 relative">
      <div className="flex items-center justify-center text-sm">
        <a 
          href={link} 
          className="flex items-center group"
        >
          <span className="relative flex items-center">
            <span className="h-1 w-1 bg-red-500 rounded-full animate-ping duration-2000"></span>
            <span className="h-1 w-1 bg-red-500 rounded-full absolute"></span>
          </span>
          <Bell
            className="ml-1 mr-1 shrink-0 opacity-60"
            size={16}
            aria-hidden="true"
          />
          <span>{text}</span>
          <ArrowRightIcon
            className="ml-2 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
        </a>
      </div>
      <Button
        variant="ghost"
        className="absolute top-1/2 right-6 -translate-y-1/2 group size-8 shrink-0 p-0 hover:bg-transparent hover:text-white hover:dark:text-black"
        onClick={() => setIsVisible(false)}
        aria-label="Close banner"
      >
        <XIcon
          size={16}
          className="opacity-60"
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}