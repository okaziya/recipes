const cs = {
    appName: "recipes",
    authorization: "Log in or create an account",
    beforeRegister: "Don't have an account?",
    create: "create account",
    auth: {
        signOut: "sign out",
        signIn: "sign in",
        signUp: "Register",
        errors: {
            "auth/user-not-found": "There is no existing user record corresponding to the provided identifier.",
            "auth/email-already-exists": "The provided email is already in use by an existing user. Each user must have a unique email.",
            "auth/wrong-password": "wrong password"
        }
    },
    lessThan: "<",
    favoriteRecipes: {
        title: "my favorite recipes"
    }
}

export default cs;