const { user, thought } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find({})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(400).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought)

            )
            .catch((err) => res.status(400).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(400).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought deleted and no user found!' })
                    : res.json({ message: 'Thought was successfully deleted!' })
            )
            .catch((err) => res.status(400).json(err));

        createReaction(req, res) {
            Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true }
            )
                .then((thought) =>
                    !thought
                        ? res.status(404).json({ message: 'No thought found with this id!' })
                        : res.json(thought)
                )
                .catch((err) => res.status(400).json(err));
            },

            deleteReaction(req, res) {
                Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $pull: { reactions: { reactionId: req.params.reactionId } } },
                    { runValidators: true, new: true }
                )
                .then((thought) =>
                (!thought
                  ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought)
                ))
                .catch((err) => res.status(400).json(err));



