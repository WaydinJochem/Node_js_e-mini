const db = require("../config");
const { hash, compare, hashSync } = require('bcrypt');//in need of assessment
const { createToken } = require('../middleware/Authentication') //access permissions
class Users {
    //Shows all the users
    fetchUsers(req, res) {
        const query = `
        SELECT userID, firstName, lastName, userDOB, emailAdd, userPwd
        FROM Users;
        `
        //manual error handling
        db.query(query, (req, res) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                results
                
            })
        })
    }
    //Show specified user's information
    fetchUser(req, res) {
        const query = `
        SELECT userID, firstName, lastName, userDOB, emailAdd, userPwd
        FROM Users
        WHERE userID = ${req.params.id};
        `
        //manual error handling
        db.query(query, (req, res) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                result
            })
        })
    }
    login(req, res) {
        const { emailAdd, userPwd } = req.body;
        //query
        const query = `
        SELECT firstName, lastName, userDOB, emailAdd, userPwd
        FROM Users
        WHERE emailAdd = ${emailAdd};
        `
        db.query(
            query, 
            async (err, result)=>{
                if(err) throw err
                if(!result?.length){
                    res.json({
                        status: res.statusCode,
                        msg: "email address incorrect"
                    })
                }
                else {
                    await compare(userPwd, result[0].userPwd,
                        (cErr, cResult)=>{
                            if(cErr) throw cErr
                            //create token
                            const token = createToken({
                                emailAdd,
                                userPwd
                            })
                            //Save token
                            res.cookie("LegitUser",token,{
                                maxAge: 3600000,
                                httpOnly: true
                            })
                            if (cResult) {
                                res.json({
                                    msg: "Logged in",
                                    token,
                                    result: result[0]
                                })
                            }
                            else{
                                res.json({
                                    status: res.statusCode,
                                    msg: "Invalid password or you have not registered"
                                })
                            }
                        })
                }
            })
    }
    //Registration or Add new user to Users table
    async register(req, res) {
        const data = req.body
        //Encrypts the password
        data.userPwd = await hash(data.userPwd, 15)
        //Payload
        const user = {
            emailAdd: data.emailAdd,
            userPass: data.userPwd
        }
        //Query
        const query = `
        INSERT INTO Users
        SET ?;
        `
        db.query(query, [data],
            (err) => {
                if (err) throw err
                //Creating Token
                let token = createToken(user);
                res.cookie("LegitUser", token,
                    {
                        maxAge: 3600000, //maximum time logged in before forcefully logged-out due to inactivity
                        httpOnly: true //adds extra security
                    })
                res.json({
                    status: res.statusCode,
                    msg: "You have been successfully registered."
                })
            })
    }
    //Update specified user 
    updateUser(req, res) {
        const query = `
        UPDATE Users
        SET ?
        WHERE userID = ?
        `
        db.query(
            query,[req.body, req.params.id],
            (err)=> {
                if(err) throw err
                res.json({
                    status: res.statusCode,
                    msg: "The record has been updated."
                })
            })
    }
    //Delete specified user
    deleteUser(req, res) {
        const query = `
        DELETE FROM Users
        WHERE userID = ${req.params.id};
        `
        db.query(
            query,(err)=>{
                if(err) throw err
                res.json({
                    status: res.statusCode,
                    mgs: "A record was deleted"
                })
            })
    }
}   

module.exports = Users;