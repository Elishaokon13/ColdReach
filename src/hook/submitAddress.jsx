import { useEffect } from "react";

const useSubmitAddress = (isConnected, address, API_URL) => {
  const submitAddress = async () => {
    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const { data } = await response.json();
      localStorage.setItem("userDetails", JSON.stringify(data.user));
      localStorage.setItem("JWToken", data.accessToken);
      //   console.log(data.accessToken);
    } catch (error) {
      console.error("Error in submitAddress:", error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      submitAddress();
    }
  }, [isConnected]);
};

export default useSubmitAddress;
