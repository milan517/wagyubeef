import React, { useState } from 'react';
import { createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";
import { Component } from "./Components/getBeef";
import GetCow from "./Components/getCow";

export const client = createThirdwebClient({ 
  clientId: "9742c462a580e57777d796d9f0268047" 
});

export const contract = getContract({ 
  client, 
  chain: sepolia, 
  address: "0x9bcD4AA26F0cc92754abb4B5dDFD7e0F84BF395b"
});

function App() {
  const [showCow, setShowCow] = useState(true);

  const handleToggleCow = () => {
    setShowCow(true);
  };

  const handleToggleBeef = () => {
    setShowCow(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <ThirdwebProvider>
          <GetCow contract={contract} />  
        </ThirdwebProvider>
      </div>
      <div>
        <ThirdwebProvider>
          <Component contract={contract} />
        </ThirdwebProvider>
      </div>
    </div>
  );
}

export default App;
