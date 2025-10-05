
export function httpError(status:number,message:string){
    const e = new Error(message) as any;
    e.status=status;
    return e;
}