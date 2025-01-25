export default function Letters(prop) {

    const turnsRef=prop.turnsRef.current;
    const selectedStatus=prop.selectedStatus;
    const gameStatus=prop.gameStatus;

    const x=selectedStatus.some(item=>item[0]===prop.value && item[1])
    return(
        <div key={prop.id} style={{color:turnsRef===0 ||!x ?"red":gameStatus?"green":null}}>{prop.show || turnsRef===0?prop.value:""}</div>
    )
}