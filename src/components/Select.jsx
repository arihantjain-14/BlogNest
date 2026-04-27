import React, { useId } from "react";

function Select({
    label,
    options,
    className = "",
    ...props
}, ref){
    const id = useId();
    return(
       <div className="input-wrapper">
        {label && <label className="input-label" htmlFor={id}>{label}</label>}
        <select
            className={`select-field ${className}`}
            id={id}
            ref={ref}
            {...props}
        >
          {options?.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
       </div>
    );
}

export default React.forwardRef(Select);
