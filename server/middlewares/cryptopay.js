const Gateway = require('cryptopay');

const callbackFunc = (args = []) => {
    // const {  } = args;
    console.log(args, 'here we go')
}

const gateway = new Gateway({
    mnemonic: "here potato suggest market coconut notable toast tray dwarf toss stick gather",
    settings: { scantimeout: 10000, autoScan: false },
    testnet: true,
    callbackFunc,
})

module.exports = gateway;
