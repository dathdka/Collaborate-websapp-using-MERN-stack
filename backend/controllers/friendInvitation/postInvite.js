const postInvite = async(req, res) =>{
    const {targetMailAddress}  = req.body;
    return res.send('controller is working');
}

module.exports = postInvite