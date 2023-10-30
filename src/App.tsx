import { SideBar } from './components/Sidebar';
import { useState } from 'react';

const App = () => {
  return (
    <section className="container mx-auto py-[50px]">
      <Logo />
      <main className="flex justify-between">
        <SideBar />
        <Content />
      </main>
    </section>
  );
};

export default App;

function Logo() {
  return (
    <div className="mb-5 text-center">
      <i className="icon aviasales-logo"></i>
    </div>
  );
}

function Content() {
  return (
    <div className="w-[502px]">
      <PriceFilter />
      <TicketList />
    </div>
  );
}

type PriceFilterIDs = 'cheap' | 'fast' | 'optimal';

type PriceFilterType = {
  id: PriceFilterIDs;
  title: string;
};

const priceFilters: PriceFilterType[] = [
  { id: 'cheap', title: 'Самый дешевый' },
  { id: 'fast', title: 'Самый быстрый' },
  { id: 'optimal', title: 'Оптимальный' },
];

function PriceFilter() {
  const [checkPrice, setCheckPrice] = useState<PriceFilterIDs>('cheap');

  function chooseCheckFilter(id: PriceFilterIDs) {
    if (checkPrice !== id) {
      setCheckPrice(id);
    }
  }

  return (
    <div className="price-filter mb-5 flex justify-between divide-x">
      {priceFilters.map((filter) => (
        <div
          key={filter.id}
          className={`price-filter_item grow text-center ${checkPrice === filter.id ? 'active' : ''} p-[15px]`}
          onClick={() => chooseCheckFilter(filter.id)}
        >
          <h2>{filter.title}</h2>
        </div>
      ))}
    </div>
  );
}

type Ticket = {
  id: number;
  ticketNumber: string;
  airlineLogo: string;
  price: string;
  flies: Fly[];
};

type Fly = {
  id: number;
  countries: {
    from: { city: string; time: string };
    to: { city: string; time: string };
  };
  timeDistance: string;
  stops: string[];
};

const tickets: Ticket[] = [
  {
    id: Date.now(),
    ticketNumber: 'SU34567890',
    airlineLogo: './images/airlines/logo_su.png',
    price: '13 400 Р',
    flies: [
      {
        countries: {
          from: { city: 'MOW', time: '10:45' },
          to: { city: 'HKT', time: '08:00' },
        },
        timeDistance: '21ч 15м',
        id: Date.now(),
        stops: ['HKG', 'JNB'],
      },
      {
        countries: {
          from: { city: 'MOW', time: '11:20' },
          to: { city: 'HKT', time: '00:50' },
        },
        timeDistance: '13ч 30м',
        id: Date.now(),
        stops: ['HKG'],
      },
    ],
  },
  {
    id: Date.now(),
    ticketNumber: 'SU34567890',
    airlineLogo: './images/airlines/logo_su.png',
    price: '13 400 Р',
    flies: [
      {
        countries: {
          from: { city: 'MOW', time: '10:45' },
          to: { city: 'HKT', time: '08:00' },
        },
        timeDistance: '21ч 15м',
        id: Date.now(),
        stops: ['HKG', 'JNB'],
      },
      {
        countries: {
          from: { city: 'MOW', time: '11:20' },
          to: { city: 'HKT', time: '00:50' },
        },
        timeDistance: '13ч 30м',
        id: Date.now(),
        stops: ['HKG'],
      },
    ],
  },
  {
    id: Date.now(),
    ticketNumber: 'SU34567890',
    airlineLogo: './images/airlines/logo_su.png',
    price: '13 400 Р',
    flies: [
      {
        countries: {
          from: { city: 'MOW', time: '10:45' },
          to: { city: 'HKT', time: '08:00' },
        },
        timeDistance: '21ч 15м',
        id: Date.now(),
        stops: ['HKG', 'JNB'],
      },
      {
        countries: {
          from: { city: 'MOW', time: '11:20' },
          to: { city: 'HKT', time: '00:50' },
        },
        timeDistance: '13ч 30м',
        id: Date.now(),
        stops: ['HKG'],
      },
    ],
  },
];

function TicketList() {
  return (
    <div className="tickets">
      {tickets.map((fly: Ticket) => (
        <TicketItem item={fly} key={fly.id} />
      ))}
      <div className="more">
        <button className="more-btn">Показать еще 5 билетов!</button>
      </div>
    </div>
  );
}

function TicketItem({ item }: { item: Ticket }) {
  return (
    <div className="ticket-item mb-5">
      <div className="mb-5 flex justify-between">
        <div className="price">{item.price}</div>
        <div className="company">
          <i className="icon s-7-logo"></i>
        </div>
      </div>
      <div className="flex flex-wrap">
        {item.flies.map((fly) => (
          <FlyItem key={fly.id} item={fly} />
        ))}
      </div>
    </div>
  );
}

function FlyItem({ item }: { item: Fly }) {
  return (
    <div className="fly mb-2.5 flex w-full flex-row">
      <FlyItemContent
        h={`${item.countries.from.city} - ${item.countries.to.city}`}
        b={`${item.countries.from.time} - ${item.countries.to.time}`}
      />
      <FlyItemContent h={'В пути'} b={item.timeDistance} />
      <FlyItemContent h={`${item.stops.length} пересадки`} b={item.stops.join(', ')} />
    </div>
  );
}

function FlyItemContent({ h, b }: { h: string; b: string }) {
  return (
    <div className="grow">
      <h2 className="fly-header">{h}</h2>
      <div className="fly-body">{b}</div>
    </div>
  );
}
