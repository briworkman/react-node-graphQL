import { Field, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column} from 'typeorm';

@ObjectType()
@Entity()
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt = Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = Date;

    @Field()
    @Column({ unique: true })
    username!: string;

    @Column()
    password!: string;
}