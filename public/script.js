function analyzeDeal() {
    const address = document.getElementById('addressInput').value;
    const rehabLevel = document.getElementById('rehabLevel').value;
    const wholesaleProfit = document.getElementById('wholesaleProfit').value;

    if (!address || !rehabLevel || !wholesaleProfit) {
        alert('Please fill in all fields!');
        return;
    }

    // Simulated ARV (normally you'd fetch comps from backend)
    const fakeARV = Math.floor(Math.random() * (300000 - 150000 + 1)) + 150000;

    // Estimate repairs
    let repairCost = 0;
    if (rehabLevel === 'light') repairCost = 15000;
    else if (rehabLevel === 'heavy') repairCost = 35000;
    else if (rehabLevel === 'full') repairCost = 55000;

    // Calculate offer price
    let maxOffer = (fakeARV * 0.7) - repairCost;

    // Adjust max offer based on wholesale desired
    let wholesaleAmount = 0;
    if (wholesaleProfit === 'auto') {
        if (maxOffer > 250000) wholesaleAmount = 25000;
        else if (maxOffer > 150000) wholesaleAmount = 15000;
        else wholesaleAmount = 10000;
    } else {
        wholesaleAmount = parseInt(wholesaleProfit);
    }

    maxOffer -= wholesaleAmount;

    // Determine deal quality
    let dealClass = '';
    if (maxOffer / fakeARV >= 0.7) {
        dealClass = 'good-deal';
    } else if (maxOffer / fakeARV >= 0.6) {
        dealClass = 'okay-deal';
    } else {
        dealClass = 'bad-deal';
    }

    // Display result
    const dealResult = document.getElementById('dealResult');
    dealResult.className = `deal-card ${dealClass}`;
    dealResult.innerHTML = `
        <h2>Deal Summary</h2>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Estimated ARV:</strong> $${fakeARV.toLocaleString()}</p>
        <p><strong>Estimated Repairs:</strong> $${repairCost.toLocaleString()}</p>
        <p><strong>Max Purchase Price:</strong> $${maxOffer.toLocaleString()}</p>
        <p><strong>Wholesale Profit:</strong> $${wholesaleAmount.toLocaleString()}</p>
    `;

    // Enable comps button
    document.getElementById('viewCompsBtn').disabled = false;
    localStorage.setItem('lastAddress', address);
}

function viewRealComps() {
    const address = localStorage.getItem('lastAddress');
    if (!address) {
        alert('Please analyze a deal first!');
        return;
    }
    const redfinURL = `https://www.redfin.com/stingray/do/location-autocomplete?location=${encodeURIComponent(address)}`;
    window.open(redfinURL, '_blank');
}
