"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8 lg:px-10">
            {/* 左侧 */}
            <div className="flex items-center gap-4 md:gap-6">
            <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl">
                TokenSender
            </h1>

            <a
                href="https://github.com/你的用户名/tsender"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition-colors hover:text-gray-900"
                aria-label="GitHub repository"
            >
                <FaGithub size={24} />
            </a>
            </div>

            {/* 右侧 ConnectButton */}
            <div className="flex items-center">
            <ConnectButton
                showBalance={false}
                chainStatus="icon"
                accountStatus={{
                smallScreen: "address",
                largeScreen: "full",
                }}
            />
            </div>
        </div>
    </header>
  );
}