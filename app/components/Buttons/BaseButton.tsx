import {ReactNode} from "react";

interface BaseButtonProps {
    children?: ReactNode;
    onClick?: () => void;
    className: string;
    type?: "button" | "submit";
}

export default function BaseButton({ children, onClick, className, type}: BaseButtonProps) {
    return (
        <button className={className} onClick={onClick} type={type}>
            {children}
        </button>
    )
}
