require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const Web3 = require('web3')
const fs = require('fs')

const multer = require('multer')
const path = require("path");
const { create } = require("ipfs-http-client");

const config = require('./config')
const nftaddress = config.nftaddress
const nftmarketaddress = config.nftmarketaddress
const NFT = require('./artifacts/contracts/NFT.sol/NFT.json')
const Market = require('./artifacts/contracts/NFTMarket.sol/NFTMarket.json')
const Tx = require('ethereumjs-tx').Transaction
const rpcURL = "https://rinkeby.infura.io/v3/f4a94012fd1d4b17962965a57f0d7ca1"
const web3 = new Web3(rpcURL)
//cost web3=new Web3(rpcURL)
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

app.use(express.urlencoded({ extended: false }));



const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "REST API",
        description: "Backend ",
        
        servers: ["http://localhost:3001"]
      }
    },
    apis: ['./routes/*.js'],
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        },
      }
    }
    ,
    security: [{
      jwt: []
    }],
  };





//routes
const customersRouter = require('./routes/customers')
app.use('/customers', customersRouter)

const assetsRoutes = require('./routes/assets')
app.use('/assets', assetsRoutes)

const orderRoutes = require('./routes/order')
app.use('/order', orderRoutes)

const favoriteRoutes = require('./routes/favorites')
app.use('/favorite', favoriteRoutes)

const likeRoutes = require('./routes/likes')
app.use('/like', likeRoutes)

const bidsRoutes = require('./routes/bids')
app.use('/bids', bidsRoutes)




const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//////////////////////////////////////////////////////////////////////////////////

async function ipfsClient() {
  const ipfs = await create(
      {
          host: "ipfs.infura.io",
          port: 5001,
          protocol: "https"
      }
  );
  return ipfs;
}
async function saveFile() {

  let ipfs = await ipfsClient();

  let data = fs.readFileSync("./uploads/" + newFileName)
  let result = await ipfs.add(data);
  let imageurl = 'https://ipfs.infura.io/ipfs/' + result.cid.toString()
  return imageurl
  //res.json(result.cid.toString())
}
async function savesecondFile(data) {

  let ipfs = await ipfsClient();
  let result = await ipfs.add({ path: "url.txt", content: JSON.stringify(data) });
  let imageurl = 'https://ipfs.infura.io/ipfs/' + result.cid.toString()
  return imageurl
  //res.json(result.cid.toString())
}
const MIME_TYPES = {
  'image/jpg': '.jpg',
  'image/jpeg': '.jpg',
  'image/png': '.png'
};
var date;
var newFileName;
const storage = multer.diskStorage({
  //destinaion ou je vais declarer ses fichiers
  destination: (req, file, cb) => {
      cb(null, './uploads');
  },
  //filename si je veut changer le nom de fichier

  filename: (req, file, clb) => {
      date = +new Date();
      const extension = MIME_TYPES[file.mimetype];
      newFileName = date.toString() + extension;//path.extname(file.originalname);
      clb(null, newFileName);
  }
});

////////////////////////////////////////////////////////////////////

const upload = multer({ storage })



app.post('/upload', upload.single('image'), (req, res) => {


  let url = saveFile()
  url.then(function (result) {
      let data = {
          name: req.body.name,
          description: req.body.description,
          url: result,
          price: req.body.price,
          details: req.body.details,


      }

      let finaldata = savesecondFile(data)
      finaldata.then(function (result) {

          console.log(result)
          /* next, create the item */
          //let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
          const contract = new web3.eth.Contract(NFT.abi, nftaddress)
          const transaction1 = contract.methods.createToken(result).encodeABI()
          const account1 = req.body.address
          const privateKey1 = Buffer.from(req.body.privateKey, 'hex')
          //'0xeA0701825e0bed3dc4B3A47f8bcBA66D2FC42d65'
          //35abc0cace40f86944dfb0ca73c818b1092f45835a0e4391383d3d74a97d70e3

          web3.eth.getTransactionCount(account1, async (err, txCount) => {
              //create a transaction object
              const txObject = {
                  nonce: web3.utils.toHex(txCount),
                  gasLimit: web3.utils.toHex(req.body.gaslimit),
                  gasPrice: web3.utils.toHex(web3.utils.toWei(req.body.gasprice, 'gwei')),
                  to: nftaddress,
                  data: transaction1,

              }

              //sign the transaction 

              const tx = new Tx(txObject, { chain: 'rinkeby' });
              tx.sign(privateKey1)
              const serializedTx = await tx.serialize()
              const raw = '0x' + serializedTx.toString('hex')

              //broadcast the transaction 

              web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                  //console.log('err:', err, 'txHash:', txHash)
                  console.log(txHash)
                  res.json({ err, txHash, result })


                  //console.log(result)


                  // Use this txHash to find the contract on Etherscan!
              })



          })



          ///////////////////////////////////////////////////////////////
          //getTokenId()
          //getListingPrice()
          //payListingPrice(req.body.address,req.body.privateKey)
          //createSale(req.body.address,req.body.privateKey)
          //getMarketItem();
      })
  })

  //res.json({status : "ok"})
})

