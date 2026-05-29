const fs = require('fs');
const https = require('https');

const config = JSON.parse(fs.readFileSync('C:/Users/User/.config/configstore/firebase-tools.json', 'utf8'));
const token = config.tokens.access_token;

const postData = JSON.stringify({
  message: "Rollback to My Shopper Web via Antigravity API"
});

const options = {
  hostname: 'firebasehosting.googleapis.com',
  path: '/v1beta1/projects/my-shopper-2026/sites/my-shopper-2026/releases?versionName=projects/my-shopper-2026/sites/my-shopper-2026/versions/cd599028e30bd3ac',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Response: ${data}`);
  });
});

req.on('error', e => console.error(e));
req.write(postData);
req.end();
