import { Workspace } from "../models/workspaceModel.js";

import { User } from "../models/Users.js";

// Controller to get workspaces by user
export const getWorkspacesByUser = async (req, res) => {
  const { userId } = req.params;

  console.log(userId);

  try {
    if (!userId) {
      return res.status(400).json({ error: "User name is required." });
    }

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

export const createWorkspace = async (req, res) => {
  try {
    console.log("req came");

    const { workSpaceName, members } = req.body; // member should be the array of object [{},{}]
    const createdBy = req.locals.id;

    // If workSpaceName is not mentioned
    if (!workSpaceName) {
      return res
        .status(400)
        .json({ error: "Name and createdBy fields are required." });
    }

    console.log(workSpaceName, members, createdBy);
    console.log("Into the try and catch.");

    let membersList = [{ userId: createdBy }]; // Get the user who create the workSpace.

    // Logic to add members from emails to membersList
    if (members && members.length > 0) {
      for (const email of members) {
        const member = await User.findOne({ email });
        if (member) {
          membersList.push({ userId: member._id });
        }
      }
    }

    // Create the workSpace
    const newWorkspace = new Workspace({
      workSpaceName,
      members: membersList, // Add members from the list
      createdBy,
    });

    console.log("Workspace completed: ", newWorkspace);
    const savedWorkspace = await newWorkspace.save(); // new Workspace Record.

    console.log("savedWorkspace Id: ", savedWorkspace._id.toString()); // Getting the new WorkSpace Id

    // Get the user and add new WorkSpace detail into it.
    const user = await User.findById(createdBy);

    // If there is no user
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    console.log("user", user);

    // Add the new workspace ID to the user's workspaces array
    user.workspaces.push(savedWorkspace._id.toString());

    // Save the updated user document
    await user.save();

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
