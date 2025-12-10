/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react'

const IconSvg = ({
    width = 48,
    height = 48,
}: {
    width?: number,
    height?: number,
}) => {
    return (
        <>
            <img className='object-contain' width={width} height={height} src="/assets/logo-svg.svg" alt="Theme Picker Logo | Open Source Project" />
        </>
    )
}

export default IconSvg
