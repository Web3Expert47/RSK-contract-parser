"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.nod3Connect = exports.default = void 0;var _nod = _interopRequireDefault(require("@rsksmart/nod3"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const nod3Connect = (url) => {
  url = url || process.env['RSK_NODE_URL'] || 'http://localhost:4444';
  return new _nod.default(
    new _nod.default.providers.HttpProvider(url)
  );
};exports.nod3Connect = nod3Connect;var _default = exports.default =

nod3Connect();
//# sourceMappingURL=nod3Connect.js.map