app.post('/balance', (req, res) => {
  console.log(req.body)
  getMarketItem()
  const balance = getBalance(req.body.address)
  balance.then(function (balance) {
      res.json({ balance })    
  })

})


app.get('/allitems', (req, res) => {


  const contract = new web3.eth.Contract(Market.abi, nftmarketaddress)
  contract.methods.fetchMarketItems().call(async (err, result) => {
      //console.log(result)//result[0].tokenId//hna lezemni na3mel loop wala map 5ater plusieur 
      //produit 

      const items = await Promise.all(result.map(async i => {
          const contract = new web3.eth.Contract(NFT.abi, nftaddress)
          const Uri = await contract.methods.tokenURI(i.tokenId).call(async (err, result) => {

              /*const api = result
              const myresponse = await fetch(api)
              const json = await response.json()
              console.log(json)*/
              return result
          })

          const meta = await axios.get(Uri)
          //console.log(meta.data)
          var item = {
              tokenId: i.tokenId,
              seller: i.seller,
              owner: i.owner,
              price: Web3.utils.fromWei(i.price, 'ether'),
              name: meta.data.name,
              description: meta.data.description,
              image: meta.data.url






          }

          return item

      }))
      res.json(items)
  })

})


app.post('/marketsale', (req, res) => {

  console.log(req.body)
  const tokenId = getTokenId(req.body.txhash)
  tokenId.then(function (tokenId) {
      const price = web3.utils.toWei(req.body.price, 'ether');
      const contract = new web3.eth.Contract(Market.abi, nftmarketaddress)
      const transaction1 = contract.methods.createMarketItem(nftaddress, tokenId, price).encodeABI()
      const account1 = req.body.address
      const privateKey1 = Buffer.from(req.body.privateKey, 'hex')

      web3.eth.getTransactionCount(account1, async (err, txCount) => {
          //create a transaction object
          const txObject = {
              nonce: web3.utils.toHex(txCount),
              gasLimit: web3.utils.toHex(req.body.gaslimit),
              value: web3.utils.toHex(web3.utils.toWei('0.025', 'ether')),
              gasPrice: web3.utils.toHex(web3.utils.toWei(req.body.gasprice, 'gwei')),
              to: nftmarketaddress,
              data: transaction1,

          }

          //sign the transaction 

          const tx = new Tx(txObject, { chain: 'rinkeby' });
          tx.sign(privateKey1)
          const serializedTx = tx.serialize()
          const raw = '0x' + serializedTx.toString('hex')

          web3.eth.sendSignedTransaction(raw, (err, txHash) => {
              res.json({ err, txHash })



              // Use this txHash to find the contract on Etherscan!
          })
      })
  })
})
///////////////////////////////
async function getBalance(account) {


  const bal = await web3.eth.getBalance(account, (err, wei) => {
      balance = web3.utils.fromWei(wei, 'ether')
      return balance

  })
  return balance
}


///////////////////////////////////////////////////////////////////////////
async function getGasPrice() {
  const rpcURL = "https://rinkeby.infura.io/v3/f4a94012fd1d4b17962965a57f0d7ca1"
  const web3 = new Web3(rpcURL)

  const gasPrice = await web3.eth.getGasPrice(async (err, wei) => {

      console.log(web3.utils.fromWei(wei, 'ether'))
      return web3.utils.fromWei(wei, 'ether')

  })
  return gasPrice
}

////////////////////////////////////////////////////////////////////////////
async function getTokenId(txhash) {
  const rpcURL = "https://rinkeby.infura.io/v3/f4a94012fd1d4b17962965a57f0d7ca1"
  const web3 = new Web3(rpcURL)
  const tokenId = web3.eth.getTransactionReceipt(txhash).then(function (data) {
      let transaction = data;
      let logs = data.logs;
      //console.log(logs);
      return web3.utils.hexToNumber(logs[0].topics[3]);
  });

  return tokenId
}
/////////////////////////////////////////////////////////////////////////////
async function getListingPrice() {
  const rpcURL = "https://rinkeby.infura.io/v3/f4a94012fd1d4b17962965a57f0d7ca1"
  const web3 = new Web3(rpcURL)
  const contract = new web3.eth.Contract(Market.abi, nftmarketaddress)
  contract.methods.getListingPrice().call((err, result) => {
      console.log(result)
  })
}
//////////////////////////////////////////////////////////////////////////////
async function getMarketItem() {

  const contract = new web3.eth.Contract(Market.abi, nftmarketaddress)
  contract.methods.fetchMarketItems().call(async (err, result) => {
      //console.log(result)//result[0].tokenId//hna lezemni na3mel loop wala map 5ater plusieur 
      //produit 

      const items = await Promise.all(result.map(async i => {
          const contract = new web3.eth.Contract(NFT.abi, nftaddress)
          const Uri = await contract.methods.tokenURI(i.tokenId).call(async (err, result) => {

              /*const api = result
              const myresponse = await fetch(api)
              const json = await response.json()
              console.log(json)*/
              return result
          })

          const meta = await axios.get(Uri)
          //console.log(meta.data)
          var item = {
              tokenId: i.tokenId,
              seller: i.seller,
              owner: i.owner,
              price: i.price,
              price2: meta.data.name,
              name: meta.data.name,
              description: meta.data.description,
              image: meta.data.url






          }

          return item

      }))
      return items

  })
}


