import { SampleTokenAddress, SampleToken2Address, WithdrawTokenAddress, SampleTokenABI } from "./data.js";

(function() {
  let loginAddress;
  const TargetChain = {
    id: "4",
    name: "rinkeby"
  };

  const provider = new ethers.providers.Web3Provider(web3.currentProvider);
  const signer = provider.getSigner();
  const loginButton = document.getElementById('btn-login');
  const logoutButton = document.getElementById('btn-logout');
  const address = document.getElementById('address');
  const approveButton = document.getElementById('btn-approve');
  const approve2Button = document.getElementById('btn-approve2');

  const toggleLoader = function() {
    const x = document.getElementById('loader');
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  const toggleLoginBtns = function() {
    if (loginAddress == null) {
      loginButton.style.display = "block"
      logoutButton.style.display = "none"
      address.style.display = "none"
    } else {
      loginButton.style.display = "none"
      logoutButton.style.display = "block"

      address.textContent = loginAddress;
      address.style.display = "block"
    }
  }

  const checkLogin = async function() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length > 0) {
      loginAddress = accounts[0];
    } else {
      loginAddress = null;
    }
    toggleLoginBtns();
    toggleLoader();
  }

  const approveToken = async function(address) {
    const Contract = new ethers.Contract(address, SampleTokenABI, provider);
    const amount = ethers.utils.parseEther("10000000000000");
    const allowance = await Contract.allowance(loginAddress, WithdrawTokenAddress);
    console.log("allowance Balance: ", allowance);
    if (allowance >= amount) {
      mint();
    } else {
      const contractWithSigner = Contract.connect(signer);
      contractWithSigner.approve(WithdrawTokenAddress, amount)
      .then(function(receipt) {
        console.log("approve token receipt: ", receipt);
      })
    }
  }

  if (window.ethereum) {
    loginButton.addEventListener('click', async function() {
      toggleLoader();
      checkLogin();
    })

    logoutButton.addEventListener('click', function() {
      loginAddress = null;
      toggleLoginBtns();
    })

    approveButton.addEventListener('click', function() {
      approveToken(SampleTokenAddress);
    })

    approve2Button.addEventListener('click', function() {
      approveToken(SampleToken2Address);
    })

    checkLogin();

    // detect Metamask account change
    ethereum.on('accountsChanged', function (accounts) {
      console.log('accountsChanges',accounts);
      loginAddress = accounts[0];
      toggleLoginBtns();
    });

     // detect Network account change
    ethereum.on('chainChanged', function(networkId){
      console.log('networkChanged',networkId);
      if (networkId != parseInt(TargetChain.id)) {
        alert("We don't support this chain, please switch to " + TargetChain.name);
      }
    });
  } else {
    console.warn("No web3 detected.");
  }
})();
