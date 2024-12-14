

import Image from 'next/image';
import clsx from 'clsx';

type Props = {
    src: string
    className?: string
    alt?: string
}

export default function MyImage({ src, className, alt = '' }: Props) {
    return (
        <Image
            className={clsx(className)}
            alt={alt}
            width={0}
            height={0}
            style={{ width: '100%', height: 'auto' }}
            src={src}
        />

    )
}