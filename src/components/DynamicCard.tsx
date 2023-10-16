import React from 'react';

interface DynamicCardProps {
  // DynamicCard can display card with 1 or more fields
  title: string;
  otherProps?: Record<string, any>;
}

const DynamicCard: React.FC<DynamicCardProps> = ({ title, otherProps }) => {
  return (
    <div className="flex flex-col bg-white dark:bg-[#181a1b] rounded-2xl shadow-xl max-h-96">
      <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8 overflow-auto">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
        {otherProps && Object.entries(otherProps).map(([key, value], index) => {
          if (key !== 'imageUrl' && key !== 'link') {
            return <p key={index} className="text-sm text-gray-500">{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</p>
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default DynamicCard;
