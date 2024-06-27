import { useEffect, useState } from "react";
import axios from "axios";
import { Centrifuge } from "centrifuge";

const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MDAwMDAwMDAwIiwiZXhwIjo2NTQ4NDg3NTY5fQ.o_qBZltZdDHBH3zHPQkcRhVBQCtejIuyq8V1yj5kYq8";

const centrifuge = new Centrifuge("wss://api.prod.rabbitx.io/ws", {
  token: JWT_TOKEN,
});

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

    const sub = centrifuge.newSubscription("orderbook");

    // React on `news` channel real-time publications.
    sub.on("publication", function (ctx) {
      console.log(ctx.data);
    });

    // Trigger subscribe process.
    sub.subscribe();

    // Trigger actual connection establishement.
    centrifuge.connect();
  }, []);

  return (
    <div className="bg-cyan-950 p-4 min-h-96 w-80 rounded-lg">
      <div className="font-bold text-sm text-white">Orderbook</div>
      {bids.slice(0, 11).map((bid, index) => {
        return (
          <div key={index} className="flex justify-between">
            <span className="text-white">{bid[0]}</span>
            <span className="text-white">{bid[1]}</span>
          </div>
        );
      })}
      <div className="font-bold text-base text-white bg-cyan-900 p-2 my-2">
        60,875
      </div>
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
