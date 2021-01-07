import express from 'express';
import { minABI ,GDAOAddress, AirdropAddress, AirdropRewardAddress, MinesAddress, BurnPurgatoryAddress ,infuraProvider } from '../utilities/constants.mjs';
import Web3 from 'web3'

const router = express.Router();

router.get('/', calcCirculating);

async function calcCirculating(req,res) {

    const web3 = new Web3(new Web3.providers.HttpProvider(infuraProvider));
    const gdaoContract = new web3.eth.Contract(minABI,GDAOAddress);
    let totalSupply = await gdaoContract.methods.totalSupply().call()/(10**18);
    let airdropUnclaimed = await gdaoContract.methods.balanceOf(AirdropAddress).call()/(10**18);
    let minesBalance = await gdaoContract.methods.balanceOf(MinesAddress).call()/(10**18);
    let airdropRewardBalance = await gdaoContract.methods.balanceOf(AirdropRewardAddress).call()/(10**18);
    let burnPurgatoryBalance = await gdaoContract.methods.balanceOf(BurnPurgatoryAddress).call()/(10**18);
    let circulatingSupply = (totalSupply - airdropUnclaimed - minesBalance - airdropRewardBalance - burnPurgatoryBalance);

    let jsonObj = [{
        'circulatingSupply': circulatingSupply
    }]
    console.log(airdropUnclaimed)
    res.status(200).json(jsonObj);
}

export default router;