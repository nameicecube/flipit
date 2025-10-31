import { useState, useEffect } from 'react';
const p = new ethers.BrowserProvider(window.ethereum);
setProvider(p);
}
}, []);


async function connectWallet() {
await provider.send('eth_requestAccounts', []);
const s = await provider.getSigner();
setSigner(s);
const c = new ethers.Contract(CONTRACT_ADDRESS, abi, s);
setContract(c);
}


async function flip(choice) {
if (!contract) return alert('Connect your wallet first');
const value = ethers.parseEther(betAmount);
const tx = await contract.placeBet(choice, { value });
await tx.wait();
setLogs((prev) => [`✅ Tx confirmed: ${tx.hash}`, ...prev]);
}


return (
<div className="container">
<div className="card">
<h1>Flip It 🎲</h1>
{!signer ? (
<button onClick={connectWallet}>Connect Wallet</button>
) : (
<p>✅ Wallet Connected</p>
)}


<div style={{ marginTop: '20px' }}>
<label>
Bet Amount (ETH):
<input value={betAmount} onChange={(e) => setBetAmount(e.target.value)} />
</label>
</div>


<div style={{ marginTop: '20px' }}>
<button onClick={() => flip(true)}>Bet Heads</button>
<button onClick={() => flip(false)}>Bet Tails</button>
</div>


<div style={{ marginTop: '30px', textAlign: 'left' }}>
<h3>Activity</h3>
{logs.map((l, i) => (
<div key={i}>{l}</div>
))}
</div>
</div>
</div>
);
}
