export {}

declare global {
    /**
     * Now declare things that go in the global namespace,
     * or augment existing declarations in the global namespace.
     */
    type UserType = {
        id: string
        name: string
        login: string
        password: string
    }

    type BoardType = {
        id: string
        title: string
        description: string
        columns?: ColumnType[]
    }

    type ColumnType = {
        id: string
        title: string
        order: number
        tasks?: TaskType[]
    }

    type TaskType = {
        id: string
        title: string
        order: number
        description: string
        userId: string
        boardId: string
        columnId: string
        files: FileType[]
    }

    type FileType = {
        filename: string
        fileSize: number
    }

    type Token = {
      token: string
    }
}
