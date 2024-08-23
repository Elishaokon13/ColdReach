import { useSelector } from "react-redux";
import { useState } from "react";

export function useChargeConnector() {
  const user = useSelector((state) => state.user.user);
  const [hostedUrl, setHostedUrl] = useState(null);

  const createCharge = async () => {
    const url = "https://api.commerce.coinbase.com/charges";

    const requestBody = {
      local_price: {
        amount: "3", //price of charge
        currency: "USD", //currency
      },
      pricing_type: "fixed_price",
      name: "ColdReach PRO",
      description: "ColdReach is a decentralized platform for user to generate neat DMs for their clients.",
      redirect_url: "https://coldreach.vercel.app/callback?status=success", //optional redirect URL
      metadata: {
        //optional charge metadata
        id: `${user.user._id}`,
        email: "",
        address: `${user.user.address}`,
      },
    };

    const payload = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CC-Api-Key": process.env.NEXT_PUBLIC_COMMERCE_API_KEY, //API key from Commerce
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(url, payload);
      if (!response.ok) {
        throw new Error(`HTTP error Status: ${response.status}`);
      }
      const chargeData = await response.json();
      setHostedUrl(chargeData.data.hosted_url);
      console.log(chargeData);
      return chargeData;

    } catch (error) {
      console.error("Error creating charge:", error);
    }
  };

  return { createCharge, hostedUrl };
}