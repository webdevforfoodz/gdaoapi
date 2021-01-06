import express from 'express';
import { minABI ,GDAOAddress, AirdropAddress, AirdropRewardAddress, MinesAddress, BurnPurgatoryAddress ,infuraProvider } from '../utilities/constants.mjs';
import Web3 from 'web3'

const router = express.Router();

router.get('/', (req,res) => {
    res.send('we are on supply route');
});

router.get('/circulating', calcCirculating);

async function calcCirculating(req,res) {

    const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/e35323bc24d243c6a971cefcaaa55953"));
    const gdaoContract = new web3.eth.Contract(minABI,GDAOAddress);
    let totalSupply = await gdaoContract.methods.totalSupply().call()/(10**18);
    let airdropUnclaimed = await gdaoContract.methods.balanceOf(AirdropAddress).call()/(10**18);
    let minesBalance = await gdaoContract.methods.balanceOf(MinesAddress).call()/(10**18);
    let airdropRewardBalance = await gdaoContract.methods.balanceOf(AirdropRewardAddress).call()/(10**18);
    let burnPurgatoryBalance = await gdaoContract.methods.balanceOf(BurnPurgatoryAddress).call()/(10**18);
    let circulatingSupply = (totalSupply - airdropUnclaimed - minesBalance - airdropRewardBalance - burnPurgatoryBalance);

    res.status(200).json(circulatingSupply);
}

export default router;