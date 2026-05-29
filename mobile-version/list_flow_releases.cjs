const fs = require('fs');
const https = require('https');

const config = JSON.parse(fs.readFileSync('C:/Users/User/.config/configstore/firebase-tools.json', 'utf8'));
const token = config.tokens.access_token;

const options = {
  hostname: 'firebasehosting.googleapis.com',
  path: '/v1beta1/projects/flow-project-2026/sites/flow-project-2026/releases',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    if (json.releases) {
      json.releases.slice(0, 5).forEach((r, i) => {
        console.log(`[${i}] Version: ${r.version.name}, Time: ${r.releaseTime}, Message: ${r.message || ''}`);
      });
    } else {
      console.log(json);
    }
  });
});

req.end();
