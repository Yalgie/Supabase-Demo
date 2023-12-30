import { Spinner } from "@/components/Spinner";
import classnames from "classnames";

export const Button = ({
  loading,
  text,
  onClick,
  customClass,
}: {
  loading?: boolean;
  text: string;
  onClick?: any;
  customClass?: string;
}) => {
  const classes = classnames({
    "cursot-not-allowed opacity-70": loading,
    "cursot-pointer": !loading,
  });
  return (
    <button
      className={`rounded-md px-8 py-2 bg-indigo-500 hover:bg-indigo-300 transition-colors text-indigo-50 self-end spinner text-sm uppercase font-medium ${customClass} ${classes}`}
      type={!!onClick ? "button" : "submit"}
      onClick={onClick && onClick}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <span style={{ top: "1px" }} className="mr-2 relative font-sm">
            {text}
          </span>
          <Spinner />
        </div>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};
