"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("./Model/user.model");
const config_1 = require("./config");
const middlware_1 = require("./middlware");
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: zod validation , hash the password
    const { email, password, username } = req.body;
    const userData = { email, password, username };
    console.log(req.body);
    try {
        yield user_model_1.UserModel.create(userData);
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({ message: "Invalid data provided", details: error.errors });
        }
        else {
            throw error; // Rethrow non-validation errors
        }
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const existingUser = yield user_model_1.UserModel.findOne({
        email,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_PASSWORD);
        res.json({
            token, success: true, email, password
        });
    }
    else {
        res.status(403).json({
            message: "Incorrrect credentials"
        });
    }
}));
// @ts-ignore
app.post("/api/v1/logout", middlware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        if (userId) {
            res.cookie("token", "", { httpOnly: true, maxAge: 0 });
        }
        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}));
app.post("/api/v1/content", middlware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    yield user_model_1.ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
}));
app.get("/api/v1/content", middlware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    console.log(userId);
    const content = yield user_model_1.ContentModel.find({
        userId: userId
    }).populate("userId");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middlware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield user_model_1.ContentModel.deleteMany({
        contentId,
        userId: req.userId
    });
    res.json({
        message: "Deleted "
    });
}));
app.post("/api/v1/brain/share", middlware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield user_model_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield user_model_1.LinkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield user_model_1.LinkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield user_model_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    // userId
    const content = yield user_model_1.ContentModel.find({
        userId: link.userId
    });
    console.log(link);
    const user = yield user_model_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }
    res.json({
        email: user.email,
        content: content
    });
}));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
(0, db_1.default)().then(() => {
    app.listen(4000, () => {
        console.log("Server is running on port 4000");
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with an error code
});
