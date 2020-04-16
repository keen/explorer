const demoConfig = {
  projectId: 'YOUR_PROJECT_ID',
  readKey: 'YOUR_READ_KEY',
  writeKey: 'YOUR_WRITE_KEY',
  masterKey: 'YOUR_MASTER_KEY',
};

if (typeof window !== 'undefined') {
  window.demoConfig = demoConfig;
}
if (typeof global !== 'undefined') {
  module.exports = demoConfig;
}
