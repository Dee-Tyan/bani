import React, { useEffect, useState } from "react";
import axios from "axios";

const Bani = () => {
  const [value, setValue] = useState({});
  const [total, setTotal] = useState(0);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  let reset = (e) => {
    e.preventDefault();
    setValue({});
    setTotal(0);
  };

  const percentageConverter = (e) => {
    e.preventDefault();
    const totalValue = Object.values(value).reduce(
      (a, b) => Number(a) + Number(b),
      0
    );
    const percentageValue = Object.keys(value).reduce((acc, key) => {
      acc[key] = (value[key] / totalValue) * 100;
      return acc;
    }, {});
    setTotal(totalValue);
    setValue({ ...value, ...percentageValue });
  };

  useEffect(() => {
    const initialState = {};
    axios
      .get("https://stage.getbani.com/api/v1/account/fiat_wallets/210/", {
        headers: {
          Authorization:
            "Token 1d3abb430d386468ef63167602a6f522118c1d1c4e88816c4898267552d10452",
        },
      })
      .then((response) => {
        let results = response.data.data;
        results.map((wallet) => {
          const key = wallet.currency;
          initialState[key] === "undefined"
            ? (initialState[key] += wallet.available_balance)
            : (initialState[key] = wallet.available_balance);
        });
        setValue(initialState);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="px-8 py-12 border">
        <h2 className="text-4xl mb-4 py-2 px-2">
          {" "}
          Wallet Allocations Calculator
        </h2>

        <form className="grid gap-8 py-8 px-8">
          {Object.keys(value).map((key) => {
            return (
              <label key={key}>
                {key}
                <input
                  type="text"
                  value={value[key]}
                  name={key}
                  onChange={handleChange}
                  className="ml-4"
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
