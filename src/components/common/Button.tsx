import clsx from "clsx";

interface ButtonProps {
  id: string;
  title: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  containerClass: string;
}


const Button = ({ 
    id, 
    title, 
    rightIcon, 
    leftIcon, 
    containerClass 
  }: ButtonProps) => {
  return (
    <button
      id={id}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-lg bg-violet-50 !px-7 !py-3 text-black",
        containerClass
      )}
    >
      {leftIcon && leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="!text-sm translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute !text-sm translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {rightIcon && rightIcon}
    </button>
  );
};

export default Button;
