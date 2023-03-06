import { UserDTO } from "../../types";

export interface ClassRequestDTO{
    class_name: string;
    school_year: number;
    grade_level: string;
    teacher: string;
    test_sessions: string[];
}

export interface ClassResponseDTO{
    class_name: string;
    school_year: number;
    grade_level: string;
    teacher: UserDTO;
    test_sessions: string[];
}

export interface IClassService{
    /**
     * This method creates a new class in the database.
     * @param class  new class
     * @returns the created class
     * @throws Error if creation fails
     */
    createClass(class: ClassRequestDTO): Promise<ClassResponseDTO>;

    /**
     * This method retrieves all classes
     * @param id class id
     * @returns requested class
     * @throws Error if retrieval fails
     */
    getClassById(id: string):  Promise<ClassResponseDTO>;

    /**
     * This method updates the class with given id. 
     * @param class The request object containing information about the updated class
     * @returns the new updated ClassResponseDTO
     * @throws Error if retrieval fails
     */
    updateClass(
        id: string,
        class: ClassRequesetDTO,
    ): Promise<ClassResponseDTO>; 

    /**
     * This method deletes the class with given id 
     * @param id class id
     * @returns 
     * @throws Error if retrieval fails
     */
    deleteClass(id: string): Promise<string>;
}