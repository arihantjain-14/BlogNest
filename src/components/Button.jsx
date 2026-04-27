import React from "react";

function Button({
    children,
    bgColor = 'btn-primary',
    type = 'submit',
    className = '',
    ...props
}){
    // Map old bgColor tailwind classes to new CSS classes
    const classMap = {
        'bg-blue-600': 'btn-primary',
        'bg-blue-500': 'btn-primary',
        'bg-green-500': 'btn-success',
        'bg-red-500': 'btn-danger',
    };
    const resolvedClass = classMap[bgColor] || bgColor || 'btn-primary';

    return (
        <button
            type={type}
            className={`btn-primary ${resolvedClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
