import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bookmark } from "../../bookmarks/entities/bookmarks.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Bookmark, (b) => b.user)
  bookmarks: Bookmark[];
}
