import { SideBar } from './components/Sidebar';
import { useEffect, useState, useRef } from 'react';
import { Fly, PriceFilterIDs, PriceFilterType, Ticket } from './types';
import { ticketsService } from './mock/tickets';

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

function TicketList() {
  const { getAll, getTheNumberOfTickets } = ticketsService();

  const limitRef = useRef(5);
  const [lastIndex, setLastIndex] = useState(0);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  function setCurrentTickets(head: number, tail: number) {
    const newArray: Ticket[] = getAll();

    if (head !== tail) {
      const slicedArray = head < tail ? newArray.slice(head, tail) : newArray.slice(head);

      const resultArray = tickets.concat(slicedArray);

      setTickets(resultArray);
    }
  }

  function moreTickets() {
    if (getTheNumberOfTickets > 0) {
      const i =
        getTheNumberOfTickets - (lastIndex + 1) < limitRef.current
          ? lastIndex + (getTheNumberOfTickets - (lastIndex + 1))
          : lastIndex + limitRef.current;

      setCurrentTickets(lastIndex, i);

      setLastIndex(i);
    }
  }

  useEffect(() => {
    if (getTheNumberOfTickets > 0) {
      setCurrentTickets(lastIndex, limitRef.current);
      setLastIndex(4);
    }
  }, []);

  return (
    <div className="tickets">
      {tickets.length > 0 ? tickets.map((fly: Ticket) => <TicketItem item={fly} key={fly.id} />) : 'Нет билетов'}
      {tickets.length === 0 ||
        (getTheNumberOfTickets !== tickets.length && (
          <div className="more">
            <button className="more-btn" onClick={moreTickets}>
              {/* {tickets.length - lastIndex > limitRef.current
                ? `Показать еще ${limitRef.current} билетов!`
                : `Осталось ${getTheNumberOfTickets}`} */}
              {getTheNumberOfTickets - tickets.length}
            </button>
          </div>
        ))}
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
        h={`${item.countries.from.city} – ${item.countries.to.city}`}
        b={`${item.countries.from.time} – ${item.countries.to.time}`}
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
