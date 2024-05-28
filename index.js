import { GearApi, ProgramMetadata } from '@gear-js/api';
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

    // const meta = await getWasmMetadata(fs.readFileSync('cybor_nft.wasm'));

    const metaString = (await fs.readFileSync('cybor_nft.meta.txt')).toString();
    
    const meta = await ProgramMetadata.from(metaString);

    // const codeIds = await gearApi.code.all();
    // console.log(codeIds);

    const state = await gearApi.programState.read({ 
        programId: '0x109ab78f2f10993f5e1354fff7ee99a3fa635dd5fe5968515a0b84471c43e892',
        payload: [1, 2, 3]
    }, meta, meta.types.state);
    
    console.log("-----");
}

main().then();