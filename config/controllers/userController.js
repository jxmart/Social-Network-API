const { user, thought } = require('./models');

module.exports = {
    getUser(req, res) {
        User.find({})
            .then(user) => res.json(user))
        .catch(err => res.status(400).json(err));
},

    getSingleThought(req, res) {
    User.findOne({ _id: req.params.id })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(({ user }) =>
            !user
                ? res.status(404).json({ message: 'No user found with this id' })
                : res.json(user)
        )
        .catch(err => res.status(400).json(err));