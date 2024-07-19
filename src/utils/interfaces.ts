interface Post {
    content: string;
    creator_id: number;
    reply_to: number;
    id: number;
    created_at: string;
    creator: {
        name: string;
        profile_pic?: string;
        id: number;
        created_at: string;
    };
    comments: number;
}

interface UserInterface {
    name: string;
    profile_pic: string;
    id: 0;
    created_at: string;
    bio: string;
}

export type { Post, UserInterface };
