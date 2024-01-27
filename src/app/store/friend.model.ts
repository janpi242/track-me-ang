import { Position } from './position.model';

export interface Friend {
    id: number;
    name: string;
    email: string;
    position?: Position;
}

export interface FriendsList {
    friends: Friend[];
}
