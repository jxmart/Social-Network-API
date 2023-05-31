const { user, thought } = require('../../models');

module.exports = {
    getUser(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch(err => res.status(400).json(err));
},

    getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user found with this id' })
                : res.json(user)
        )
        .catch(err => res.status(400).json(err));
},

createUser(req, res) {
    User.create(req.body)
        .then(user => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(400).json(err);
        });

},

updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then(user =>
            !user
                ? res.status(404).json({ message: 'No user found with this id' })
                : res.json(user)
        )
        .catch(err => res.status(400).json(err));
},

deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
        .then(user =>
            !user
                ? res.status(404).json({ message: 'No user found with this id' })
                : thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: 'User deleted' }))
        .catch(err => res.status(400).json(err));

},

addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
        .then(user =>
            !user
                ? res.status(404).json({ message: 'No user found with this id' })
                : res.json(user)
        )
        .catch((err) => res.status(400).json(err));
},

removeFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
        .then(user =>
            !user
                ? res.status(404).json({ message: "Deleted friendId" })
                : res.json(user)
        )
        .catch(err => res.status(400).json(err));
},
}