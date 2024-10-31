import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-400 uppercase py-3 px-4 border-b border-stone-200 sm:px-6">
      <Link to="/" className="tracking-widest">
        The Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
