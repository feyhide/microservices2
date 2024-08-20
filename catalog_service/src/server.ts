import expressApp from './expressApp'

const port = process.env.PORT || 8000;

export const StartServer = async () => {
    expressApp.listen(port,()=>{
        console.log(`app is listening on ${port}`)
    })

    process.on("uncaughtException",async(err)=>{
        console.log(err)
        process.exit(1)
    })
}

StartServer().then(()=>{
    console.log("server is upp")
})