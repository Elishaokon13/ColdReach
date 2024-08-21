import { useEffect, useRef, useState } from "react";
import { initOnRamp } from "@coinbase/cbpay-js";
import { Button } from "@chakra-ui/react";

// type InitOnRampOptions = Parameters<initOnRamp>[0];

// type CoinbaseButtonProps = {
//    destinationWalletAddress: string;
// };

export const CoinbaseButton = ({ destinationWalletAddress }) => {
  const [isReady, setIsReady] = useState(false);
  const onrampInstance = useRef();

  useEffect(() => {
    //initOnRamp parameters
    const options = {
      appId: "cc0c37d9-7e39-4901-a062-cc00af1a4525",
      target: "#cbpay-container",
      widgetParameters: {
        destinationWallets: [
          {
            address: destinationWalletAddress,
            blockchains: ["ethereum", "base"],
          },
        ],
      },
      onSuccess: () => {
        // handle navigation when user successfully completes the flow
        alert("Payment successful!");
      },
      onExit: () => {
        // handle navigation from dismiss / exit events due to errors
        alert("Payment failed!");
      },
      onEvent: (event) => {
        // event stream
        console.log(event, "event");
        
      },
      experienceLoggedIn: "embedded",
      experienceLoggedOut: "popup",
    };

    // instance.destroy() should be called before initOnramp if there is already an instance.
    if (onrampInstance.current) {
      onrampInstance.current.destroy();
    }

    initOnRamp(options, (error, instance) => {
      if (instance) {
        onrampInstance.current = instance;
        setIsReady(true);
      }
    });
  }, [destinationWalletAddress]);

  const handleOnPress = () => {
    onrampInstance.current.open();
  };

  // render with button from previous example
  return (
    <>
      {/* <a id="cbonramp-button-container" onPress={handleOnPress} isLoading={!isReady}>
        <img src="./button.png" />
      </a> */}
      <Button id="cbpay-container" onClick={handleOnPress} isLoading={!isReady} >Let try!</Button>
    </>
  );
};
