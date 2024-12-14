"use client";
import './header.scss';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    return (
        <nav className='header'>
            Weather Dashboard
        </nav >
    )
}
