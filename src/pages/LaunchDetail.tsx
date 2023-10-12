import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  RocketDetailFragment,
  useGetDetailLaunchQuery,
} from "apollo/generated/schema";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import {
  DetailError,
  DetailLaunchInfo,
  DetailRocketInfo,
  DetailLoading,
} from "components";

const LaunchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { data, loading, error } = useGetDetailLaunchQuery({
    variables: {
      id,
    },
  });

  if (loading) {
    return <DetailLoading />;
  }
  if (!data?.launch || error) return <DetailError param={id} />;

  return (
    <div className="bg-gray-200 dark:bg-[#25282a] min-h-screen">
      <div className="max-w-2xl mx-auto py-24 px-4 grid items-center gap-y-8 gap-x-8 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8 bg-white dark:bg-[#181a1b] min-h-screen">
        <Link
          to="/spacex-launches"
          className="text-amber-500 font-semibold text-xl inline-flex items-center"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          GO BACK
        </Link>
        {/* Mission Name, Detail, Logo */}
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-stone-500 sm:text-4xl">
              Mission: {data?.launch?.mission_name}
            </h2>
            <p className="mt-4 text-gray-500">{data?.launch?.details}</p>
        {/* Launch Information */}
        <hr className="bg-gray-600 dark:bg-stone-500" />
        <h2 className="font-semibold text-2xl dark:text-stone-500">
          Launch Information{" "}
        </h2>
        <DetailLaunchInfo {...data.launch} />
        {/* Rocket Information */}
        <h2 className="font-semibold text-2xl dark:text-stone-500">
          Rocket Information{" "}
        </h2>
        <DetailRocketInfo {...(data.launch.rocket as RocketDetailFragment)} />
      </div>
    </div>
  );
};

export default LaunchDetail;
