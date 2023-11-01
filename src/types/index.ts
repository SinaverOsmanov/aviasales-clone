export type Ticket = {
  id: string;
  ticketNumber: string;
  airlineLogo: string;
  price: string;
  flies: Fly[];
};

export type Fly = {
  id: string;
  countries: {
    from: { city: string; time: string };
    to: { city: string; time: string };
  };
  timeDistance: string;
  stops: string[];
};

export type transferFiltersType = {
  id: TransferFilterIDs;
  title: string;
};

export type TransferFilterIDs = 'all' | 'off' | 'one' | 'two' | 'three';

export type PriceFilterIDs = 'cheap' | 'fast' | 'optimal';

export type PriceFilterType = {
  id: PriceFilterIDs;
  title: string;
};
