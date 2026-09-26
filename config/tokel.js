const tokelConf = {
  rpchost: process.env.LOCAL_RUN ? "127.0.0.1" : process.env.TOKEL_SERVER,
  rpcport: 29405,
  rpcuser: process.env.RPC_USER,
  rpcpassword: process.env.RPC_PASS,
};

const SmartChain = require("komodo-rpc-js");

const tokel = new SmartChain({ config: tokelConf });
const rawRPC = tokel.rpc();

// komodo-rpc-js returns errors instead of throwing them, and the returned
// axios error carries the RPC credentials in error.config.auth. Rethrow a
// plain Error with only the message so callers' try/catch works and nothing
// that gets logged contains the credentials.
const tokelRPC = new Proxy(rawRPC, {
  get(target, method) {
    const call = target[method];
    if (typeof call !== "function") return call;
    return async (...params) => {
      const result = await call(...params);
      if (result instanceof Error) {
        const rpcError = result.response?.data?.error;
        throw new Error(
          rpcError
            ? `RPC ${String(method)}: ${rpcError.code}: ${rpcError.message}`
            : `RPC ${String(method)}: ${result.message}`
        );
      }
      return result;
    };
  },
});

module.exports = {
  tokelRPC,
  tokelConf
}
