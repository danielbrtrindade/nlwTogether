import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs"

interface IUserRequest {
    name: string;
    password: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {

    async execute({ name, password, email, admin }: IUserRequest) {
        const userRepository = getCustomRepository(UserRepositories);

        const passwordHash = await hash(password, 8);

        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await userRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = userRepository.create({
            name,
            password: passwordHash,
            email,
            admin,
        });

        await userRepository.save(user);

        return user;
    }
}

export { CreateUserService }