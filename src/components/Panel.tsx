import Card from './Card';

const Panel = () => {
  const data = [
    {
      title: 'Launch pads',
      subtitle: 'Information about SpaceX launch pads',
      href: 'launch-pads',
    },
    {
      title: 'Launches',
      subtitle: 'Past and future flight data from SpaceX',
      href: 'launches',
    },
    {
      title: 'Upcoming launches',
      subtitle: 'Information on upcoming SpaceX flights',
      href: 'upcoming-launches',
    },
    {
      title: 'Capsule information',
      subtitle: 'Data about SpaceX capsules',
      href: 'capsule',
    },
    {
      title: 'Company information',
      subtitle: 'Insights into SpaceX as a company',
      href: 'company',
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
        />
      ))}
    </div>
  );
};

export default Panel;
