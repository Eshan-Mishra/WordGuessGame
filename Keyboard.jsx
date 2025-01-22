export default function Keyboard(props){
    return(
            <button key={props.id} onClick={()=>props.onClick(props)} >{props.value}</button>
    )
}