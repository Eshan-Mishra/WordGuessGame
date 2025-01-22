export default function Letters(prop) {

    const turnsRef=prop.turnsRef.current;
    const selectedStatus=prop.selectedStatus
    // let x
    // let b=false;
    //
    // if(!turnsRef>0){
    //     x=true
    // }
    // if (prop.show && x ){
    //     x=false
    // }
    const x=selectedStatus.some(item=>item[0]===prop.value && item[1])
    console.log(typeof x)
    return(
        <div key={prop.id} style={{color:turnsRef===0 ||!x ?"red":null}}>{prop.show || turnsRef===0?prop.value:""}</div>
    )
}