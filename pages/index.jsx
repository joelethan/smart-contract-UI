import React, { useEffect, useState } from "react";
import Web3 from "web3";
import SimpleCounter from "../src/truffle_abis/SimpleCounter.json";

const HomePage = () => {
  const [counter, setCounter] = useState(1);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [simpleContract, setSimpleContract] = useState({});

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert("No ethereum browser detected... Try using metamask!!");
      }
    };
    loadWeb3();
    const loadBlockChainData = async () => {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const networkId = await web3.eth.net.getId();
      const contract = await new web3.eth.Contract(
        SimpleCounter.abi,
        SimpleCounter.networks[networkId].address
      );
      setSimpleContract(contract);
    };
    loadBlockChainData();
  }, []);

  const getCounter = async () => {
    setLoading(true);
    const ctr = await simpleContract.methods.getCounter().call();
    setCounter(ctr);
    setLoading(false);
  };

  const Increment = async () => {
    setLoading(true);
    await simpleContract.methods
      .incrementCounter()
      .send({ from: account, gas: "1000000" });
    setLoading(false);
  };
  console.log("loading", loading);

  return (
    <div>
      <button onClick={() => getCounter()}>get counter</button>
      <p>
        <button onClick={() => Increment()}>increment</button>
      </p>
      {loading === true && "Loading......"}
      <span>current counter is {counter.toString()}</span>
    </div>
  );
};

export default HomePage;
