function index(req, res) {
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"},
      {method: "GET", path: "/api/bows", description: "Shows all beads of wisdom posted by users"},
      {method: "GET", path: "/api/bows/:date", description: "Shows beads by date"},
      {method: "POST", path: "/api/bows", description: "Allows a user to create a bead of wisdom"},
      {method: "PUT", path: "/api/bows/:id", description: "Allows a user to update a bead of wisdom"},
      {method: "DELETE", path: "/api/bows/:id", description: "Allows a user to delete a bead of wisdom"}
    ]
  });
}

module.exports.index = index;
