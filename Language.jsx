export default function  Language(props){
    return(
                <div className="language-div" key={props.id}  style={props.style} >{props.value}</div>
    )
}