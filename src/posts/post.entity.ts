import { Column,Entity,ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    authorId: number;

    @ManyToOne (() => User, user => user.posts)
    author: User;
}
