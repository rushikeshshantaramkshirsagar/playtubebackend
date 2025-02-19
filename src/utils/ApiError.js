class ApiError extends Error{
    constructor(
        statusCode, 
        message = "An unknown error occurred!",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.errors = errors
        this.data = data
        this.succes = false
        this.stack = stack  

        if (stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }