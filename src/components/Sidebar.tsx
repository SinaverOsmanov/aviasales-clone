type TransferFilterIDs = 'all' | 'off' | 'one' | 'two' | 'three';
import { useState, useEffect, useCallback } from 'react';

type transferFiltersType = {
  id: TransferFilterIDs;
  title: string;
};

const transferFilters: transferFiltersType[] = [
  {
    id: 'all',
    title: 'Все',
  },
  {
    id: 'off',
    title: 'Без пересадок',
  },
  {
    id: 'one',
    title: '1 пересадка',
  },
  {
    id: 'two',
    title: '2 пересадки',
  },
  {
    id: 'three',
    title: '3 пересадки',
  },
];

export function SideBar() {
  const handleFilterChange = useCallback((ids: TransferFilterIDs[]) => {
    console.log(ids);
  }, []);

  return (
    <aside className="h-full">
      <h2 className="my-2.5 px-5">Количество пересадок</h2>
      <TransferFilter filters={transferFilters} onChange={handleFilterChange} />
    </aside>
  );
}

function TransferFilter({
  filters,
  onChange,
}: {
  filters: transferFiltersType[];
  onChange: (ids: TransferFilterIDs[]) => void;
}) {
  const [checkedFilter, setCheckedFilter] = useState<TransferFilterIDs[]>([]);

  function chooseCheckFilter(id: TransferFilterIDs) {
    if (!checkedFilter.includes(id)) {
      setCheckedFilter([...checkedFilter, id]);
    } else {
      const newArr = checkedFilter.filter((item) => item !== id);
      setCheckedFilter(newArr);
    }
  }

  useEffect(() => {
    onChange(checkedFilter);
  }, [checkedFilter, checkedFilter.length, onChange]);

  return (
    <div className="transfer-filter">
      {filters.map((filter) => (
        <CheckboxUI
          key={filter.id}
          title={filter.title}
          id={filter.id}
          selected={checkedFilter.includes(filter.id)}
          onChange={chooseCheckFilter}
        />
      ))}
    </div>
  );
}

type CheckboxUIProps = {
  id: TransferFilterIDs;
  selected: boolean;
  onChange: (id: TransferFilterIDs) => void;
  title: string;
};

function CheckboxUI({ id, title, onChange, selected }: CheckboxUIProps) {
  const [checked, setChecked] = useState(selected);

  function changeCheckBoxHandler() {
    setChecked((prev) => !prev);
    onChange(id);
  }

  return (
    <label className="custom-checkbox flex px-5 py-2.5 align-middle" htmlFor={id}>
      <div className="custom-checkbox-icon mr-2.5">
        {checked ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#2196F3" />
            <path
              d="M8.28571 14L4 10.1612L5.20857 9.0787L8.28571 11.8273L14.7914 6L16 7.09021L8.28571 14Z"
              fill="#2196F3"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#9ABBCE" />
          </svg>
        )}
      </div>
      <input type="checkbox" name={title} id={id} checked={checked || false} onChange={changeCheckBoxHandler} />
      {title}
    </label>
  );
}
