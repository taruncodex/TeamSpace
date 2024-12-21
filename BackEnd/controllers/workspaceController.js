import { Workspace } from "../models/workspaceModel.js";

export const createWorkspace = async (req, res) => {
  try {
    console.log("req came");
    const { workSpaceName, members, createdBy } = req.body; // member should be the array of object [{},{}] // that include the object is of each user
    if (!workSpaceName || !createdBy) {
      return res
        .status(400)
        .json({ error: "Name and createdBy fields are required." });
    }

    console.log(workSpaceName, members, createdBy);

    console.log("Into the try and catch.");

    let membersList = [{ userId: createdBy }];

    // logic to add members will be added soon
    // We take list of emails in the member list in the array of string format [ "" , "", "" ] ,
    // then we fetch matching email's id from DB and push into the membersList.

    const newWorkspace = new Workspace({
      workSpaceName,
      members: membersList, // If no members are provided, default to an empty array
      createdBy,
    });

    console.log("Workspace completed : ", newWorkspace);

    const savedWorkspace = await newWorkspace.save();

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
  const { userId, userName } = req.params;

  console.log(userId, userName);
  try {
    if (!userId) {
      return res.status(400).json({ error: "User name is required." });
    }

    console.log();

    // Find all workspaces where the user is either the creator or a member
    const workspaces = await Workspace.find({
      $or: [
        { createdBy: userId }, // User is the creator
        { "members.userId": userId }, // User is a member
      ],
    })
      .populate("members.userId", "userId email") // Populate user details correctly
      .populate("createdBy", "userId email"); // Populate creator details

    return res.status(200).json(workspaces);
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    return res
      .status(500)
      .json({ msg: "Failed to fetch workspaces.", error: error.message });
  }
};
