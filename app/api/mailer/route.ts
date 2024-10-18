


export async function POST(request: Request) {
    try{
        const {reciver , subject , text} = await request.json();
        console.log(reciver,subject,text);


    }catch(e){
        console.log(e);
    }
}