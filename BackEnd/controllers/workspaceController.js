import { Workspace } from "../models/workspaceModel.js";

export const createWorkspace = async (req, res) => {
  const { workSpaceName, members, createdBy } = req.body;

  if (!workSpaceName || !createdBy) {
    return res
      .status(400)
      .json({ error: "Name and createdBy fields are required." });
  }

  try {
    // Creating new workspace
    const newWorkspace = new Workspace({
      workSpaceName,
      members: members || [], // If no members are provided, default to an empty array
      createdBy,
    });

    const savedWorkspace = await newWorkspace.save();

    res.status(201).json({
      message: "Workspace created successfully",
      workspace: savedWorkspace,
    });
  } catch (error) {
    console.error("Error creating workspace:", error);
    res.status(500).json({ error: "Failed to create workspace." });
  }
};

// Controller to get workspaces by user
export const getWorkspacesByUser = async (req, res) => {
  const { userName } = req.params;

  try {
    if (!userName) {
      return res.status(400).json({ error: "User name is required." });
    }

    // Find all workspaces where the user is either the creator or a member
    const workspaces = await Workspace.find({
      $or: [
        { createdBy: userName }, // User is the creator
        { "members.userName": userName }, // User is a member
      ],
    })
      .populate("members.userName", "userName email") // Populate user details if needed
      .populate("createdBy", "userName email"); // Populate creator details if needed

    res.status(200).json(workspaces);
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    res.status(500).json({ error: "Failed to fetch workspaces." });
  }
};
