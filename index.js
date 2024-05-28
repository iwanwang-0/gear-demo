import { GearApi, ProgramMetadata, getStateMetadata } from '@gear-js/api';
// const {GearApi} = require('@gear-js/api');
import fs from 'fs';

async function main() {
    console.log("Hello vara");

    const gearApi = await GearApi.create({
        providerAddress: 'wss://testnet.vara.network',
    });

    console.log("-----------");

    const [chain, nodeName, nodeVersion] = await Promise.all([
        gearApi.chain(),
        gearApi.nodeName(),
        gearApi.nodeVersion(),
    ]);
    
    console.log(
        `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`,
    );

    // const codeIds = await gearApi.code.all();
    // console.log(codeIds);

    const payload = { "all": ""};
    // const payload = { "ownerbyid": 0};
    // const payload = { "ownertokens": "0x04d467c76fd92d080a31f88829652e6dc5586060fc66fb27d02ab54cee694361"};

    // read full state
    const metaString = (await fs.readFileSync('cybor_nft.meta.txt')).toString();
    const meta = await ProgramMetadata.from(metaString);
    const state = await gearApi.programState.read({ 
        programId: '0x109ab78f2f10993f5e1354fff7ee99a3fa635dd5fe5968515a0b84471c43e892',
        payload
    }, meta);
    console.log(state.toJSON());
    console.log(state.toHex());

    // read state using wasm
    // const meta = await getStateMetadata(fs.readFileSync('cybor_nft.wasm'));
    
    console.log("-----");
}

main().then();