import ImageKit from "@imagekit/nodejs"
import User from "../models/User.js"
import fs from 'fs'
import { request } from "http"

// Getu User data Using UserId
export const getUserData = async (req, res) => {
    try{
        const {userId} = req.auth()
        const user = await User.findById(userId)
        if(!user){
            return res.json({success: false, message: "User Not Found"})
        }
        res.json({success: true, user})
    } catch (error){
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
}

// Update User Data
export const updateUserData = async (req, res) => {
    try{
        const {userId} = req.auth()
        const {username, bio, location, full_name} = req.body;

        const tempUser = await User.findById(userId)

        !username && (username = tempUser.username)
        
        if(tempUser.username !== username){
            const user = User.findOne({username})
            if(user){
                // we will not change the username if it is already taken 
                username = tempUser.username
            }
        }

        const updatedData = {
            username,
            bio,
            location,
            full_name
        }
        const profile = req.files.profile && req.files.profile[0]
        const cover = req.files.cover && req.files.cover[0]

        if(profile){
            const buffer = fs.readFileSync(profile.path)
            const response = await ImageKit.upload({
                file: buffer,
                fileName: profile.originalname,
            })

            const url = ImageKit.url({
                path: response.filePath,
                transformation: [
                    {quality: 'auto'},
                    {format: 'webp'},
                    {width: '512'},
                ]
            })
            updatedData.profile_picture = url;
        }

        if(cover){
            const buffer = fs.readFileSync(cover.path)
            const response = await ImageKit.upload({
                file: buffer,
                fileName: profile.originalname,
            })

            const url = ImageKit.url({
                path: response.filePath,
                transformation: [
                    {quality: 'auto'},
                    {format: 'webp'},
                    {width: '1280'},
                ]
            })
            updatedData.cover_photo = url;
        }

        const user = await User.findByIdAndUpdate(userId, updatedData, {new: true})

        res.json({success: true, user, message: 'Profile updated successfully'})

    } catch (error){
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
}

// Find Users Using username, email, location, name

export const discoverUsers = async (req, res) => {
    try{
        const {userId} = req.auth()
        const {input} =req.body;

        const allUsers = await User.find(
            {
                $or: [
                    {username: new RegExp(input, 'i')},
                    {email: new RegExp(input, 'i')},
                    {full_name: new RegExp(input, 'i')},
                    {location: new RegExp(input, 'i')},
                ]
            }
        )
        const filteredUsers = allUsers.filter(user=> user._id !== userId);
        
        res.json({success: true, filteredUsers})

    } catch (error){
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
}