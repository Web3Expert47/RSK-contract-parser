"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ContractParser = void 0;var _interfacesIds = _interopRequireDefault(require("./interfacesIds"));
var _rskUtils = require("@rsksmart/rsk-utils");
var _NativeContractsDecoder = _interopRequireDefault(require("./nativeContracts/NativeContractsDecoder"));
var _NativeContracts = _interopRequireDefault(require("./nativeContracts/NativeContracts"));
var _Contract = _interopRequireDefault(require("./Contract"));
var _EventDecoder = _interopRequireDefault(require("./EventDecoder"));
var _Abi = _interopRequireDefault(require("./Abi"));
var _types = require("./types");
var _utils = require("./utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}







function mapInterfacesToERCs(interfaces) {
  return Object.keys(interfaces).
  filter((k) => interfaces[k] === true).
  map((t) => _types.contractsInterfaces[t] || t);
}

function hasMethodSelector(txInputData, selector) {
  return selector && txInputData && txInputData.includes(selector);
}

class ContractParser {
  constructor({ abi, log, initConfig, nod3, txBlockNumber } = {}) {
    initConfig = initConfig || {};
    const { net } = initConfig;
    this.netId = net ? net.id : undefined;
    this.abi = (0, _utils.setAbi)(abi || _Abi.default);
    this.log = log || console;
    this.nod3 = nod3;
    this.nativeContracts = (0, _NativeContracts.default)(initConfig);
    if (this.netId) {
      let bitcoinNetwork = _types.bitcoinRskNetWorks[this.netId];
      this.nativeContractsEvents = (0, _NativeContractsDecoder.default)({ bitcoinNetwork, txBlockNumber });
    }
  }

  setNod3(nod3) {
    this.nod3 = nod3;
  }

  getNativeContractAddress(name) {
    const { nativeContracts } = this;
    if (nativeContracts) {
      return nativeContracts.getNativeContractAddress(name);
    }
  }

  setAbi(abi) {
    this.abi = (0, _utils.setAbi)(abi);
  }

  getMethodsSelectors() {
    let selectors = {};
    let methods = this.getAbiMethods();
    for (let m in methods) {
      let method = methods[m];
      let signature = method.signature || (0, _utils.soliditySignature)(m);
      selectors[m] = (0, _utils.soliditySelector)(signature);
    }
    return selectors;
  }

  getAbiMethods() {
    let methods = {};
    this.abi.filter((def) => def.type === 'function').
    map((m) => {
      let sig = m[_types.ABI_SIGNATURE] || (0, _utils.abiSignatureData)(m);
      sig.name = m.name;
      methods[sig.method] = sig;
    });
    return methods;
  }

  parseTxLogs(logs, abi) {
    return this.decodeLogs(logs, abi).map((event) => {
      this.addEventAddresses(event);
      event.abi = (0, _utils.removeAbiSignatureData)(event.abi);
      return event;
    });
  }

  addEventAddresses(event) {
    const { abi, args } = event;
    let _addresses = event._addresses || [];
    if (abi && args) {
      let inputs = abi.inputs || [];
      inputs.forEach((v, i) => {
        if (v.type === 'address') {
          _addresses.push(args[i]);
        }
        if (v.type === 'address[]') {
          let value = args[i] || [];
          if (Array.isArray(value)) {// temp fix to undecoded events
            value.forEach((v) => _addresses.push(v));
          } else {
            let i = 0;
            while (2 + (i + 1) * 40 <= value.length) {
              _addresses.push('0x' + value.slice(2 + i * 40, 2 + (i + 1) * 40));
              i++;
            }
          }
        }
      });
      event._addresses = [...new Set(_addresses)];
    }
    return event;
  }

  decodeLogs(logs, abi) {
    abi = abi || this.abi;
    const eventDecoder = (0, _EventDecoder.default)(abi, this.log);
    if (!this.nativeContracts || !this.nativeContractsEvents) {
      throw new Error(`Native contracts decoder is missing, check the value of netId:${this.netId}`);
    }
    const { isNativeContract } = this.nativeContracts;
    const { nativeContractsEvents } = this;
    return logs.map((log) => {
      const { address } = log;
      const decoder = isNativeContract(address) ? nativeContractsEvents.getEventDecoder(log) : eventDecoder;
      return decoder.decodeLog(log);
    });
  }

  makeContract(address, abi) {
    abi = abi || this.abi;
    let { nod3 } = this;
    return (0, _Contract.default)(abi, { address, nod3 });
  }

  async call(method, contract, params = [], options = {}) {
    try {
      const res = await contract.call(method, params, options);
      return res;
    } catch (err) {
      // temporary fix to avoid errored contract calls spam logs
      // this.log.warn(`Method ${method} call ${err}`)
      return null;
    }
  }

  async getTokenData(contract, { methods } = {}) {
    methods = methods || ['name', 'symbol', 'decimals', 'totalSupply'];
    let result = await Promise.all(
      methods.map((m) =>
      this.call(m, contract).
      then((res) => res).
      catch((err) => this.log.debug(`[${contract.address}] Error executing ${m}  Error: ${err}`)))
    );
    return result.reduce((v, a, i) => {
      let name = methods[i];
      v[name] = a;
      return v;
    }, {});
  }

  getMethodsBySelectors(txInputData) {
    let methods = this.getMethodsSelectors();
    return Object.keys(methods).
    filter((method) => hasMethodSelector(txInputData, methods[method]) === true);
  }

  async getContractInfo(txInputData, contract) {
    let { interfaces, methods } = await this.getContractImplementedInterfaces(txInputData, contract);

    interfaces = mapInterfacesToERCs(interfaces);
    return { methods, interfaces };
  }

  async getEIP1967Info(contractAddress) {
    const { isUpgradeable, impContractAddress } = await this.isERC1967(contractAddress);
    if (isUpgradeable) {
      // manual check required
      const proxyContractBytecode = await this.getContractCodeFromNode(impContractAddress);
      const methods = this.getMethodsBySelectors(proxyContractBytecode);
      let interfaces = this.getInterfacesByMethods(methods);

      interfaces = mapInterfacesToERCs(interfaces);
      return { methods, interfaces: [...interfaces, 'ERC1967'] };
    }
    return { methods: [], interfaces: [] };
  }

  async getContractImplementedInterfaces(txInputData, contract) {
    let methods = this.getMethodsBySelectors(txInputData);
    let isErc165 = false;
    //  skip non-erc165 contracts
    if ((0, _rskUtils.includesAll)(methods, ['supportsInterface(bytes4)'])) {
      isErc165 = await this.implementsErc165(contract);
    }
    let interfaces;
    if (isErc165) {
      interfaces = await this.getInterfacesERC165(contract);
    } else {
      interfaces = this.getInterfacesByMethods(methods);
    }

    return { methods, interfaces };
  }

  async isERC1967(contractAddress) {
    // check For ERC1967
    // https://eips.ethereum.org/EIPS/eip-1967
    // 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc storage address where the implementation address is stored
    const storedValue = await this.nod3.eth.getStorageAt(contractAddress, '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc');
    const isUpgradeable = storedValue !== '0x0';
    if (isUpgradeable) {
      const impContractAddress = `0x${storedValue.slice(-40)}`; // extract contract address
      return { isUpgradeable, impContractAddress };
    } else {
      return { isUpgradeable, impContractAddress: storedValue };
    }
  }

  async getContractCodeFromNode(contractAddress) {
    return this.nod3.eth.getContractCodeAt(contractAddress);
  }

  async getInterfacesERC165(contract) {
    let ifaces = {};
    let keys = Object.keys(_interfacesIds.default);
    for (let i of keys) {
      ifaces[i] = await this.supportsInterface(contract, _interfacesIds.default[i].id);
    }
    return ifaces;
  }

  getInterfacesByMethods(methods, isErc165) {
    return Object.keys(_interfacesIds.default).
    map((i) => {
      return [i, (0, _rskUtils.includesAll)(methods, _interfacesIds.default[i].methods)];
    }).
    reduce((obj, value) => {
      obj[value[0]] = value[1];
      return obj;
    }, {});
  }

  async supportsInterface(contract, interfaceId) {
    // fixed gas to prevent infinite loops
    let options = { gas: '0x7530' };
    let res = await this.call('supportsInterface', contract, [interfaceId], options);
    return res;
  }

  async implementsErc165(contract) {
    try {
      let first = await this.supportsInterface(contract, _interfacesIds.default.ERC165.id);
      if (first === true) {
        let second = await this.supportsInterface(contract, '0xffffffff');
        return !(second === true || second === null);
      }
      return false;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}exports.ContractParser = ContractParser;var _default = exports.default =

ContractParser;
//# sourceMappingURL=ContractParser.js.map