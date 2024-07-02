const fs = require('fs');
const path = require('path');
 
// Define the path to the WebSocketClient.js file
const filePath = path.resolve(__dirname, '../node_modules/webpack-dev-server/client/clients/WebSocketClient.js');
 
// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
 
  // Comment out the specific line
  const modifiedData = data.replace(
    /this\.client\.onerror = function \(error\) {[\s\S]*?log\.error\(error\);[\s\S]*?};/g,
    '// this.client.onerror = function (error) {\n//   log.error(error);\n// };'
  );
 
  // Write the modified data back to the file
  fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the file:', err);
      return;
    }
    console.log('File has been modified successfully');
  });
});