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
      <ProductList />
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

function ProductList() {
  return (
    <div>
      {flies.map((fly) => (
        <ProductItem />
      ))}
    </div>
  );
}

type FlyType = {
  countries: {
    from: { city: string; time: string };
    to: { city: string; time: string };
  };

  timeDistance: string;
  flightNumber: string;
  airlineLogo: string;
  price: string;
  transfers: string[];
};

const flies: FlyType[] = [
  {
    countries: {
      from: { city: 'MOW', time: '10:45' },
      to: { city: 'HKT', time: '08:00' },
    },

    timeDistance: '21ч 15м',
    flightNumber: 'SU34567890',
    airlineLogo: './images/airlines/logo_su.png',
    price: '13 400 Р',
    transfers: ['HKG', 'JNB'],
  },
];

function ProductItem({ item }: FlyType) {
  return (
    <div className="product-item">
      <div className="mb-5 flex justify-between">
        <div className="price">
          13 400<span> Р</span>
        </div>
        <div className="company">
          <i className="icon s-7-logo"></i>
        </div>
      </div>
      <div>list of flies</div>
    </div>
  );
}
