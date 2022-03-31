require('custom-env').env()

const cmd = {
  info: `${process.env.PREFIXWORD}!info`,
  ava: `${process.env.PREFIXWORD}!ava`,
  play: `${process.env.PREFIXWORD}!play`,
  p: `${process.env.PREFIXWORD}!p`,
  skip: `${process.env.PREFIXWORD}!skip`,
  pause: `${process.env.PREFIXWORD}!pause`,
  resume: `${process.env.PREFIXWORD}!resume`,
  volume: `${process.env.PREFIXWORD}!volume`,
  vol: `${process.env.PREFIXWORD}!vol`,
  stop: `${process.env.PREFIXWORD}!stop`,
  s: `${process.env.PREFIXWORD}!s`,
  queue: `${process.env.PREFIXWORD}!queue`,
  q: `${process.env.PREFIXWORD}!q`,
}

module.exports = cmd