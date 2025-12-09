import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "SocialMedia-app" });

// Inggest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
    {id:'sync-user-form-clerk'},
    {event: 'clerk/user.created'},
    async ({event})=>{
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        let username = email_addresses[0].email_address.split('@')[0]

        //Check availability of username
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [];