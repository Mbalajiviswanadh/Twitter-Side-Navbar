"use client";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";

//icons
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import {
  BiMessageSquareDetail,
  BiSolidMessageSquareDetail,
} from "react-icons/bi";
import { PiNotepad, PiNotepadFill } from "react-icons/pi";
import { HiOutlineUsers, HiUsers } from "react-icons/hi2";
import { FaRegUser, FaUser } from "react-icons/fa";
import Fotter from "./fotter";

//icons array
interface SideNavItemsTypes {
  icon?: {
    icon: React.ReactNode;
    fillicon: React.ReactNode;
  };
  label: string;
  href: string;
}
const sidenavbaritems: SideNavItemsTypes[] = [
  {
    href: "/",
    label: "Home",
    icon: {
      icon: <GoHome />,
      fillicon: <GoHomeFill />,
    },
  },
  {
    href: "/explore",
    label: "Explore",
    icon: {
      icon: <MdOutlineExplore />,
      fillicon: <MdExplore />,
    },
  },
  {
    href: "/notification",
    label: "Notifications",
    icon: {
      icon: <IoMdNotificationsOutline />,
      fillicon: <IoMdNotifications />,
    },
  },
  {
    href: "/messages",
    label: "Messages",
    icon: {
      icon: <BiMessageSquareDetail />,
      fillicon: <BiSolidMessageSquareDetail />,
    },
  },
  {
    href: "/lists",
    label: "Lists",
    icon: {
      icon: <PiNotepad />,
      fillicon: <PiNotepadFill />,
    },
  },
  {
    href: "/communities",
    label: "Communities",
    icon: {
      icon: <HiOutlineUsers />,
      fillicon: <HiUsers />,
    },
  },
  {
    href: "/profile",
    label: "Profile",
    icon: {
      icon: <FaRegUser />,
      fillicon: <FaUser />,
    },
  },
];
const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <div
        className={cn(
          "min-h-screen max-h-screen overflow-y-auto w-fit md:pr-10 pr-5 pt-5 flex flex-col gap-3 border-r-[1px] pl-[50px]",
          sidebarOpen && "md:w-[300px]"
        )}>
        <Hover>
          <Link href={"/"}>
            <FaXTwitter size={40} />
          </Link>
        </Hover>
        {/* Side-Nav-Items */}

        {sidenavbaritems.map((d, i) => (
          <Hover key={i}>
            <NavItems
              icon={d.icon}
              href={d.href}
              label={d.label}
              sidebarOpen={sidebarOpen}
            />
          </Hover>
        ))}

        {/* Toogle Button */}
        <section
          className={cn(
            "flex w-full justify-end",
            !sidebarOpen && "justify-start"
          )}>
          <Hover>
            <MdKeyboardDoubleArrowLeft
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={cn(
                "text-gray-400 translate-all  text-4xl",
                !sidebarOpen && "rotate-180"
              )}
            />
          </Hover>
        </section>
      </div>
      <Fotter />
    </>
  );
};

export default SideBar;

// nav items
function NavItems({
  href,
  sidebarOpen,
  icon,
  label,
}: SideNavItemsTypes & { sidebarOpen: boolean }) {
  const [animationParent] = useAutoAnimate(); //used AutoAnimate
  const pathName = usePathname();
  const isActivePage = pathName == href;
  return (
    <>
      <Link
        ref={animationParent}
        href={href}
        className="flex gap-2 items-center cursor-pointer">
        <div className="w-[35px] h-[35px] text-3xl">
          {isActivePage ? icon?.fillicon : icon?.icon}
        </div>
        {sidebarOpen && (
          <p
            className={cn(
              "text-xl hidden md:block pr-3 translate-all",
              isActivePage && "font-bold"
            )}>
            {label}
          </p>
        )}
      </Link>
    </>
  );
}

// function for Hovering

function Hover({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="p-3 translate-all rounded-full cursor-pointer dark:hover:bg-zinc-900 w-fit hover:bg-gray-200 group-hover:bg-gray-200 group-hover:dark:bg-zinc-900">
      {children}
    </div>
  );
}
