  
const asyncHandler = (requstHandler) =>(req, res, next) =>{
     promise.resolve(requstHandler(req, res, next))
     .catch((err) => next(err))
    }
    export { asyncHandler }


















/*
const asyncHandler = (fn) => aync(req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({ 
            success: false,
            message: error.message || 'An unknown error occurred!' });
    }
}
export { asyncHandler }
*/

