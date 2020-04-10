const demoConfig = {
  projectId: '5e9038c061be7d2bcfcddf50',
  readKey: '7a34768194e9b1620af0448393e7c3525b9f9894c7dab90da8b41b7ed6079ef33af812789d6b4dddf0e2813234db2a3fe6c37f63c84ab4950273caa61e844a7ebf51e44e3a781aac9bb1d6e0bc756818cb8f2f277e97c6e36b575fee9891e4bf ',
  writeKey: '3974555a2de18626c46b1b9c19abaf516050118ff1e8952743cd517cc6fbeae213297cd806321ebbbd7a4f0299f11a3b4f0cfa1c473747e8c3217de601e8212cdfc4ef928a6113d90acdbeeca5febd4ba97023fe2c82b8f35db19d4c1003fead ',
  masterKey: '3344EE039296BF1749846C207A77B840A4D4C83F61244C3B0CFCE34BD3AFFB2D',
  host: 'staging-api.keen.io'
};

if (typeof window !== 'undefined') {
  window.demoConfig = demoConfig;
}
if (typeof global !== 'undefined') {
  module.exports = demoConfig;
}
