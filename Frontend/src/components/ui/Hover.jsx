import React from 'react';

const Hover = ({text}) => {
    return (
        <div className="relative after:absolute after:bg-gray-200 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-100 hover:after:origin-bottom-right hover:after:scale-x-0 after:transition-transform after:ease-in-out after:duration-300">{text}</div>
    );
};

export default Hover;
