const {hash,compare} = require('bcryptjs')
const {createHmac}= require('crypto')

exports.doHash = (value,saltValue)=>{
  const result = hash(value,saltValue);
  return result;
}
 
exports.doHashValidation =  (value,hashedvalue)=>{
  const result = compare(value,hashedvalue);
  return result;
}

exports.hmacProcess=(value,key)=>{
  const result = createHmac('sha256',key).update(value).digest('hex')
  return result
}