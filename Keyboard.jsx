export default function Keyboard(props){

    const selectedStatus=props.selectedStatus;
    const selectedWord=props.selectedWord;
    const click= selectedWord.some(x=>x===props.value)
    return(
            <button key={props.id} onClick={()=>props.onClick(props)} >{props.value}</button>
    )
}