require('custom-env').env()

const {
  isMatchCmd
} = require('../common/checker')

const msgsplit = {
  split: (msg,cmd1,cmd2) => {
    if (isMatchCmd(msg,cmd1)) {
      return splitting(msg,cmd1)
    } else if (isMatchCmd(msg,cmd2)) {
      return splitting(msg,cmd2)
    }
  }
}

const splitting = (msg,cmd) => {
  return msg.trim().slice(cmd.length+1,msg.length)
}

module.exports = msgsplit