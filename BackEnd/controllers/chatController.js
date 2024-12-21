import chat from "../models/chatModel.js";
import message from "../models/messageModel.js";
import { User } from "../models/Users.js";


// description      to create or fetch one to one chat
// route            POST /api/chat/
// access           protected

const accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("userId param is not sent with the request")
        return res.status(400)
    }

    var isChat = await chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"                    // here we have to check
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    }
    else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [ req.Users._id, userId ],
        };

        try {
            const createChat = await chat.create(chatData);
            const fullChat = await chat.findOne({ _id: createChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(fullChat)
        }
        catch (err) {
            res.status(400).json("error: ", err);
        }
    }

};


// description          for fetching all chats for a user
// route                GET /api/chat/
// access               protected

const fetchChats = async (req, res) => {
    try {
        chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email"                // here we have to check
                });
                res.status(200).send(results);
            })
    }
    catch(err) {
        res.status(400).json("error: ", err)
    }
}


// description      to create new group chat
// route            POST /api/chat/group
// access           protected

const createGroupChat = async(req, res) => {
    if(!req.body.users || !req.body.name) {
        return res.status(400).send({message: "please fill all the fields"})
    }

    var users = JSON.parse(req.body.users);

    if(users.length < 2) {
        return res.status(400).send("please select at least 2 users")
    }

    users.push(req.user)

    try {
        const groupChat = await chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await chat.findOne({_id: groupChat._id})
            .populate("users", "-password")
            .populate("groupAdmin", "-password")


        res.status(200).json(fullGroupChat)
    }
    catch(err) {
        res.status(400).send(err.message)
    }
}


// description      to rename a group
// route            PUT /api/chat/rename
// access           protected

const renameGroup = async(req, res) => {
    const {chatId, chatName} = req.body;

    const updatedChat = await chat.findByIdAndUpdate(
        chatId,
        {chatName: chatName},
        {new: true},
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if(!updatedChat) {
        res.status(400).send("chat not found")
    }
    else{
        res.status(200).json(updatedChat)
    }
}



// description          remove user from the group
// route                PUT  /api/chat/removeFromGroup
// access               protected

const removeFromGroup = async(req, res) => {
    const {chatId, userId} = req.body;

    // check if the requester is admin

    const removed = await chat.findByIdAndUpdate(
        chatId,
        {$pull: {users: userId}},
        {new: true}
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if(!removed) {
        res.status(404).send("chat not found")
    }
    else {
        res.json(removed)
    }
}



// description          add user to group or leave
// route                PUT /api/chat/groupadd
// access               protected

const addToGroup = async(req, res) => {
    const {chatId, userId} = req.body;

    // check if the user is admin

    const added = await chat.findByIdAndUpdate(
        chatId,
        {$push: {users: userId}},
        {new: true},
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if(!added) {
        res.status(404).send("chat not found")
    }
    else {
        res.status(201).json(added)
    }
}

export {accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup }


