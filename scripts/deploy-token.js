const hre = require('hardhat')
const ethers = hre.ethers;

async function deployLEAG() {
    await hre.run('compile'); // We are compiling the contracts using subtask
    const [deployer] = await ethers.getSigners(); // We are getting the deployer

    console.log('Deploying contracts with the account:', deployer.address); // We are printing the address of the deployer
    console.log('Account balance:', (await deployer.getBalance()).toString()); // We are printing the account balance

    const LEAGToken = await ethers.getContractFactory("LEAG"); // 
    const leagueToken = await LEAGToken.deploy();
    console.log(`Waiting for LEAGToken deployment...`);
    await leagueToken.deployTransaction.wait(5);

    console.log(`LEAGToken Contract deployed. Address: `, leagueToken.address);

    console.log(`Verifying ...`);
    await hre.run("verify:verify", {
        address: leagueToken.address,
        constructorArguments: [],
        contract: "contracts/LEAG.sol:LEAG",
    });

    console.log('Done!');
}

module.exports = deployLEAG;