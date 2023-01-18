import React, { useState, useEffect } from "react"
import axios from "axios"


function App() {
  let [bani, setBani] = useState([])
  let [total, setTotal] = useState()
  let [available, setAvailable] = useState();
  let [allocation, setAllocation] = useState("0")


  //collect the available balance and return an allocation percentage
  let allocationsCalculator = () => {
    let calc = available * 0.1;
     setAllocation(calc)
  }

  //reset data to 0
  let reset = () => {
    allocation = 0;
    available = 0;

    setAllocation(0);
    setAvailable(0);
  }


  useEffect(() => {
    axios
      .get("https://stage.getbani.com/api/v1/account/fiat_wallets/210/", {
        headers: {
          'Authorization': 'Token 1d3abb430d386468ef63167602a6f522118c1d1c4e88816c4898267552d10452'
        }
      })
      .then((response) => {
        let results = response.data.data;
        setBani(results[0])
      })
      .catch((error) => console.log(error))


  }, [])


  let formData = () => {
    let newData = [total, available]
    return newData;
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    formData();

    axios
      .post("https://stage.getbani.com/api/v1/account/fiat_wallets/210/", {
        headers: {
          'Authorization': 'Token 1d3abb430d386468ef63167602a6f522118c1d1c4e88816c4898267552d10452'
        }
      })
      .then((res) => [...res, formData])
      .catch((err) => {
        console.log(err.message);
      });
  };


  return (
    <div className="flex items-center justify-center">
      <div className="px-8 py-12 border">
        <h2 className="text-4xl mb-4 py-2 px-2"> Wallet Allocations Calculator</h2>
        <form className="grid gap-8">

          <label >
            Total Balance:
            <input className="ml-8" type="text" value={bani.total_balance} readOnly={false} name="name" onChange={(e) => setTotal(e.target.value)} />
          </label>

          <label >
            Available Balance:
            <input className="ml-8" type="text" placeholder={bani.available_balance} name="name" onChange={(e) => setAvailable(e.target.value)} />
          </label>

          <label >
            Allocations: {allocation}
          </label>

          <label >
            Wallet Type:
            <input className="ml-8" type="text" value={bani.wallet_type} name="name" readOnly />
          </label>

          <div className="flex justify-between px-16">
            <input type="button" value="Save" onClick={allocationsCalculator}  className="bg-black text-white py-2 px-2 rounded-md w-1/4 text-bold"/>
            <input type="button" value="Reset" onSubmit={reset} className="bg-black text-white py-2 px-2 rounded-md w-1/4 text-bold" />
          </div>

        </form>

      </div>


    </div>
  );
}

export default App;
