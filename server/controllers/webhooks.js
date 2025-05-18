import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebHooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const payload = req.body; // raw Buffer
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        const evt = whook.verify(payload, headers); // throws if invalid
        const { data, type } = evt;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.name,
                    imageUrl: data.image_url
                };
                await User.create(userData);
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.name,
                    imageUrl: data.image_url
                };
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                break;
        }

        res.status(200).json({ success: true });

    } catch (error) {
        console.error("❌ Webhook error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};
