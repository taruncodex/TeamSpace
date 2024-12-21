import { Workspace } from "../models/workspaceModel.js";

export const createWorkspace = async (req, res) => {
  console.log("Enterd into creted Backend : req arrived. ");

  try {
    const { workSpaceName, members, createdBy } = req.body; // member should be the array of object [{},{}] // that include the object is of each user
    if (!workSpaceName || !createdBy) {
      return res
        .status(400)
        .json({ error: "Name and createdBy fields are required." });
    }
    console.log("req.body checked");

    // Creating new workspace
    const newWorkspace = new Workspace({
      workSpaceName,
      members: members || [{ userId: createdBy }], // If no members are provided, default to an empty array
      createdBy,
    });

    console.log("WorkSpace should be created till now .");
    console.log(newWorkspace);

    const savedWorkspace = await newWorkspace.save();

    console.log("Sending the response");

    return res.status(201).json({
      message: "Workspace created successfully",
      workspace: savedWorkspace,
    });
  } catch (error) {
    console.error("Error creating workspace:", error);
    return res
      .status(500)
      .json({ msg: "Failed to create workspace.", error: error.message });
  }
};

// Controller to get workspaces by user
export const getWorkspacesByUser = async (req, res) => {
  console.log("Entred into the Backend with req.params");
  const { userId } = req.params;

  console.log(userId);
  try {
    if (!userId) {
      return res.status(400).json({ error: "User name is required." });
    }

    console.log("user Id verified ");

    // Find all workspaces where the user is either the creator or a member
    const workspaces = await Workspace.find({
      $or: [
        { createdBy: userId }, // User is the creator
        { "members.userId": userId }, // User is a member
      ],
    })
      .populate("members.userId", "userId email") // Populate user details correctly
      .populate("createdBy", "userId email"); // Populate creator details

    console.log("WorkSpace is this: ", workspaces);

    return res.status(200).json(workspaces);
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    return res
      .status(500)
      .json({ msg: "Failed to fetch workspaces.", error: error.message });
  }
};
