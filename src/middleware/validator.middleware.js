const validate = (schema) => (req, res, next) => {
  const {value, error} = schema.validate(req.body);
  if(error){
   next(error.details)
  }
  next();
} 

module.exports = validate;