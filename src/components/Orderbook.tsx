import { useEffect, useState } from "react";
import axios from "axios";

export const Orderbook = () => {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.prod.rabbitx.io/markets/orderbook", {
        params: {
          market_id: "BTC-USD",
          p_limit: 100,
          p_page: 0,
          p_order: "DESC",
        },
      })
      .then((response) => {
        if (response.data.success) {
          console.log("response =>", response.data.result[0]);
          setBids(response.data.result[0].bids);
          setAsks(response.data.result[0].asks);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-cyan-950 p-4 min-h-96 w-80">
      <div className="font-bold text-3xl text-white">Bids</div>
      {bids.slice(0, 11).map((bid, index) => {
        return (
          <div key={index} className="flex justify-between">
            <span className="text-white">{bid[0]}</span>
            <span className="text-white">{bid[1]}</span>
          </div>
        );
      })}
      <div className="font-bold text-3xl text-white">Asks</div>
      {asks.slice(0, 11).map((ask, index) => {
        return (
          <div key={index} className="flex justify-between">
            <span className="text-white">{ask[0]}</span>
            <span className="text-white">{ask[1]}</span>
          </div>
        );
      })}
    </div>
  );
};
