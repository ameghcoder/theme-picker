/* eslint-disable @next/next/no-img-element */

import React from "react";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";
import Logo from "../logo";

const Footer = () => {
    return (
        <>
            <div className="md:pt-8 md:px-4 lg:px-8 lg:pt-16 pb-36 sm:pb-32 md:rounded-t-4xl border-border/25 border-t  relative bg-accent/25 overflow-hidden" >
                <div className="relative z-50 bg-background py-8 sm:p-8 lg:p-12 flex flex-col md:rounded-4xl md:border border-border shadow-xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="w-[220px] mx-auto sm:mx-0 flex flex-col items-center md:items-start max-w-sm gap-4 md:gap-6">
                            <Logo />
                            <span className="text-sm text-center sm:text-left">A free and open source theme picker for modern web designers.
                            </span>
                        </div>
                        <div className="w-full sm:w-fit flex flex-col items-center md:items-end justify-center md:justify-end gap-4">
                            <Link title="Source on GitHub" href="https://github.com/ameghcoder/theme-picker" className="w-fit flex gap-2 items-center rounded-full border-border border bg-secondary/50 pl-4 hover:bg-secondary cursor-pointer">
                                <span className="text-muted-foreground text-sm font-medium">Source on GitHub</span>
                                <span className="size-10 rounded-full bg-white p-1">
                                    <img width={32} height={32} src="/assets/social/github.svg" alt="GitHub Icon | used to denote source code on GitHub" />
                                </span>
                            </Link>
                            <ul className="text-sm flex items-center flex-col md:flex-row flex-wrap gap-4 font-medium text-muted-foreground">
                                <li><Link href="https://x.com/yrjdev">Built and maintained by Yashraj</Link></li>
                                {/* <li><Link href="https://x.com/yrjdev">Docs</Link></li> */}
                                <li><Link href="https://github.com/ameghcoder/theme-picker">Want to Contribute?</Link></li>
                            </ul>
                        </div>
                    </div>
                    <hr className="my-6" />
                    <div className="pt-2 text-center">
                        <span className="text-sm font-mono font-medium text-muted-foreground">Open Source under MIT License</span>
                    </div>
                </div>
                <div className="px-2 md:px-4 lg:px-8 absolute left-0 bottom-0 w-full flex justify-center text-muted-foreground opacity-50">
                    <img
                        className="w-full max-w-lg sm:translate-y-0"
                        src="/assets/footer-logo-artwork.svg"
                        fetchPriority="low"
                        loading="lazy"
                        decoding="auto"
                        alt="" />
                </div>
            </div>
        </>
    );
};

export default Footer