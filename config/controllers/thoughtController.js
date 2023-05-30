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
