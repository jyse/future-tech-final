import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import background from "./assets/bg.png";
import nftImage from "./assets/techie.png";
import StartMinting from "./components/StartMinting";
import InProgressMinting from "./components/InProgressMinting";
import CompletedMinting from "./components/CompletedMinting";
import { ethers } from "ethers";
import abi from "./manual/abi.json";

function App() {
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [contractAddress, setContractAddress] = useState();
  const [supply, setSupply] = useState(0);
  const [hash, setHash] = useState();

  const mint = async () => {
    console.log("minting");
    const payload = { value: ethers.utils.parseEther("0.001") };
    const transaction = await contract.safeMint(payload);

    console.log("hash", transaction.hash);
    setHash(transaction.hash);

    setInProgress(true);
    await transaction.wait();
    setInProgress(false);
    setCompleted(true);
  };

  const getTotalSupply = async () => {
    const totalSupply = await contract.totalSupply();
    setSupply(totalSupply.toNumber());
  };

  useEffect(() => {
    getTotalSupply();
  }, [contract]);

  const login = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("Metamask is installed!");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      const walletAccount = accounts[0];
      console.log("🐼Wallet account: ", walletAccount);
      setAccount(walletAccount);

      const contractAddress = "0xE4acf0213Bfd368576f129e17C5E4dF4073aB5ff";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(walletAccount);

      let NFTContract = new ethers.Contract(contractAddress, abi, signer);
      console.log("📝Contract: ", NFTContract);
      setContract(NFTContract);
    }
  };

  const getState = () => {
    if (inProgress) {
      // Step 10: Pass in the transaction hash to InProgressMinting Component and check this component
      return <InProgressMinting hash={hash} />;
    }

    if (completed) {
      // Step 12: Check this component
      return <CompletedMinting />;
    }

    // Step 8: Pass mint as props
    return <StartMinting mint={mint} />;
  };

  return (
    <div className="app">
      <Header />
      <div className="hero">
        <img src={background} />
        <div className="overlay"></div>
        <div className="card">
          <div className="main">
            <div className="details-section">
              <div className="details-header">
                <h1> FutureTech's 1st NFT Collection:</h1>
              </div>
              <div className="details-description">
                <h1>FutureTechies</h1>
              </div>
              <div className="details-actions">
                <p> {supply} / 13 minted </p>
                {account ? (
                  getState()
                ) : (
                  <div className="button connect" onClick={login}>
                    Connect Wallet
                  </div>
                )}
              </div>
            </div>
            <div className="nft-section">
              <img className="nft-image" src={nftImage} alt="image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
