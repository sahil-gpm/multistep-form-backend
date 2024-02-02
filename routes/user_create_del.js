const User = require("../schema/User");
const { body, validationResult } = require("express-validator");
const router = require("express").Router();

router.post(
    
  "/add-account",

  [
    //adding the validations
    body("firstname","Add a valid firstname").exists(),
    body("lastname","Add a valid lastname").exists(),
    body("email","Email is not valid").isEmail(),
    body("password","Password is not of specified length").isLength({ min: 6, max: 15 }),
    body("bio","Add a valid bio").exists(),
    body("education","Specify proper education qualification").exists().isLength({ min: 40 }),
    body("funfact").exists(),
    body("projects").isArray({ min: 3 }),
    body("links").isArray({ min: 3 }),
  ],

  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        await User.create(req.body);
        return res.json({ success: true });
      } catch (e) {
        return res.json({ success: false,msg:e.message });
      }
    } else {
      //send first array element as the error
      return res.json({ success: null, msg: result.array().at(0).msg});
    }
  }
);



router.post(
    
  "/get-data",

  [
    //adding the validations
    body("email","Pass a valid email").exists().isEmail(),
    
  ],

  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        const response = await User.findOne({email:req.body.email}).select('-password');
        return res.json({ success: true,data:response });
      } catch (e) {
        return res.json({ success: false,msg:e.message });
      }
    } else {
      //send first array element as the error
      return res.json({ success: null, msg: result.array().at(0).msg});
    }
  }
);

module.exports = router;
