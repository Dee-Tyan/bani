import React, { useEffect, useState } from "react";

const test = [
  {
    total_balance: "0.00",
    available_balance: "0.00",
    currency: "EGP",
    lock_wallet: false,
    pub_date: "2023-01-17T21:22:40.390364Z",
    modified_date: "2023-01-17T21:22:40.390382Z",
    fiat_wallet_id: 236,
    wallet_status: "active",
    wallet_spend_limit: "0.00",
    wallet_type: "other",
    wallet_alias: "Egypt Payments",
    tribe_account_id: 210,
    wallet_account_ref: "nxef4c6ktjqp8d4gk377",
  },
  {
    total_balance: "0.00",
    available_balance: "0.00",
    currency: "ZAR",
    lock_wallet: false,
    pub_date: "2023-01-17T21:21:55.715915Z",
    modified_date: "2023-01-17T21:21:55.715933Z",
    fiat_wallet_id: 235,
    wallet_status: "active",
    wallet_spend_limit: "0.00",
    wallet_type: "other",
    wallet_alias: "SA Payments",
    tribe_account_id: 210,
    wallet_account_ref: "95020c9kx511cj2mpwvf",
  },
  {
    total_balance: "0.00",
    available_balance: "0.00",
    currency: "KES",
    lock_wallet: false,
    pub_date: "2023-01-17T21:21:39.575849Z",
    modified_date: "2023-01-17T21:21:39.575869Z",
    fiat_wallet_id: 234,
    wallet_status: "active",
    wallet_spend_limit: "0.00",
    wallet_type: "other",
    wallet_alias: "KE Payments",
    tribe_account_id: 210,
    wallet_account_ref: "5azmy0c4q1cg8n5qw7xn",
  },
  {
    total_balance: "0.00",
    available_balance: "0.00",
    currency: "GHS",
    lock_wallet: false,
    pub_date: "2023-01-17T21:20:09.355362Z",
    modified_date: "2023-01-17T21:20:09.355381Z",
    fiat_wallet_id: 233,
    wallet_status: "active",
    wallet_spend_limit: "0.00",
    wallet_type: "other",
    wallet_alias: "GH Payments",
    tribe_account_id: 210,
    wallet_account_ref: "30kr1t54g103n72ks61q",
  },
  {
    total_balance: "0.00",
    available_balance: "0.00",
    currency: "ZMW",
    lock_wallet: false,
    pub_date: "2023-01-17T21:19:57.860860Z",
    modified_date: "2023-01-17T21:19:57.860880Z",
    fiat_wallet_id: 232,
    wallet_status: "active",
    wallet_spend_limit: "0.00",
    wallet_type: "other",
    wallet_alias: "ZM Payments",
    tribe_account_id: 210,
    wallet_account_ref: "xn7h8j7yn6dnfb402762",
  },
  {
    total_balance: "72350.00",
    available_balance: "39700.00",
    currency: "NGN",
    lock_wallet: false,
    pub_date: "2023-01-17T20:58:24.076621Z",
    modified_date: "2023-01-17T21:29:32.131760Z",
    fiat_wallet_id: 231,
    wallet_status: "active",
    wallet_spend_limit: "0.00",
    wallet_type: "default",
    wallet_alias: "current",
    tribe_account_id: 210,
    wallet_account_ref: "p5rw3egc9nnj5phmt1mz",
  },
];

let reset = (e) => {
  e.preventDefault();
};

const percentageConverter = (intialValue, totalValue) => {
  const result = (intialValue / totalValue) * 100;
  return result.toFixed();
};

const Bani = () => {
  const [value, setValue] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValue({
      ...value,
      [name]: value,
    });
  };

  useEffect(() => {
    const initialState = {};
    test.map((wallet) => {
      const key = wallet.currency;
      if (initialState[key]) {
        initialState[key] += wallet.available_balance;
      } else {
        initialState[key] = wallet.available_balance;
      }
      setValue(initialState);
    });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="px-8 py-12 border">
        <h2 className="text-4xl mb-4 py-2 px-2">
          {" "}
          Wallet Allocations Calculator
        </h2>

        <form className="grid gap-8">
          {test.map((wallet) => {
            return (
              <label key={wallet.fiat_wallet_id}>
                {wallet.currency}
                <input
                  type="text"
                  value={value[wallet.currency]}
                  name={value[wallet.currency]}
                  onChange={handleChange}
                  readOnly={wallet.wallet_type === "default" ? true : false}
                />
              </label>
            );
          })}
        </form>

        <div className="flex justify-between px-16">
          <button
            className="bg-black text-white py-2 px-2 rounded-md w-1/4 text-bold"
            
          >
            {" "}
            Save
          </button>
          <button
            className="bg-black text-white py-2 px-2 rounded-md w-1/4 text-bold"
            onClick={reset}
          >
            {" "}
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bani;
