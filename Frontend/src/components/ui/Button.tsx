export interface ButtonProps {
    variant: "primary" | "secondary";
    size?: 'sm' | "lg" | "md";
    text: string;
    startIcon?: any;
    endIcon?: any;
    onClick?: () => void;
    FullWidth?: boolean; // added new prop to make button full width


}

export const Button = (props: ButtonProps) => {

    const { variant, size, text, startIcon, endIcon, onClick ,FullWidth } = props;

    const variantClasses =
    variant === "primary"
    ? "text-white bg-purple-600"
    : "bg-purple-200 text-purple-700";

    const sizeClasses = {
        sm: "px-2 py-1",
        md: "px-4 py-2",
        lg: "px-6 py-3"
    }
  const defaultStyles = "px-4 py-2 rounded-md font-light"
   
 const classes = `rounded ${variantClasses} ${defaultStyles } flex items-center justify-center text-sm ${FullWidth?" w-full ":""} `
    return (
        <button className={classes} onClick={onClick}>
          { props.startIcon?<div className="pr-2"> {props.startIcon} </div> : null}{props.text} { props.endIcon?<div className="pl-2"> {props.endIcon} </div> : null}
      </button>
    )
}


