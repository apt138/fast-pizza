import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, onClick }) {
  //   const className =
  //     "bg-yellow-400 uppercase inline-block py-3 px-4 tracking-wide rounded-full font-semibold text-stone-800 hover:bg-yellow-300 transition-colors duration-200 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-3";

  const base =
    "bg-yellow-400 text-sm uppercase inline-block tracking-wide rounded-full font-semibold text-stone-800 hover:bg-yellow-300 transition-colors duration-200 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " py-3 px-4 md:px-6 md:py-3",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + "px-2 py-1.5 md:px-3 md:py-1.5 text-sm",
    secondary:
      "py-2.5 px-4 md:px-6 text-sm md:py-2.5 border-2 border-stone-300 uppercase inline-block tracking-wide rounded-full font-semibold text-stone-400 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 transition-colors duration-200 focus:outline-none focus:ring focus:ring-stone-300 focus:bg-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed",
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button disabled={disabled} onClick={onClick} className={styles[type]}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
