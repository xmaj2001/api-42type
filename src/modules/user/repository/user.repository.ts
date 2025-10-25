import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

abstract class UserRepository {
    abstract create(userData: CreateUserDto): Promise<UserEntity>;
    abstract update(id: string, updateData: UpdateUserDto): Promise<UserEntity>;
    abstract findById(id: string): Promise<UserEntity | null>;
    abstract findByEmail(email: string): Promise<UserEntity | null>;
    abstract findAll(): Promise<UserEntity[]>;
    abstract delete(id: string): Promise<void>;
}

export default UserRepository;