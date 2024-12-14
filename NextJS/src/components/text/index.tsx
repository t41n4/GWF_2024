import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import * as React from 'react'

import { cn } from '@/lib/utils'

const textVariants = cva(
    'inline-flex items-center text-text justify-center whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                header1: 'text-4xl font-bold',
                header2: 'text-3xl font-bold',
                header3: 'text-2xl font-bold',
                item: 'text-lg font-medium',
                paragraph: 'text-base font-normal',
            },
            type: {
                default: 'text-text',
                destructive: 'text-destructive',
                success: 'text-success',
                warning: 'text-warning',
                info: 'text-info',
                disabled: 'text-disabled',
            },
        },
        defaultVariants: {
            variant: 'paragraph',
            type: 'default',
        },
    },
)

export interface TextProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof textVariants> {
    asChild?: boolean;
}

const Text = React.forwardRef<HTMLDivElement, TextProps>(
    ({ className, variant, type, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot
            : variant === 'paragraph' ? 'p'
                : variant === 'header1' ? 'h1'
                    : variant === 'header2' ? 'h2'
                        : variant === 'header3' ? 'h3'
                            : 'div';
        return (
            <Comp
                className={cn(textVariants({ variant, type, className }))}
                ref={ref}
                {...props}
            />
        )
    },
)

Text.displayName = 'Text'

export { Text, textVariants }