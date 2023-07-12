import React, { PropsWithChildren, useState } from "react";

interface Props extends PropsWithChildren {
  title: string;
}

const InformationCard: React.FC<Props> = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-base">{title}</h1>

        <button className="text-2xl  px-3 py-3" onClick={handleClick}>
          {open ? "-" : "+"}
        </button>
      </div>
      {open && <p className="mt-1 mb-2">{children}</p>}
      <hr className="" />
    </div>
  );
};

export default InformationCard;
