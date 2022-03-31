require('custom-env').env()

const config = {
  prefix: process.env.PREFIXWORD,
  token: process.env.SECRET,
  spotifyclientid: process.env.SPOTIFYCLIENTID,
  spotifyclientsecret: process.env.SPOTIFYCLIENTSECRET
}

module.exports = config