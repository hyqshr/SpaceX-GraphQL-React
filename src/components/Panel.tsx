import Card from './Card';
import { CapsuleSVG, PadsSVG, CompanySVG, RocketSVG, ReportSVG } from './util';

const Panel = () => {
  const data = [
    {
      title: 'Launch pads',
      subtitle: 'Information about SpaceX launch pads',
      href: 'launch-pads',
      icon: <PadsSVG />,
    },
    {
      title: 'Launches',
      subtitle: 'Past and future flight data from SpaceX',
      href: 'launches',
      icon: <RocketSVG />,

    },
    {
      title: 'Upcoming launches',
      subtitle: 'Information on upcoming SpaceX flights',
      href: 'upcoming-launches',
      icon: <RocketSVG />,

    },
    {
      title: 'Capsule information',
      subtitle: 'Data about SpaceX capsules',
      href: 'capsule',
      icon: <CapsuleSVG />,

    },
    {
      title: 'Company information',
      subtitle: 'Insights into SpaceX as a company',
      href: 'company',
      icon: <CompanySVG />,

    },
    {
      title: 'Report',
      subtitle: 'Review suspicious activity',
      href: 'reports',
      icon: <ReportSVG />,
    },
    {
      title: 'File report',
      subtitle: 'Find anything suspicious? File a report!',
      href: 'submit-report',
      icon: <ReportSVG />,
    },
    {
      title: 'Sentry Error Test',
      subtitle: 'Test Sentry Error',
      href: 'error',
      icon: <ReportSVG />,
    },
    
  ];

  return (
    <div className='grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-400 lg:gap-x-8'>
      {data.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          href={item.href}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default Panel;
