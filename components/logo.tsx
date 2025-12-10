import React from 'react'
import IconSvg from './icon-svg'

const Logo = () => {
    return (
        <div className='flex gap-4 items-center'>
            <IconSvg width={48} height={48} />
            <strong>Theme Picker</strong>
        </div>
    )
}

export default Logo
