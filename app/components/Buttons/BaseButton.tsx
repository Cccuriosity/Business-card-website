import { ReactNode } from "react";

interface BaseButtonProps {
    children?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className: string;
    type?: "button" | "submit";
}

export default function BaseButton({
    children,
    onClick,
    className,
    type = "button",
}: BaseButtonProps) {
    return (
        <button className={className} onClick={onClick} type={type}>
            {children}
        </button>
    );
}
