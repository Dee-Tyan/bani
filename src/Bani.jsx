import React, { useEffect, useState } from "react";
import axios from "axios";

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

  let reset = (e) => {
    e.preventDefault();
  };
  
  const percentageConverter = (intialValue, totalValue) => {
    const result = (intialValue / totalValue) * 100;
    return result.toFixed();
  };

  useEffect(() => {
    const initialState = {};
    axios
      .get("https://stage.getbani.com/api/v1/account/fiat_wallets/210/", {
        headers: {
          'Authorization': 'Token 1d3abb430d386468ef63167602a6f522118c1d1c4e88816c4898267552d10452'
        }
      })
      .then((response) => {
      let results = response.data.data;
        results.map((wallet) => {
          const key = wallet.currency;
          return () => {
            initialState[key] === "undefined" ? initialState[key] += wallet.available_balance:
            initialState[key] = wallet.available_balance
            setValue(initialState);
          }
        });
      })
      .catch((error) => console.log(error))
    
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
            onClick={percentageConverter}
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
