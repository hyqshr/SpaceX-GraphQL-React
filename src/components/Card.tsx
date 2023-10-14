import { Link } from "react-router-dom";
import { CapsuleSVG } from "./util";

interface CardProps {
    title: string;
    subtitle: string;
    href: string;
    icon: React.ReactNode;
}

const Card = ({
    title,
    subtitle,
    href,
    icon
}: CardProps) => {
  return (
    <div className="flex flex-col bg-white dark:bg-[#181a1b] rounded-2xl shadow-xl max-h-96">
      
      <div className="flex-1 relative pt-8 px-6 pb-8 md:px-8">
        {icon}
        <h3 className="text-xl font-medium pt-8 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-4 text-base text-gray-500 line-clamp-5">
          {subtitle ?? (
            <span className="text-red-500">No available details</span>
          )}
        </p>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-[#212324] rounded-bl-2xl rounded-br-2xl md:px-8">
        <Link
          className="text-base font-medium text-amber-500 hover:text-amber-600"
          to={href}
        >
          More info<span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
