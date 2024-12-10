import express from "express";
import { random } from "./utils";
import jwt from "jsonwebtoken";
import { ContentModel,UserModel,LinkModel } from "./Model/user.model";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middlware";
import cors from "cors";
import connectDB from "./db";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
    // TODO: zod validation , hash the password
    const { email, password, username } = req.body;
    const userData = { email, password , username };
    
    console.log(req.body)

    try {
        await UserModel.create(userData);
        res.status(201).json({ message: "User created successfully" });
    } catch (error:any) {
        if (error.name === "ValidationError") {
            res.status(400).json({ message: "Invalid data provided", details: error.errors });
        } else {
            throw error; // Rethrow non-validation errors
        }
    }  
    
})

app.post("/api/v1/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        email,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrrect credentials"
        })
    }
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
    
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "email")
    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        email: user.email,
        content: content
    })

})
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

connectDB().then(() => {
    app.listen(4000, () => {
        console.log("Server is running on port 4000");
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with an error code
});
