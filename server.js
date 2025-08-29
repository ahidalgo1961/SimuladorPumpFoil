// Simple Express server to serve the simulator and persist state to disk.
// Run: npm install && node server.js
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const STATE_FILE = path.join(__dirname, 'state.json');

app.use(express.json({limit:'200kb'}));

// CORS (optional - same origin expected, but keep simple)
app.use((req,res,next)=>{res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');if(req.method==='OPTIONS') return res.sendStatus(200); next();});

app.get('/state', (req,res)=>{
  fs.readFile(STATE_FILE,'utf8',(err,data)=>{
    if(err){ return res.status(404).json({ok:false,error:'no_state'}); }
    try{ const json=JSON.parse(data); return res.json({ok:true,data:json}); }
    catch(e){ return res.status(500).json({ok:false,error:'parse_error'}); }
  });
});

app.post('/state', (req,res)=>{
  const body = req.body || {};
  if(typeof body !== 'object'){ return res.status(400).json({ok:false,error:'bad_body'}); }
  // Add server timestamp
  body.serverTs = Date.now();
  fs.writeFile(STATE_FILE, JSON.stringify(body,null,2), 'utf8', err => {
    if(err) return res.status(500).json({ok:false,error:'write_failed'});
    res.json({ok:true,saved:true});
  });
});

// Static files (after API routes so /state is not shadowed if file exists)
app.use(express.static(__dirname));

app.listen(PORT, ()=>{
  console.log('\nSimulator server running on http://localhost:'+PORT+'\n');
  console.log('Persistence file: '+STATE_FILE); 
});