/////////////////////////////////////////////////////////////////////////////////
app.post('/buynft', (req, res) => {

  console.log(req.body)
  ////const price = web3.utils.toWei(req.body.price, 'ether');
  //console.log(price)
  const contract = new web3.eth.Contract(Market.abi, nftmarketaddress)
  const transaction1 = contract.methods.createMarketSale(nftaddress, req.body.token).encodeABI()
  const account1 = req.body.address
  const privateKey1 = Buffer.from(req.body.privateKey, 'hex')


  web3.eth.getTransactionCount(account1, async (err, txCount) => {
      //create a transaction object
      const txObject = {
          nonce: web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(req.body.gaslimit),
          value: web3.utils.toHex(web3.utils.toWei(req.body.price, 'ether')),
          gasPrice: web3.utils.toHex(web3.utils.toWei(req.body.gasprice, 'gwei')),
          to: nftmarketaddress,
          data: transaction1,

      }

      //sign the transaction 

      const tx = new Tx(txObject, { chain: 'rinkeby' });
      tx.sign(privateKey1)
      const serializedTx = tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')

      web3.eth.sendSignedTransaction(raw, (err, txHash) => {
          res.json({ err, txHash })



          // Use this txHash to find the contract on Etherscan!
      })
  })
})


/////////////////////////////////////////////////////////////////////////////////
async function createSale(account, privateKey) {
  const rpcURL = "https://rinkeby.infura.io/v3/f4a94012fd1d4b17962965a57f0d7ca1"
  const web3 = new Web3(rpcURL)
  const price = web3.utils.toWei(req.body.price, 'ether');
  const contract = new web3.eth.Contract(Market.abi, nftmarketaddress)
  const transaction1 = contract.methods.createMarketSale(nftaddress, 4, price).encodeABI()
  const account1 = req.body.address
  const privateKey1 = Buffer.from(req.body.privateKey, 'hex')

  web3.eth.getTransactionCount(account1, async (err, txCount) => {
      //create a transaction object
      const txObject = {
          nonce: web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(800000),
          value: web3.utils.toHex(web3.utils.toWei('0.025', 'ether')),
          gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
          to: nftmarketaddress,
          data: transaction1,

      }

      //sign the transaction 

      const tx = new Tx(txObject, { chain: 'rinkeby' });
      tx.sign(privateKey1)
      const serializedTx = tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')

      //broadcast the transaction 
      const tr = await web3.eth.sendSignedTransaction(raw, (err, txHash) => {
          //console.log('err:', err, 'txHash:', txHash)
          let result = { err1: err, hash1: txHash }
          console.log(result)
          return result

          // Use this txHash to find the contract on Etherscan!
      })
      return tr
  })



}


////////////////////////////////////////////////////////////////////////////////
async function mint(url, account, privateKey, gaslimit, gasprice) {
  //const web3Modal = new Web3Modal()
  const rpcURL = "https://rinkeby.infura.io/v3/f4a94012fd1d4b17962965a57f0d7ca1"
  const web3 = new Web3(rpcURL)
  //const connection = await web3Modal.connect()
  //const provider = new ethers.providers.Web3Provider(connection)   

  //const signer = provider.getSigner()

  var result = []
  var result1
  /* next, create the item */
  //let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
  const contract = new web3.eth.Contract(NFT.abi, nftaddress)
  const transaction1 = contract.methods.createToken(url).encodeABI()
  const account1 = account
  const privateKey1 = Buffer.from(privateKey, 'hex')
  //'0xeA0701825e0bed3dc4B3A47f8bcBA66D2FC42d65'
  //35abc0cace40f86944dfb0ca73c818b1092f45835a0e4391383d3d74a97d70e3

  const p = await web3.eth.getTransactionCount(account1, async (err, txCount) => {
      //create a transaction object
      const txObject = {
          nonce: web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(gaslimit),
          gasPrice: web3.utils.toHex(web3.utils.toWei(gasprice, 'gwei')),
          to: nftaddress,
          data: transaction1,

      }

      //sign the transaction 

      const tx = new Tx(txObject, { chain: 'rinkeby' });
      tx.sign(privateKey1)
      const serializedTx = await tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')

      //broadcast the transaction 

      const test = await web3.eth.sendSignedTransaction(raw, (err, txHash) => {
          //console.log('err:', err, 'txHash:', txHash)
          result.push(err)
          result.push(txHash)


          //console.log(result)


          // Use this txHash to find the contract on Etherscan!
      })



  })





}



app.listen(3001, () => console.log('Server Started'))