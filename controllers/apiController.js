function index(req, res) {
  res.json({
    message: "Welcome to T.I.L.",
    documentation_url: "https://github.com/AdrianaVillagran/til-app",
    base_url: "https://whispering-earth-61253.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"},
      {method: "GET", path: "/api/bows", description: "Shows all beads of wisdom posted by all users"},
      {method: "GET", path: "/api/users", description: "Shows all users"},
      {method: "GET", path: "/api/users/:username/bows", description: "Shows all beads of wisdom by a user"},
      {method: "GET", path: "/api/users/:username/bows/:date", description: "Shows all beads of wisdom posted by a user posted on a specific date"},
      {method: "POST", path: "/api/users/:username/bows", description: "Allows a user to create a bead of wisdom"},
      {method: "PUT", path: "/api/users/:username/bows/:id", description: "Allows a user to update a bead of wisdom"},
      {method: "DELETE", path: "/api/users/:username/bows/:id", description: "Allows a user to delete a bead of wisdom"}
    ]
  });
}

module.exports.index = index;
